import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginAPI, register as registerAPI, getProfile, setAuthToken } from '../api';

interface User {
  id: string;
  email: string;
  nickname: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, nickname: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken); // Configurar token en la API
        
        // Verificar si el token sigue siendo válido
        try {
          const profileResponse = await getProfile();
          if (profileResponse.success) {
            setUser(profileResponse.data);
            await AsyncStorage.setItem('user', JSON.stringify(profileResponse.data));
          } else {
            // Token inválido, limpiar datos
            await logout();
          }
        } catch (error) {
          await logout();
        }
      }
    } catch (error) {
      console.error('Error cargando autenticación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await loginAPI(email, password);
      
      // Verificar si la respuesta tiene token y user directamente
      if (response.token && response.user) {
        
        setToken(response.token);
        setUser(response.user);
        setAuthToken(response.token); // Configurar token en la API
        
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else if (response.success && response.data) {
        // Formato alternativo con success y data
        const { token: newToken, user: userData } = response.data;
        
        setToken(newToken);
        setUser(userData);
        setAuthToken(newToken);
        
        await AsyncStorage.setItem('authToken', newToken);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, message: 'Inicio de sesión exitoso' };
      } else {
        return { success: false, message: response.message || 'Error en el inicio de sesión' };
      }
    } catch (error) {
      console.error('Error en contexto de login:', error);
      return { success: false, message: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, nickname: string) => {
    try {
      setIsLoading(true);
      const response = await registerAPI(email, password, nickname);
      
      // Verificar si la respuesta tiene token y user directamente
      if (response.token && response.user) {
        setToken(response.token);
        setUser(response.user);
        setAuthToken(response.token);
        
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
        
        return { success: true, message: 'Registro exitoso' };
      } else if (response.success && response.data) {
        // Formato alternativo con success y data
        const { token: newToken, user: userData } = response.data;
        
        setToken(newToken);
        setUser(userData);
        setAuthToken(newToken);
        
        await AsyncStorage.setItem('authToken', newToken);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true, message: 'Registro exitoso' };
      } else {
        return { success: false, message: response.message || 'Error en el registro' };
      }
    } catch (error) {
      return { success: false, message: 'Error de conexión' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 