// screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Paramètres</Text>
      <Text style={styles.subtitle}>Ici tu pourras configurer l'app plus tard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff3e0' },
  bigText: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#ef6c00' },
  subtitle: { fontSize: 16, color: '#555' },
});