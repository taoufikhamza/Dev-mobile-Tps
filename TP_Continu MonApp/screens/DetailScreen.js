// screens/DetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen({ route }) {
  const { id } = route.params || { id: 'aucun' };

  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>Écran de détails</Text>
      <Text style={styles.idText}>ID reçu : {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e3f2fd' },
  bigText: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#1565c0' },
  idText: { fontSize: 24, color: '#d32f2f', fontWeight: '600' },
});