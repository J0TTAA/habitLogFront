// @ts-nocheck
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
      title: "Ejercicio matutino",
      category: "Salud",
      date: "14/1/2024",
      time: "07:00",
      xp: 50,
      completed: true,
      verified: true,
      hasImage: true,
      isVerification: false,
    },
    {
      id: 2,
      title: "Leer 30 minutos",
      category: "Educación",
      date: "14/1/2024",
      time: "20:00",
      xp: 30,
      completed: false,
      verified: false,
      hasImage: false,
      isVerification: false,
    },
    {
      id: 3,
      title: "Meditar",
      category: "Bienestar",
      date: "13/1/2024",
      time: "21:00",
      xp: 30,
      completed: true,
      verified: true,
      hasImage: true,
      isVerification: false,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="HabitLog" />

      <ScrollView className="flex-1 px-4">
        <Text className="text-xl font-bold text-gray-800 mb-4 mt-4">Historial de Tareas</Text>

        {/* Filters */}
        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">Filtros</Text>
          <View className="flex-row gap-2 mb-4">
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`px-4 py-2 rounded-lg border ${selectedFilter === filter ? "bg-primary/10 border-primary" : "bg-gray-100 border-gray-200"}`}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  className={`text-sm font-medium ${selectedFilter === filter ? "text-primary" : "text-gray-400"}`}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Search */}
          <View className="flex-row mb-4">
            <TextInput
              className="flex-1 bg-gray-100 rounded-l-xl px-4 py-3 text-gray-700 border border-gray-200"
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
        <View className="space-y-4 mb-8">
          {historyItems.map((item) => (
            <View key={item.id} className={`border rounded-xl p-4 ${item.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
              <View className="flex-row items-center mb-2">
                <Ionicons name={item.completed ? "checkmark-circle" : "close-circle-outline"} size={18} color={item.completed ? "#48BB78" : "#F56565"} className="mr-2" />
                <Text className="font-semibold text-base flex-1 text-gray-800">{item.title}</Text>
                {item.completed ? (
                  <Text className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Completada</Text>
                ) : (
                  <Text className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full ml-2">Incompleta</Text>
                )}
                {item.verified && (
                  <Text className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full ml-2">Verificada</Text>
                )}
              </View>
              <View className="flex-row items-center mb-1">
                <Text className="text-xs text-gray-400">{item.category}</Text>
                <Ionicons name="time-outline" size={14} color="#A0AEC0" className="ml-4" />
                <Text className="text-xs text-gray-400 ml-1">{item.time}</Text>
                <Ionicons name="calendar-outline" size={14} color="#A0AEC0" className="ml-4" />
                <Text className="text-xs text-gray-400 ml-1">{item.date}</Text>
                <Text className="text-xs text-gray-400 ml-4">{item.xp} XP</Text>
              </View>
              {item.hasImage && (
                <View className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 mt-2">
                  <Text className="text-white font-semibold text-center">Imagen de verificación</Text>
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
