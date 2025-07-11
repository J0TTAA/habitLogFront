// @ts-nocheck
import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"

const ClimateScreen = () => {
  const [searchDate, setSearchDate] = useState("")

  const weatherHistory = [
    {
      date: "domingo, 14 de enero",
      temp: "22°C",
      condition: "Soleado",
      humidity: "65%",
      wind: "10 km/h",
      tasks: [
        { name: "Ejercicio matutino", completed: true },
        { name: "Leer 30 minutos", completed: true },
      ],
    },
    {
      date: "sábado, 13 de enero",
      temp: "18°C",
      condition: "Nublado",
      humidity: "78%",
      wind: "15 km/h",
      tasks: [
        { name: "Meditar", completed: true },
        { name: "Estudiar programación", completed: false },
      ],
    },
    {
      date: "viernes, 12 de enero",
      temp: "15°C",
      condition: "Lluvioso",
      humidity: "85%",
      wind: "20 km/h",
      tasks: [
        { name: "Caminar 30 min", completed: true },
        { name: "Leer libro", completed: true },
      ],
    },
    {
      date: "jueves, 11 de enero",
      temp: "25°C",
      condition: "Soleado",
      humidity: "60%",
      wind: "8 km/h",
      tasks: [
        { name: "Ejercicio", completed: true },
        { name: "Meditar", completed: true },
        { name: "Estudiar", completed: true },
      ],
    },
  ]

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "soleado":
        return "☀️"
      case "nublado":
        return "☁️"
      case "lluvioso":
        return "🌧️"
      default:
        return "☀️"
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="HabitLog" />

      <ScrollView className="flex-1 px-4">
        <Text className="text-xl font-bold text-text mb-6">Clima e Historial</Text>

        {/* Current Weather */}
        <View className="bg-surface rounded-xl p-4 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-text mb-3">☀️ Clima Actual</Text>
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl font-bold text-text">22°C</Text>
            <View className="items-end">
              <Text className="text-textSecondary">Humedad: 65%</Text>
              <Text className="text-textSecondary">Viento: 10 km/h</Text>
            </View>
          </View>
          <Text className="text-textSecondary">Soleado</Text>
        </View>

        {/* Date Search */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">Buscar por Fecha</Text>
          <View className="flex-row">
            <TextInput
              className="flex-1 bg-surface rounded-l-xl px-4 py-3 text-text border border-gray-200"
              placeholder="dd - mm - aaaa"
              value={searchDate}
              onChangeText={setSearchDate}
            />
            <TouchableOpacity className="bg-primary rounded-r-xl px-4 py-3 justify-center">
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather History */}
        <View className="mb-8">
          <View className="space-y-4">
            {weatherHistory.map((day, index) => (
              <View key={index} className="bg-surface rounded-xl p-4 shadow-sm">
                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-2">{getWeatherIcon(day.condition)}</Text>
                    <View>
                      <Text className="font-semibold text-text">{day.date}</Text>
                      <Text className="text-textSecondary text-sm">{day.condition}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="text-xl font-bold text-text">{day.temp}</Text>
                    <Text className="text-textSecondary text-xs">
                      {day.humidity} • {day.wind}
                    </Text>
                  </View>
                </View>

                <Text className="font-medium text-text mb-2">Tareas del día</Text>
                <View className="space-y-1">
                  {day.tasks.map((task, taskIndex) => (
                    <View key={taskIndex} className="flex-row items-center">
                      <View className={`w-2 h-2 rounded-full mr-2 ${task.completed ? "bg-success" : "bg-gray-300"}`} />
                      <Text className={`text-sm ${task.completed ? "text-text" : "text-textSecondary"}`}>
                        {task.name}
                      </Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity className="bg-accent rounded-lg py-2 px-4 mt-3 self-end">
                  <Text className="text-primary font-medium text-sm">1/2 completadas</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ClimateScreen
