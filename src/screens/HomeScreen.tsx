// @ts-nocheck
import { View, Text, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Header from "../components/Header"
import ProgressBar from "../components/ProgressBar"
import WeatherWidget from "../components/WeatherWidget"
import TaskItem from "../components/TaskItem"

const HomeScreen = () => {
  const todayTasks = [
    {
      id: 1,
      title: "Ejercicio matutino",
      category: "Salud",
      completed: true,
      time: "07:00",
      xp: 50,
    },
    {
      id: 2,
      title: "Leer 30 minutos",
      category: "Educación",
      completed: false,
      time: "20:00",
      xp: 40,
    },
    {
      id: 3,
      title: "Meditar",
      category: "Bienestar",
      completed: false,
      time: "21:00",
      xp: 30,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="HabitLog" />

      <ScrollView className="flex-1 px-4">
        {/* Greeting */}
        <View className="mb-4 mt-4">
          <Text className="text-2xl font-bold text-gray-800 mb-1">¡Hola, Usuario!</Text>
          <Text className="text-gray-400">lunes, 23 de junio de 2025</Text>
        </View>

        {/* Daily Progress */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <Text className="text-base font-semibold text-gray-700 mb-2">Progreso de Hoy</Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-400 text-sm">Tareas completadas</Text>
            <Text className="text-gray-700 font-bold text-sm">1/3</Text>
          </View>
          <ProgressBar progress={33} />
          <Text className="text-xs text-gray-400 mt-2">33% completado</Text>
        </View>

        {/* Weather Widget */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <WeatherWidget />
        </View>

        {/* Today's Tasks */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <Text className="text-base font-semibold text-gray-700 mb-2">Tareas de Hoy</Text>
          <View>
            {todayTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        </View>

        {/* Experience Points */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-8 items-center">
          <Text className="text-gray-400 mb-1">Experiencia Total</Text>
          <Text className="text-3xl font-bold text-primary">1,247 XP</Text>
          <Text className="text-xs text-gray-400 mt-1">+65 XP hoy</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
