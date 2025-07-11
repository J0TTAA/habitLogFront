// @ts-nocheck
import "./global.css"
import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"

import HomeScreen from "./src/screens/HomeScreen"
import TasksScreen from "./src/screens/TasksScreen"
import HistoryScreen from "./src/screens/HistoryScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import ClimateScreen from "./src/screens/ClimateScreen"
import CreateTaskModal from "./src/components/CreateTaskModal"
import VerifyTaskModal from "./src/components/VerifyTaskModal"

const Tab = createBottomTabNavigator<any>()
const Stack = createStackNavigator<any>()

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#4A9B8E",
        tabBarInactiveTintColor: "#718096",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
          height: 70,
          paddingBottom: 15,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tareas" 
        component={TasksScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "checkmark-circle" : "checkmark-circle-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Historial" 
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "time" : "time-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Clima" 
        component={ClimateScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "partly-sunny" : "partly-sunny-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="CreateTask" component={CreateTaskModal} options={{ presentation: "modal" }} />
        <Stack.Screen name="VerifyTask" component={VerifyTaskModal} options={{ presentation: "modal" }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
