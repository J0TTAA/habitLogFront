import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createTask, getCategories } from "../api";

interface Category {
  _id: string;
  name: string;
  color?: string;
}

const CreateTaskModal = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [xp, setXp] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      
      if (response.success) {
        setCategories(response.data || []);
      } else {
        console.error('Error cargando categorías:', response.message);
      }
    } catch (error) {
      console.error('Error en loadCategories:', error);
    }
  };

  const handleCreateTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }

    try {
      setLoading(true);
      
      const taskData = {
        title: title.trim(),
        description: description.trim() || undefined,
        category: selectedCategory || undefined,
        priority: priority,
        xp: xp ? parseInt(xp) : undefined,
        dueDate: dueDate || undefined,
      };

      const response = await createTask(taskData);
      
      if (response.success) {
        Alert.alert('¡Éxito!', 'Tarea creada correctamente', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        Alert.alert('Error', response.message || 'No se pudo crear la tarea');
      }
    } catch (error) {
      console.error('Error creando tarea:', error);
      Alert.alert('Error', 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const priorities = [
    { value: 'low', label: 'Baja', color: 'text-green-600 bg-green-100' },
    { value: 'medium', label: 'Media', color: 'text-yellow-600 bg-yellow-100' },
    { value: 'high', label: 'Alta', color: 'text-red-600 bg-red-100' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-black/50">
      <View className="flex-1 justify-center px-4">
        <View className="bg-white rounded-xl p-6 mx-4 max-h-[90%]">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">Crear Nueva Tarea</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="close" size={24} color="#718096" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="space-y-4">
              <View>
                <Text className="text-gray-800 font-medium mb-2">Título *</Text>
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 border border-gray-200"
                  placeholder="Ej. Ejercicio matutino"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View>
                <Text className="text-gray-800 font-medium mb-2">Descripción</Text>
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 border border-gray-200"
                  placeholder="Descripción opcional de la tarea"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View>
                <Text className="text-gray-800 font-medium mb-2">Categoría</Text>
                <TouchableOpacity
                  className="bg-gray-100 rounded-lg px-4 py-3 border border-gray-200"
                  onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                >
                  <Text className={selectedCategory ? "text-gray-800" : "text-gray-500"}>
                    {selectedCategory || "Seleccionar categoría"}
                  </Text>
                </TouchableOpacity>
                
                {showCategoryPicker && (
                  <View className="mt-2 bg-gray-50 rounded-lg p-2 border border-gray-200">
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category._id}
                        className="py-2 px-3 rounded-lg"
                        onPress={() => {
                          setSelectedCategory(category.name);
                          setShowCategoryPicker(false);
                        }}
                      >
                        <Text className="text-gray-800">{category.name}</Text>
                      </TouchableOpacity>
                    ))}
                    {categories.length === 0 && (
                      <Text className="text-gray-500 text-center py-2">No hay categorías disponibles</Text>
                    )}
                  </View>
                )}
              </View>

              <View>
                <Text className="text-gray-800 font-medium mb-2">Prioridad</Text>
                <View className="flex-row gap-2">
                  {priorities.map((p) => (
                    <TouchableOpacity
                      key={p.value}
                      className={`flex-1 py-2 px-3 rounded-lg border ${
                        priority === p.value 
                          ? `${p.color} border-current` 
                          : 'bg-gray-100 border-gray-200'
                      }`}
                      onPress={() => setPriority(p.value)}
                    >
                      <Text className={`text-center font-medium ${
                        priority === p.value ? 'text-current' : 'text-gray-600'
                      }`}>
                        {p.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text className="text-gray-800 font-medium mb-2">Experiencia XP</Text>
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 border border-gray-200"
                  placeholder="50"
                  value={xp}
                  onChangeText={setXp}
                  keyboardType="numeric"
                />
              </View>

              <View>
                <Text className="text-gray-800 font-medium mb-2">Fecha límite</Text>
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-3 text-gray-800 border border-gray-200"
                  placeholder="YYYY-MM-DD (opcional)"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            className={`rounded-lg py-4 mt-6 ${loading ? 'bg-gray-400' : 'bg-primary'}`}
            onPress={handleCreateTask}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-center">
              {loading ? 'Creando...' : 'Crear Tarea'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateTaskModal;
