import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../store/todosSlice"; 

export default function TodoListScreen({ navigation }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todos.length === 0) {
        dispatch(addTodo({ id: 1, title: "Faire les courses" }));
        dispatch(addTodo({ id: 2, title: "Sortir le chien" }));
        dispatch(addTodo({ id: 3, title: "Coder une app RN" }));
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Mes tâches (Redux)</Text>
      
      {}
      <Button 
        title="Ajouter une tâche random" 
        onPress={() => dispatch(addTodo({ id: Date.now(), title: "Nouvelle tâche " + Date.now() }))} 
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { id: item.id, title: item.title })}
          >
            <Text style={{ padding: 10, fontSize: 18 }}>- {item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
} 

// Partie ZUSTAND 
/*
import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoListScreen({ navigation }) {
  const { todos, addTodo } = useTodoStore();

  useEffect(() => {
    if (todos.length === 0) {
      addTodo({ id: 1, title: "Faire les courses (Zustand)" });
      addTodo({ id: 2, title: "Sortir le chien (Zustand)" });
      addTodo({ id: 3, title: "Coder une app RN (Zustand)" });
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Mes tâches (Zustand)</Text>
      
      <Button 
        title="Ajouter tâche" 
        onPress={() => addTodo({ id: Date.now(), title: "Tâche Zustand " + Date.now() })} 
      />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Details", { id: item.id, title: item.title })}
          >
            <Text style={{ padding: 10, fontSize: 18 }}>- {item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
  */