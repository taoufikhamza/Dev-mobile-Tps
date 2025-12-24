import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <View style={styles.header}>
          <Image
            source={require('./assets/logo-vert.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.schoolName}>EMSI MAARIF</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>
            Nom : <Text style={styles.value}>TAOUFIK</Text>
          </Text>
          <Text style={styles.label}>
            Prénom : <Text style={styles.value}>HAMZA</Text>
          </Text>
          <Text style={styles.label}>
            Année universitaire : <Text style={styles.value}>2025 / 2026</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#f6f8fa',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 18,
  },
  schoolName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 1,
  },
  info: {
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 10,
  },
  value: {
    fontSize: 18,
    color: '#0f172a',
    fontWeight: '800',
  },
});
