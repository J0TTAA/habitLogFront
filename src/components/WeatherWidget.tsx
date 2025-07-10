import { View, Text } from "react-native"

const WeatherWidget = () => {
  return (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-text mb-3">🌤️ Clima Actual</Text>
      <View className="bg-surface rounded-xl p-4 shadow-sm">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-2xl font-bold text-text">22°C</Text>
            <Text className="text-textSecondary">Soleado</Text>
          </View>
          <View className="items-end">
            <Text className="text-textSecondary text-sm">Humedad: 65%</Text>
            <Text className="text-textSecondary text-sm">Viento: 10 km/h</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default WeatherWidget
