import React from "react"
import { View, Text } from "react-native"

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className="bg-primary px-4 py-3">
      <Text className="text-white text-lg font-semibold text-center">{title}</Text>
    </View>
  )
}

export default Header
