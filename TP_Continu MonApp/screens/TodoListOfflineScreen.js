import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { loadTodos, addTodoOffline, updateTodoOffline, deleteTodoOffline } from "../services/database";
import { ThemeContext } from "../context/ThemeContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { theme } = useContext(ThemeContext);

  const refreshTodos = () => {
    const data = loadTodos();
    setTodos(data);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const handleAddOrUpdate = () => {
    if (!title.trim()) return;

    if (editingId) {
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      addTodoOffline(title);
    }
    setTitle("");
    refreshTodos();
  };

  const handleDelete = (id) => {
    deleteTodoOffline(id);
    refreshTodos();
  };

  const textColor = theme === "dark" ? "#fff" : "#000";
  const itemBg = theme === "dark" ? "#444" : "#eee";

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Nouvelle tâche SQLite"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
        style={[styles.input, { color: textColor, borderColor: textColor }]}
      />
      <Button
        title={editingId ? "Mettre à jour" : "Ajouter (Offline)"}
        onPress={handleAddOrUpdate}
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: itemBg }]}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setTitle(item.title);
                setEditingId(item.id);
              }}
            >
              <Text style={{ color: textColor, fontSize: 16 }}>{item.title}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity onPress={() => {
                setTitle(item.title);
                setEditingId(item.id);
              }}>
                <Ionicons name="create-outline" size={24} color="blue" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, marginTop: 10, borderRadius: 5 }
});