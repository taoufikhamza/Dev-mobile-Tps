import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import CardItem from './CardItem';
import cards from '../data/cards.json';

export function CardList() {
  const [search, setSearch] = useState('');

  // Filtrer les cartes selon le texte recherché
  const filteredCards = cards.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <CardItem
      title={item.title}
      description={item.description}
      image={item.image}
      url={item.url}
    />
  );

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <TextInput
        style={styles.input}
        placeholder="Rechercher une carte..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Liste des cartes */}
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7fb',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
