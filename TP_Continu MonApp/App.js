import React, { useEffect, useState, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext"; 

import TodoListFetchScreen from "./screens/TodoListFetchScreen";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

const Drawer = createDrawerNavigator();

function MainNavigator() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <View style={[styles.container, theme === "dark" ? styles.dark : styles.light]}>
      <Drawer.Navigator screenOptions={{ 
        headerStyle: { backgroundColor: theme === 'dark' ? '#333' : '#fff' },
        headerTintColor: theme === 'dark' ? '#fff' : '#000',
        drawerStyle: { backgroundColor: theme === 'dark' ? '#333' : '#fff' },
        drawerActiveTintColor: 'blue',
        drawerInactiveTintColor: 'gray'
      }}>
        <Drawer.Screen name="API (Online)" component={TodoListFetchScreen} />
        <Drawer.Screen name="SQLite (Offline)" component={TodoListOfflineScreen} />
      </Drawer.Navigator>
    </View>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    const prepareDb = async () => {
      try {
        await initDB(); 
      } catch (e) {
        console.warn(e);
      } finally {
        setDbReady(true);
      }
    };
    prepareDb();
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  light: { backgroundColor: "#ffffff" },
  dark: { backgroundColor: "#121212" },
});