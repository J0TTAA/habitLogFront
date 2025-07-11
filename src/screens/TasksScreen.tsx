// @ts-nocheck
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";
import { getTasks, deleteTask, completeTask } from "../api";
import TaskItem from "../components/TaskItem";

interface Task {
  _id: string;
  title: string;
  description?: string;
  categoryId?: {
    _id: string;
    name: string;
    color?: string;
  };
  status: string;
  timeOfDay?: string;
  xpPercent?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const TasksScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      
      if (response.success) {
        setTasks(response.data || []);
      } else {
        console.error('Error cargando tareas:', response.message);
        Alert.alert('Error', 'No se pudieron cargar las tareas');
      }
    } catch (error) {
      console.error('Error en loadTasks:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleCompleteTask = async (taskId: string) => {
    try {
      const response = await completeTask(taskId);
      
      if (response.success) {
        // Actualizar la tarea en el estado local
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task._id === taskId 
              ? { ...task, status: 'DONE', completedAt: new Date().toISOString() }
              : task
          )
        );
        Alert.alert('¡Éxito!', 'Tarea completada');
      } else {
        Alert.alert('Error', response.message || 'No se pudo completar la tarea');
      }
    } catch (error) {
      console.error('Error completando tarea:', error);
      Alert.alert('Error', 'Error de conexión');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await deleteTask(taskId);
              
              if (response.success) {
                setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
                Alert.alert('¡Éxito!', 'Tarea eliminada');
              } else {
                Alert.alert('Error', response.message || 'No se pudo eliminar la tarea');
              }
            } catch (error) {
              console.error('Error eliminando tarea:', error);
              Alert.alert('Error', 'Error de conexión');
            }
          }
        }
      ]
    );
  };

  const handleEditTask = (task: Task) => {
    navigation.navigate("EditTask" as never, { task } as never);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-row items-center justify-between px-4 py-3 bg-primary rounded-b-xl">
          <Text className="text-white text-lg font-semibold">Gestión de Tareas</Text>
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Cargando tareas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between px-4 py-3 bg-primary rounded-b-xl">
        <Text className="text-white text-lg font-semibold">Gestión de Tareas</Text>
        <TouchableOpacity
          className="bg-white/90 rounded-lg px-3 py-1 border border-primary"
          onPress={() => navigation.navigate("CreateTask" as never)}
        >
          <Text className="text-primary font-medium">+ Nueva Tarea</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1 px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tasks.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="list-outline" size={64} color="#CBD5E0" />
            <Text className="text-gray-500 text-lg mt-4">No hay tareas</Text>
            <Text className="text-gray-400 text-sm mt-2">Crea tu primera tarea para comenzar</Text>
          </View>
        ) : (
          <View className="space-y-4">
            {tasks.map((task) => (
              <View key={task._id}>
                <TaskItem task={task} />
                <View className="flex-row justify-end gap-2 mt-1">
                  {task.status !== 'DONE' && (
                    <TouchableOpacity
                      className="bg-green-100 border border-green-300 rounded-lg px-3 py-1"
                      onPress={() => handleCompleteTask(task._id)}
                    >
                      <Text className="text-green-700 font-medium text-xs">Completar</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                    className="bg-gray-100 rounded-lg p-2 border border-gray-200"
                    onPress={() => handleEditTask(task)}
                  >
                    <Ionicons name="create-outline" size={18} color="#718096" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="bg-gray-100 rounded-lg p-2 border border-gray-200"
                    onPress={() => handleDeleteTask(task._id)}
                  >
                    <Ionicons name="trash-outline" size={18} color="#F56565" />
                  </TouchableOpacity>
                </View>
                {task.status === 'DONE' && (
                  <View className="bg-green-50 border border-green-200 rounded-lg py-2 px-4 mt-2">
                    <Text className="text-green-700 font-medium text-center text-xs">✓ Completada</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TasksScreen;
