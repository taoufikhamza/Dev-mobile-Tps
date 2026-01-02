import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { useEffect, useContext, useState } from "react";
import { useTodoStore } from "../store/useTodoStore";
import { AuthContext } from "../context/AuthContext";
import AppBar from "../components/AppBar";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListScreen() {
  const { user } = useContext(AuthContext);
  const { theme, mode } = useContext(ThemeContext);
  const { todos, loadTodos, addTodo, deleteTodo, toggleTodo } = useTodoStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (user) {
      loadTodos(user.uid);
    }
  }, [user]);

  const handleAddTodo = () => {
    if (!title.trim()) return;
    addTodo(user.uid, title);
    setTitle("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <AppBar title="Mes tâches" />

      {/* Input Area */}
      <View style={{ padding: 20 }}>
        <View style={{
          flexDirection: "row",
          backgroundColor: theme.card,
          borderRadius: 12,
          padding: 5,
          paddingRight: 10,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}>
          <TextInput
            placeholder="Ajouter une nouvelle tâche..."
            placeholderTextColor="#999"
            value={title}
            onChangeText={setTitle}
            style={{
              flex: 1,
              padding: 15,
              color: theme.text,
              fontSize: 16
            }}
          />
          <TouchableOpacity
            onPress={handleAddTodo}
            style={{
              backgroundColor: theme.primary,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8
            }}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Liste */}
      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor: theme.card,
            padding: 15,
            marginBottom: 12,
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderLeftWidth: 5,
            borderLeftColor: item.completed ? "#ccc" : theme.primary,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
            opacity: item.completed ? 0.7 : 1
          }}>
            <TouchableOpacity onPress={() => toggleTodo(user.uid, item.id)} style={{ marginRight: 15 }}>
              <Text style={{ fontSize: 20 }}>{item.completed ? "✅" : "⬜"}</Text>
            </TouchableOpacity>

            <Text style={{
              fontSize: 16,
              color: theme.text,
              flex: 1,
              marginRight: 10,
              textDecorationLine: item.completed ? "line-through" : "none",
              color: item.completed ? "#999" : theme.text
            }}>
              {item.title}
            </Text>

            <TouchableOpacity
              onPress={() => deleteTodo(user.uid, item.id)}
              style={{ padding: 8 }}
            >
              <Text style={{ fontSize: 18 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}