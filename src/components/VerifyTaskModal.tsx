import { View, Text, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"

const VerifyTaskModal = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1 bg-black/50">
      <View className="flex-1 justify-center px-4">
        <View className="bg-surface rounded-xl p-6 mx-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-lg font-bold text-text">Verificar: Leer 30 minutos</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="#718096" />
            </TouchableOpacity>
          </View>

          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gray-100 rounded-lg items-center justify-center mb-4">
              <Ionicons name="camera-outline" size={32} color="#718096" />
            </View>
            <Text className="text-textSecondary text-center">Arrastra una imagen aquí</Text>
          </View>

          <TouchableOpacity className="bg-gray-100 rounded-lg py-3 mb-4">
            <Text className="text-primary text-center font-medium">📷 Seleccionar imagen</Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-primary rounded-lg py-4" onPress={() => navigation.goBack()}>
            <Text className="text-white font-semibold text-center">📸 Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VerifyTaskModal
