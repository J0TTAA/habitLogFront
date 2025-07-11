# HabitLog - App de Seguimiento de Hábitos

Aplicación móvil desarrollada con React Native y Expo para el seguimiento y gestión de hábitos y tareas diarias.

## 🚀 Características

- Autenticación de usuarios con JWT
- Gestión de tareas (crear, editar, completar, eliminar)
- Categorización de tareas
- Seguimiento de progreso y XP
- Información del clima
- Interfaz moderna con NativeWind/Tailwind CSS

## 📦 Instalación

1. **Clonar e instalar dependencias**
   ```bash
   git clone <url-del-repositorio>
   cd habitLogFront
   npm install
   ```

2. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la raíz del proyecto
   echo "API_URL=http://192.168.1.13:3021" > .env
   ```

## 🚀 Comandos de Inicio

```bash
# Iniciar desarrollo
npx expo start

# Iniciar con caché limpio
npx expo start --clear

# Abrir en Android
npx expo start --android

# Abrir en iOS
npx expo start --ios

# Abrir en web
npx expo start --web
```

## 📱 Uso

1. **Instalar Expo Go** en tu dispositivo móvil
2. **Ejecutar** `npx expo start` en tu terminal
3. **Escanear** el código QR con Expo Go
4. **¡Listo!** La app se cargará automáticamente

## 🔧 Configuración del Backend

La app requiere un backend corriendo en `http://192.168.1.13:3021` con endpoints para:
- Usuarios (login, registro, perfil)
- Tareas (CRUD completo)
- Categorías
- Clima

## 📁 Estructura

```
src/
├── api/           # Funciones de API
├── components/    # Componentes reutilizables
├── contexts/      # Contextos de React
├── screens/       # Pantallas de la app
└── types/         # Definiciones TypeScript
```

## 🛠️ Tecnologías

- React Native + Expo
- NativeWind (Tailwind CSS)
- TypeScript
- React Navigation
- AsyncStorage

---

**¡Disfruta desarrollando con HabitLog! 🎉**