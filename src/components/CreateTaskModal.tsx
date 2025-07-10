import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

const CreateTaskModal = () => {
  const navigation = useNavigation()
  const [taskName, setTaskName] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [experienceXP, setExperienceXP] = useState("")
  const [timeOfDay, setTimeOfDay] = useState("")

  const categories = ["Salud", "Educación", "Bienestar", "Trabajo"]

  return (
    <SafeAreaView className="flex-1 bg-black/50">
      <View className="flex-1 justify-center px-4">
        <View className="bg-surface rounded-xl p-6 mx-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-text">Crear Nueva Tarea</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="#718096" />
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            <View>
              <Text className="text-text font-medium mb-2">Nombre de la tarea</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-text"
                placeholder="Ej. Ejercicio matutino"
                value={taskName}
                onChangeText={setTaskName}
              />
            </View>

            <View>
              <Text className="text-text font-medium mb-2">Categoría</Text>
              <View className="bg-gray-100 rounded-lg px-4 py-3">
                <Text className="text-textSecondary">Seleccionar categoría</Text>
              </View>
            </View>

            <View>
              <Text className="text-text font-medium mb-2">Experiencia XP</Text>
              <TextInput
                className="bg-gray-100 rounded-lg px-4 py-3 text-text"
                placeholder="50"
                value={experienceXP}
                onChangeText={setExperienceXP}
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="text-text font-medium mb-2">Hora del día</Text>
              <View className="bg-gray-100 rounded-lg px-4 py-3">
                <Text className="text-textSecondary">-- : -- --</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity className="bg-primary rounded-lg py-4 mt-6" onPress={() => navigation.goBack()}>
            <Text className="text-white font-semibold text-center">Crear Tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default CreateTaskModal
