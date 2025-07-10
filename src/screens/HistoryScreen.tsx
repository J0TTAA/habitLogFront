import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"

const HistoryScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("Todas")
  const [searchDate, setSearchDate] = useState("")

  const filters = ["Todas", "Completadas", "Incompletas"]

  const historyItems = [
    {
      id: 1,
      title: "Estudiar programación",
      category: "Educación",
      date: "15/11/2024",
      time: "20 XP",
      completed: false,
      hasImage: false,
    },
    {
      id: 2,
      title: "Caminar 30 min",
      category: "Salud",
      date: "15/11/2024",
      time: "25 XP",
      completed: true,
      hasImage: false,
    },
    {
      id: 3,
      title: "Ejercicio matutino",
      category: "Salud",
      date: "14/11/2024",
      time: "50 XP",
      completed: true,
      hasImage: true,
    },
    {
      id: 4,
      title: "Imagen de verificación",
      category: "Verificación",
      date: "14/11/2024",
      time: "",
      completed: true,
      hasImage: true,
      isVerification: true,
    },
    {
      id: 5,
      title: "Leer 30 minutos",
      category: "Educación",
      date: "14/11/2024",
      time: "30 XP",
      completed: false,
      hasImage: false,
    },
    {
      id: 6,
      title: "Meditar",
      category: "Bienestar",
      date: "13/11/2024",
      time: "25 XP",
      completed: true,
      hasImage: false,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="HabitLog" />

      <ScrollView className="flex-1 px-4">
        <Text className="text-xl font-bold text-text mb-6">Historial de Tareas</Text>

        {/* Filters */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-text mb-2">Filtros</Text>
          <View className="flex-row space-x-2 mb-4">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2 rounded-lg ${selectedFilter === filter ? "bg-primary" : "bg-gray-200"}`}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  className={`text-sm font-medium ${selectedFilter === filter ? "text-white" : "text-textSecondary"}`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Search */}
          <View className="flex-row mb-4">
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

        {/* History Items */}
        <View className="space-y-3 mb-8">
          {historyItems.map((item) => (
            <View key={item.id} className="bg-surface rounded-xl p-4 shadow-sm">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <View className={`w-3 h-3 rounded-full mr-2 ${item.completed ? "bg-success" : "bg-error"}`} />
                    <Text className="font-semibold text-text">{item.title}</Text>
                    {item.completed && <Ionicons name="checkmark-circle" size={16} color="#48BB78" className="ml-2" />}
                  </View>
                  <Text className="text-textSecondary text-sm ml-5">
                    📅 {item.date} • {item.category} • {item.time}
                  </Text>
                </View>
                <Text
                  className={`text-sm font-medium px-2 py-1 rounded ${
                    item.completed ? "text-success bg-success/10" : "text-error bg-error/10"
                  }`}
                >
                  {item.completed ? "Completada" : "Incompleta"}
                </Text>
              </View>

              {item.isVerification && (
                <View className="bg-primary rounded-lg p-3 mt-2">
                  <Text className="text-white font-medium text-center">Ejercicio</Text>
                  <Text className="text-white/80 text-xs text-center">14/01/2024</Text>
                </View>
              )}

              {item.hasImage && !item.isVerification && (
                <View className="bg-primary rounded-lg p-3 mt-2">
                  <Text className="text-white font-medium text-center">Meditación</Text>
                  <Text className="text-white/80 text-xs text-center">14/01/2024</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HistoryScreen
