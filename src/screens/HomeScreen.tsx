// @ts-nocheck
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";
import { getTasks } from "../api";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import WeatherWidget from "../components/WeatherWidget";
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

const HomeScreen = () => {
  const { user } = useAuth();
  const [todayTasks, setTodayTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [todayXP, setTodayXP] = useState(0);

  useEffect(() => {
    loadTodayTasks();
  }, []);

  const loadTodayTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      
      if (response.success) {
        const tasks = response.data || [];
        
        // Filtrar tareas de hoy (puedes ajustar la lógica según tu backend)
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = tasks.filter(task => {
          // Mostrar tareas no completadas o completadas hoy
          return task.status !== 'DONE' || (task.completedAt && task.completedAt.startsWith(today));
        }).slice(0, 3); // Mostrar solo las primeras 3
        
        setTodayTasks(todayTasks);
        
        // Calcular XP
        const completedTasks = tasks.filter(task => task.status === 'DONE');
        const total = completedTasks.reduce((sum, task) => sum + (task.xpPercent || 0), 0);
        const todayCompleted = todayTasks.filter(task => task.status === 'DONE');
        const todayXP = todayCompleted.reduce((sum, task) => sum + (task.xpPercent || 0), 0);
        
        setTotalXP(total);
        setTodayXP(todayXP);
      } else {
        console.error('Error cargando tareas para home:', response.message);
      }
    } catch (error) {
      console.error('Error en loadTodayTasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTodayTasks();
    setRefreshing(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return now.toLocaleDateString('es-ES', options);
  };

  const completedTasks = todayTasks.filter(task => task.status === 'DONE').length;
  const progress = todayTasks.length > 0 ? (completedTasks / todayTasks.length) * 100 : 0;

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header title="HabitLog" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="HabitLog" />

      <ScrollView 
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Greeting */}
        <View className="mb-4 mt-4">
          <Text className="text-2xl font-bold text-gray-800 mb-1">
            {getGreeting()}, {user?.nickname || 'Usuario'}!
          </Text>
          <Text className="text-gray-400">{getCurrentDate()}</Text>
        </View>

        {/* Daily Progress */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <Text className="text-base font-semibold text-gray-700 mb-2">Progreso de Hoy</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-sm">Tareas completadas</Text>
            <Text className="text-gray-700 font-bold text-sm">
              {completedTasks}/{todayTasks.length}
            </Text>
          </View>
          <ProgressBar progress={progress} />
          <Text className="text-xs text-gray-400 mt-2">
            {Math.round(progress)}% completado
          </Text>
        </View>

        {/* Weather Widget */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <WeatherWidget />
        </View>

        {/* Today's Tasks */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <Text className="text-base font-semibold text-gray-700 mb-2">Tareas de Hoy</Text>
          {todayTasks.length === 0 ? (
            <View className="py-8 items-center">
              <Text className="text-gray-500 text-center">No hay tareas para hoy</Text>
              <Text className="text-gray-400 text-sm text-center mt-1">
                ¡Crea una nueva tarea para comenzar!
              </Text>
            </View>
          ) : (
            <View>
              {todayTasks.map((task) => (
                <TaskItem key={task._id} task={task} />
              ))}
            </View>
          )}
        </View>

        {/* Experience Points */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-8 items-center">
          <Text className="text-gray-400 mb-1">Experiencia Total</Text>
          <Text className="text-3xl font-bold text-primary">{totalXP} XP</Text>
          <Text className="text-xs text-gray-400 mt-1">
            {todayXP > 0 ? `+${todayXP} XP hoy` : 'Sin XP hoy'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
