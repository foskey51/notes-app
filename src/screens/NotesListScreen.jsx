import React, { useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NoteCard from '../components/NoteCard';
import SearchSortBar from '../components/SearchSortBar';
import { useStore } from '../store/useStore';

export default function NotesListScreen({ navigation }) {
  const { notes, deleteNote } = useStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('updatedDesc');

  const filteredAndSorted = notes
    .filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'updatedDesc') return b.updatedAt - a.updatedAt;
      if (sort === 'updatedAsc') return a.updatedAt - b.updatedAt;
      if (sort === 'titleAsc') return a.title.localeCompare(b.title);
      if (sort === 'titleDesc') return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <View style={styles.container}>
      <SearchSortBar
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />

      {filteredAndSorted.length === 0 ? (
        <View style={styles.emptyWrapper}>
        <Text style={styles.emptyTitle}>Welcome to Notes :) </Text>
        <Text style={styles.emptySubtitle}>Start capturing your thoughts and ideas.</Text>
      </View>
      ) : (
        <FlatList
          data={filteredAndSorted}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <NoteCard
              note={item}
              onPress={() => navigation.navigate('NoteEdit', { note: item })}
              onDelete={() => deleteNote(item.id)}
            />
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NoteEdit', { note: null })}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF'
  },
 emptyWrapper: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: -80
 },
 emptyTitle: {
   fontSize: 30,
   fontWeight: '800',
   textAlign: 'center',
   color: '#B38700',
   marginBottom: 10
 },
 emptySubtitle: {
   fontSize: 18,
   textAlign: 'center',
   color: '#A07F00',
   lineHeight: 28
 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    elevation: 4
  },
  fabText: {
    fontSize: 34,
    lineHeight: 36,
    color: '#000'
  }
});
