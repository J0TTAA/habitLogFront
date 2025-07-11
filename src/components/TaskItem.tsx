// @ts-nocheck
import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Task {
  _id: string;
  title: string;
  description?: string;
  categoryId?: {
    _id: string;
    name: string;
    color?: string;
  };
  status: string;
  timeOfDay?: string;
  xpPercent?: number;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'Completada';
      case 'PENDING':
        return 'Pendiente';
      case 'IN_PROGRESS':
        return 'En Progreso';
      default:
        return 'Normal';
    }
  };

  return (
    <View className={`border rounded-xl p-4 mb-3 ${task.status === 'DONE' ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}> 
      <View className="flex-row items-center mb-2">
        <Ionicons 
          name={task.status === 'DONE' ? "checkmark-circle" : "ellipse-outline"} 
          size={18} 
          color={task.status === 'DONE' ? "#48BB78" : "#CBD5E1"} 
          className="mr-2" 
        />
        <Text className="font-semibold text-base flex-1 text-gray-800">{task.title}</Text>
        {task.status === 'DONE' && (
          <Text className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">Completada</Text>
        )}
      </View>
      
      {task.description && (
        <Text className="text-sm text-gray-600 mb-2">{task.description}</Text>
      )}
      
      <View className="flex-row items-center justify-between mt-1">
        <View className="flex-row items-center">
          {task.categoryId && (
            <>
              <Text className="text-xs text-gray-400">{task.categoryId.name}</Text>
              <View className="w-1 h-1 bg-gray-300 rounded-full mx-2" />
            </>
          )}
          
          {task.timeOfDay && (
            <>
              <Ionicons name="time-outline" size={14} color="#A0AEC0" />
              <Text className="text-xs text-gray-400 ml-1">{task.timeOfDay}</Text>
            </>
          )}
        </View>
        
        <View className="flex-row items-center gap-2">
          <Text className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
            {getStatusText(task.status)}
          </Text>
          
          {task.xpPercent && (
            <View className="flex-row items-center">
              <Ionicons name="star" size={12} color="#F6AD55" />
              <Text className="text-xs text-yellow-600 ml-1">{task.xpPercent} XP</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default TaskItem;
