import React from "react"
import { View } from "react-native"

interface ProgressBarProps {
  progress: number
  color?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = "#4A9B8E" }) => {
  return (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <View
        className="h-full rounded-full"
        style={{
          width: `${Math.min(progress, 100)}%`,
          backgroundColor: color,
        }}
      />
    </View>
  )
}

export default ProgressBar
