// @ts-nocheck
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
  verified?: boolean
}

interface TaskItemProps {
  task: Task
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  return (
    <View className={`border rounded-xl p-4 mb-3 ${task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}> 
      <View className="flex-row items-center mb-2">
        <Ionicons name={task.completed ? "checkmark-circle" : "ellipse-outline"} size={18} color={task.completed ? "#48BB78" : "#CBD5E1"} className="mr-2" />
        <Text className="font-semibold text-base flex-1 text-gray-800">{task.title}</Text>
        {task.completed && (
          <Text className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Verificada</Text>
        )}
      </View>
      <View className="flex-row items-center mt-1">
        <Text className="text-xs text-gray-400">{task.category}</Text>
        <Ionicons name="time-outline" size={14} color="#A0AEC0" className="ml-4" />
        <Text className="text-xs text-gray-400 ml-1">{task.time}</Text>
      </View>
    </View>
  )
}

export default TaskItem
