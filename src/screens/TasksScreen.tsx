import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { Ionicons } from "@expo/vector-icons"

const TasksScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const tasks = [
    {
      id: 1,
      title: "Ejercicio matutino",
      category: "Salud",
      completed: false,
      time: "30 min",
      xp: 50,
      canVerify: true,
    },
    {
      id: 2,
      title: "Leer 30 minutos",
      category: "Educación",
      completed: false,
      time: "30 min",
      xp: 40,
      canVerify: true,
    },
    {
      id: 3,
      title: "Meditar",
      category: "Bienestar",
      completed: true,
      time: "15 min",
      xp: 30,
      canVerify: false,
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between px-4 py-3 bg-primary">
        <Text className="text-white text-lg font-semibold">Gestión de Tareas</Text>
        <TouchableOpacity
          className="bg-white/20 rounded-lg px-3 py-1"
          onPress={() => navigation.navigate("CreateTask" as never)}
        >
          <Text className="text-white font-medium">+ Nueva Tarea</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4">
        <View className="space-y-3">
          {tasks.map((task) => (
            <View key={task.id} className="bg-surface rounded-xl p-4 shadow-sm">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="font-semibold text-text mb-1">{task.title}</Text>
                  <Text className="text-textSecondary text-sm">{task.category}</Text>
                </View>
                <View className="flex-row space-x-2">
                  <TouchableOpacity className="p-2">
                    <Ionicons name="create-outline" size={20} color="#718096" />
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2">
                    <Ionicons name="trash-outline" size={20} color="#F56565" />
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#718096" />
                  <Text className="text-textSecondary text-sm ml-1">{task.time}</Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-primary font-medium">{task.xp} XP</Text>
                </View>
              </View>

              {task.canVerify && !task.completed && (
                <TouchableOpacity
                  className="bg-primary rounded-lg py-2 px-4"
                  onPress={() => navigation.navigate("VerifyTask", { task })}
                >
                  <Text className="text-white font-medium text-center">Verificar</Text>
                </TouchableOpacity>
              )}

              {task.completed && (
                <View className="bg-success/10 rounded-lg py-2 px-4">
                  <Text className="text-success font-medium text-center">✓ Completada</Text>
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
