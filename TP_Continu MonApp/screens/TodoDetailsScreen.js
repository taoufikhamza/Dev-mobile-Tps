import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { removeTodo } from "../store/todosSlice";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title } = route.params;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeTodo(id)); 
    navigation.goBack();     
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>{title}</Text>
      <Text style={{ marginBottom: 40 }}>ID: {id}</Text>
      
      <Button 
        title="Supprimer cette tâche" 
        color="red" 
        onPress={handleDelete} 
      />
    </View>
  );
}