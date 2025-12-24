import React, { useMemo, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated, Linking } from 'react-native';

export default function CardItem({ title, description, image, url }) {
  const scale = useRef(new Animated.Value(1)).current;
  const [expanded, setExpanded] = useState(false);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  };

  const handleOpenLink = async () => {
    if (!url) return;
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (e) {
      // noop
    }
  };

  const numberOfLines = expanded ? undefined : 2;

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}> 
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut} android_ripple={{ color: '#eee' }}>
        <Image source={{ uri: image }} style={styles.cover} />
      </Pressable>
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc} numberOfLines={numberOfLines}>{description}</Text>
        <View style={styles.actionsRow}>
          <Pressable onPress={() => setExpanded((v) => !v)} style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}>
            <Text style={styles.chipText}>{expanded ? 'Voir moins' : 'Voir plus'}</Text>
          </Pressable>
          <Pressable disabled={!url} onPress={handleOpenLink} style={({ pressed }) => [styles.button, !url && styles.buttonDisabled, pressed && styles.buttonPressed]}>
            <Text style={[styles.buttonText, !url && styles.buttonTextDisabled]}>{url ? 'Ouvrir le lien' : 'Pas de lien'}</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  cover: { width: '100%', height: 150 },
  body: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  desc: { color: '#555' },
  actionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f0f2f5',
  },
  chipPressed: { opacity: 0.8 },
  chipText: { color: '#333' },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#3b82f6',
  },
  buttonPressed: { opacity: 0.9 },
  buttonDisabled: { backgroundColor: '#b9d1ff' },
  buttonText: { color: '#fff', fontWeight: '600' },
  buttonTextDisabled: { color: '#f0f4ff' },
});
