import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from "react-native";
import { fetchTodosAxios } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchTodosAxios()
      .then(setTodos)
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les tâches");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  const textColor = theme === "dark" ? "#fff" : "#000";
  const bgColor = theme === "dark" ? "#333" : "#fff";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Button title={`Mode: ${theme}`} onPress={toggleTheme} />
      {error && <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text>}
      <Text style={[styles.header, { color: textColor }]}>Données API (Online)</Text>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10, color: textColor }}>• {item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 }
});