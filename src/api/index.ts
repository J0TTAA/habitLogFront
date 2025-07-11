

import { API_URL } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper para manejar el token JWT
let authToken: string | null = null;

export const setAuthToken = (token: string) => { 
  authToken = token; 
  AsyncStorage.setItem('authToken', token);
};

export const getAuthToken = async () => {
  if (!authToken) {
    authToken = await AsyncStorage.getItem('authToken');
  }
  return authToken;
};

const getHeaders = async () => {
  const token = await getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
};

// --- USER ---
export const register = async (email: string, password: string, nickname: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/user/register`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password, nickname }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/user/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error de conexión' };
  }
};

export const getProfile = async () => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/user/profile`, {
      headers,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const updateProfile = async (nickname: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/user/profile`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ nickname }),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

// --- TASKS ---
export const createTask = async (data: any) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const getTasks = async () => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks`, { headers });
    const data = await res.json();
    
    // Si la respuesta es un array, envolverlo en el formato esperado
    if (Array.isArray(data)) {
      return { success: true, data };
    }
    
    // Si ya tiene el formato esperado, devolverlo tal como está
    return data;
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const updateTask = async (id: string, data: any) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const deleteTask = async (id: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const completeTask = async (id: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks/${id}/complete`, {
      method: "POST",
      headers,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const restoreTask = async (id: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks/${id}/restore`, {
      method: "POST",
      headers,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const getDeletedTasks = async () => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/tasks/deleted`, { headers });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

// --- CATEGORIES ---
export const createCategory = async (data: any) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const getCategories = async () => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/categories`, { headers });
    const data = await res.json();
    
    // Si la respuesta es un array, envolverlo en el formato esperado
    if (Array.isArray(data)) {
      return { success: true, data };
    }
    
    // Si ya tiene el formato esperado, devolverlo tal como está
    return data;
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const updateCategory = async (id: string, data: any) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers,
    });
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

// --- WEATHER ---
export const getCurrentWeather = async (city = "Santiago,CL") => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/weather/current?city=${encodeURIComponent(city)}`, { headers });
    const data = await res.json();
    
    // Si la respuesta es un objeto pero no tiene success, envolverlo
    if (data && typeof data === 'object' && !data.hasOwnProperty('success')) {
      return { success: true, data };
    }
    
    return data;
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

export const getWeatherHistory = async (days = 7, city = "Santiago,CL") => {
  try {
    const headers = await getHeaders();
    const res = await fetch(`${API_URL}/api/weather/history?days=${days}&city=${encodeURIComponent(city)}`, { headers });
    const data = await res.json();
    
    // Si la respuesta es un array, envolverlo en el formato esperado
    if (Array.isArray(data)) {
      return { success: true, data };
    }
    
    // Si es un objeto pero no tiene success, envolverlo
    if (data && typeof data === 'object' && !data.hasOwnProperty('success')) {
      return { success: true, data };
    }
    
    return data;
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};

// --- HEALTH ---
export const getHealth = async () => {
  try {
    const res = await fetch(`${API_URL}/api/health`);
    return await res.json();
  } catch (error) {
    return { success: false, message: 'Error de conexión' };
  }
};


