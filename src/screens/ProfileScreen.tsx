// @ts-nocheck
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import Header from "../components/Header"
import ProgressBar from "../components/ProgressBar"
import { useAuth } from "../contexts/AuthContext"

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: logout },
      ]
    );
  };

  const weeklyProgress = [
    { day: "L", completed: true },
    { day: "M", completed: true },
    { day: "X", completed: true },
    { day: "J", completed: true },
    { day: "V", completed: false },
    { day: "S", completed: false },
    { day: "D", completed: false },
  ]

  const categories = [
    { name: "Salud", progress: 25, total: 30, xp: 450, color: "#48BB78" },
    { name: "Educación", progress: 18, total: 25, xp: 320, color: "#4299E1" },
    { name: "Bienestar", progress: 22, total: 28, xp: 280, color: "#9F7AEA" },
    { name: "Trabajo", progress: 15, total: 20, xp: 197, color: "#ED8936" },
  ]

  const achievements = [
    {
      id: 1,
      title: "Racha de 7 días",
      subtitle: "Mantén el ritmo",
      icon: "🔥",
      color: "#FED7D7",
    },
    {
      id: 2,
      title: "100 tareas completadas",
      subtitle: "Increíble progreso",
      icon: "💯",
      color: "#C6F6D5",
    },
  ]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Perfil" />

      <ScrollView className="flex-1 px-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-3">
            <Text className="text-white text-2xl font-bold">
              {user?.nickname?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-xl font-bold text-text mr-2">{user?.nickname || 'Usuario'}</Text>
            <Ionicons name="checkmark-circle" size={20} color="#48BB78" />
          </View>
          <Text className="text-textSecondary text-sm mt-1">{user?.email}</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-between mb-6">
          <View className="items-center">
            <Text className="text-2xl font-bold text-primary">1247</Text>
            <Text className="text-textSecondary text-sm">XP Total</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-success">89</Text>
            <Text className="text-textSecondary text-sm">Días Consecutivos</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-warning">7</Text>
            <Text className="text-textSecondary text-sm">Metas Diarias</Text>
          </View>
        </View>

        {/* Weekly Progress */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">📅 Progreso Semanal</Text>
          <View className="flex-row justify-between">
            {weeklyProgress.map((day, index) => (
              <View key={index} className="items-center">
                <View
                  className={`w-10 h-10 rounded-full items-center justify-center ${
                    day.completed ? "bg-primary" : "bg-gray-200"
                  }`}
                >
                  <Text className={`font-medium ${day.completed ? "text-white" : "text-textSecondary"}`}>
                    {day.day}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Progress by Category */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">📊 Progreso por Categoría</Text>
          <View className="space-y-4">
            {categories.map((category, index) => (
              <View key={index} className="bg-surface rounded-xl p-4 shadow-sm">
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-medium text-text">{category.name}</Text>
                  <Text className="text-primary font-bold">{category.xp} XP</Text>
                </View>
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-textSecondary text-sm">
                    {category.progress}/{category.total}
                  </Text>
                  <Text className="text-textSecondary text-sm">
                    {Math.round((category.progress / category.total) * 100)}%
                  </Text>
                </View>
                <ProgressBar progress={(category.progress / category.total) * 100} color={category.color} />
              </View>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-text mb-3">🏆 Logros Recientes</Text>
          <View className="space-y-3">
            {achievements.map((achievement) => (
              <View
                key={achievement.id}
                className="bg-surface rounded-xl p-4 shadow-sm"
                style={{ backgroundColor: achievement.color }}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{achievement.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-semibold text-text">{achievement.title}</Text>
                    <Text className="text-textSecondary text-sm">{achievement.subtitle}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Logout Button */}
        <View className="mb-8">
          <TouchableOpacity
            className="bg-red-500 rounded-xl py-4"
            onPress={handleLogout}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
