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
      time: "30 min",
      xp: 50,
    },
    {
      id: 2,
      title: "Leer 30 minutos",
      category: "Educación",
      completed: false,
      time: "30 min",
      xp: 40,
    },
    {
      id: 3,
      title: "Meditar",
      category: "Bienestar",
      completed: false,
      time: "15 min",
      xp: 30,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="HabitLog" />

      <ScrollView className="flex-1 px-4">
        {/* Greeting */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-text mb-1">¡Hola, Usuario!</Text>
          <Text className="text-textSecondary">Lunes, 23 de julio de 2024</Text>
        </View>

        {/* Daily Progress */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">📈 Progreso de Hoy</Text>
          <View className="bg-surface rounded-xl p-4 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-textSecondary">Tareas completadas</Text>
              <Text className="text-text font-medium">1/3</Text>
            </View>
            <ProgressBar progress={33} />
            <Text className="text-xs text-textSecondary mt-2">33% completado</Text>
          </View>
        </View>

        {/* Weather Widget */}
        <WeatherWidget />

        {/* Today's Tasks */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">⚡ Tareas de Hoy</Text>
          <View className="gap-3">
            {todayTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        </View>

        {/* Experience Points */}
        <View className="mb-8">
          <View className="bg-surface rounded-xl p-4 shadow-sm items-center">
            <Text className="text-textSecondary mb-1">Experiencia Total</Text>
            <Text className="text-3xl font-bold text-primary">1,247 XP</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
