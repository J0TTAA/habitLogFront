// @ts-nocheck
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"
import TaskItem from "../components/TaskItem"

const TasksScreen = () => {
  const navigation = useNavigation();

  const tasks = [
    {
      id: 1,
      title: "Ejercicio matutino",
      category: "Salud",
      completed: true,
      time: "07:00",
      xp: 50,
      canVerify: true,
    },
    {
      id: 2,
      title: "Leer 30 minutos",
      category: "Educación",
      completed: false,
      time: "20:00",
      xp: 40,
      canVerify: true,
    },
    {
      id: 3,
      title: "Meditar",
      category: "Bienestar",
      completed: false,
      time: "21:00",
      xp: 30,
      canVerify: false,
    },
  ]

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

      <ScrollView className="flex-1 px-4 py-4">
        <View className="space-y-4">
          {tasks.map((task) => (
            <View key={task.id}>
              <TaskItem task={task} />
              <View className="flex-row justify-end gap-2 mt-1">
                {task.canVerify && !task.completed && (
                  <TouchableOpacity
                    className="bg-primary/10 border border-primary rounded-lg px-3 py-1"
                    onPress={() => navigation.navigate("VerifyTask", { task })}
                  >
                    <Text className="text-primary font-medium text-xs">Verificar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity className="bg-gray-100 rounded-lg p-2 border border-gray-200">
                  <Ionicons name="create-outline" size={18} color="#718096" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-gray-100 rounded-lg p-2 border border-gray-200">
                  <Ionicons name="trash-outline" size={18} color="#F56565" />
                </TouchableOpacity>
              </View>
              {task.completed && (
                <View className="bg-green-50 border border-green-200 rounded-lg py-2 px-4 mt-2">
                  <Text className="text-green-700 font-medium text-center text-xs">✓ Completada</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TasksScreen
