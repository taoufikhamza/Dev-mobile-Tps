import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AppBar({ title, back }) {
  const navigation = useNavigation();

  return (
    <View style={styles.appBar}>
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>⬅️</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title || "Mon Application"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#2f80ed", // using primary color consistent with theme generally or hardcoded as per original
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 4,
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    fontSize: 20,
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
