import React from "react"
import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface Task {
  id: number
  title: string
  category: string
  completed: boolean
  time: string
  xp: number
}

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <View className="bg-surface rounded-xl p-4 shadow-sm">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-1">
            <View className={`w-3 h-3 rounded-full mr-2 ${task.completed ? "bg-success" : "bg-gray-300"}`} />
            <Text className="font-semibold text-text">{task.title}</Text>
          </View>
          <Text className="text-textSecondary text-sm ml-5">{task.category}</Text>
          <Text className="text-textSecondary text-sm ml-5">{task.time}</Text>
        </View>
        <View className="items-end">
          <Text className="text-primary font-bold">{task.xp} XP</Text>
          {task.completed && <Ionicons name="checkmark-circle" size={20} color="#48BB78" />}
        </View>
      </View>
    </View>
  )
}

export default TaskItem
