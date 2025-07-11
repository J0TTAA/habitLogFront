// @ts-nocheck
import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getCurrentWeather, getWeatherHistory, getTasks } from "../api";
import Header from "../components/Header";

interface WeatherData {
  date: string;
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  icon?: string;
}

interface Task {
  _id: string;
  title: string;
  status: string;
}

const ClimateScreen = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [weatherHistory, setWeatherHistory] = useState<WeatherData[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      
      // Cargar clima actual
      const currentResponse = await getCurrentWeather();
      
      if (currentResponse.success) {
        setCurrentWeather(currentResponse.data);
      }
      
      // Cargar historial de clima
      const historyResponse = await getWeatherHistory(7);
      
      if (historyResponse.success) {
        setWeatherHistory(historyResponse.data || []);
      }
      
      // Cargar tareas para mostrar en el historial
      const tasksResponse = await getTasks();
      
      if (tasksResponse.success) {
        setTasks(tasksResponse.data || []);
      }
      
    } catch (error) {
      console.error('Error cargando datos de clima:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos del clima');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeatherData();
    setRefreshing(false);
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return "☀️";
    if (conditionLower.includes('cloud')) return "☁️";
    if (conditionLower.includes('rain')) return "🌧️";
    if (conditionLower.includes('snow')) return "❄️";
    if (conditionLower.includes('storm')) return "⛈️";
    if (conditionLower.includes('fog') || conditionLower.includes('mist')) return "🌫️";
    return "☀️";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const getTasksForDate = (date: string) => {
    // Filtrar tareas para una fecha específica
    // Esto es una implementación básica, puedes ajustarla según tu lógica de negocio
    return tasks.filter(task => {
      // Por ahora, mostrar todas las tareas
      return true;
    }).slice(0, 3); // Mostrar solo las primeras 3
  };

  const getCompletedTasksCount = (dateTasks: Task[]) => {
    return dateTasks.filter(task => task.completed).length;
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <Header title="HabitLog" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">Cargando datos del clima...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="HabitLog" />

      <ScrollView 
        className="flex-1 px-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="text-xl font-bold text-gray-800 mb-6">Clima e Historial</Text>

        {/* Current Weather */}
        <View className="bg-white rounded-xl p-4 shadow-sm mb-6 border border-gray-200">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            {getWeatherIcon(currentWeather?.condition || '')} Clima Actual
          </Text>
          {currentWeather ? (
            <>
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-3xl font-bold text-gray-800">{currentWeather.temp}°C</Text>
                <View className="items-end">
                  <Text className="text-gray-600">Humedad: {currentWeather.humidity}%</Text>
                  <Text className="text-gray-600">Viento: {currentWeather.wind} km/h</Text>
                </View>
              </View>
              <Text className="text-gray-600">{currentWeather.condition}</Text>
            </>
          ) : (
            <Text className="text-gray-500">No hay datos del clima actual</Text>
          )}
        </View>

        {/* Date Search */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Buscar por Fecha</Text>
          <View className="flex-row">
            <TextInput
              className="flex-1 bg-white rounded-l-xl px-4 py-3 text-gray-800 border border-gray-200"
              placeholder="dd - mm - aaaa"
              value={searchDate}
              onChangeText={setSearchDate}
            />
            <TouchableOpacity className="bg-primary rounded-r-xl px-4 py-3 justify-center">
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Weather History */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Historial del Clima</Text>
          {weatherHistory.length === 0 ? (
            <View className="bg-white rounded-xl p-8 items-center border border-gray-200">
              <Ionicons name="cloud-outline" size={64} color="#CBD5E0" />
              <Text className="text-gray-500 text-lg mt-4">No hay datos históricos</Text>
              <Text className="text-gray-400 text-sm mt-2 text-center">
                Los datos del clima histórico aparecerán aquí
              </Text>
            </View>
          ) : (
            <View className="space-y-4">
              {weatherHistory.map((day, index) => {
                const dateTasks = getTasksForDate(day.date);
                const completedCount = getCompletedTasksCount(dateTasks);
                
                return (
                  <View key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                    <View className="flex-row justify-between items-center mb-3">
                      <View className="flex-row items-center">
                        <Text className="text-2xl mr-2">{getWeatherIcon(day.condition)}</Text>
                        <View>
                          <Text className="font-semibold text-gray-800">{formatDate(day.date)}</Text>
                          <Text className="text-gray-600 text-sm">{day.condition}</Text>
                        </View>
                      </View>
                      <View className="items-end">
                        <Text className="text-xl font-bold text-gray-800">{day.temp}°C</Text>
                        <Text className="text-gray-600 text-xs">
                          {day.humidity}% • {day.wind} km/h
                        </Text>
                      </View>
                    </View>

                    {dateTasks.length > 0 && (
                      <>
                        <Text className="font-medium text-gray-800 mb-2">Tareas del día</Text>
                        <View className="space-y-1">
                          {dateTasks.map((task, taskIndex) => (
                            <View key={taskIndex} className="flex-row items-center">
                              <View className={`w-2 h-2 rounded-full mr-2 ${task.completed ? "bg-green-500" : "bg-gray-300"}`} />
                              <Text className={`text-sm ${task.completed ? "text-gray-800" : "text-gray-600"}`}>
                                {task.title}
                              </Text>
                            </View>
                          ))}
                        </View>

                        <TouchableOpacity className="bg-blue-100 rounded-lg py-2 px-4 mt-3 self-end">
                          <Text className="text-blue-700 font-medium text-sm">
                            {completedCount}/{dateTasks.length} completadas
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClimateScreen;
