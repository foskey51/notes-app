import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

export default function NoteCard({ note, onPress, onDelete }) {
  const preview = note.body.trim() === '' ? 'No content' : note.body.slice(0, 80) + (note.body.length > 80 ? '...' : '');

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        {note.image ? (
          <Image source={{ uri: note.image }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.placeholder]}>
            <Ionicons name="image-outline" size={32} color="#999" />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {note.title || '(No title)'}
          </Text>
          <Text style={styles.preview} numberOfLines={3}>
            {preview}
          </Text>
          <Text style={styles.date}>
            {new Date(note.updatedAt).toLocaleDateString()} ·{' '}
            {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={(e) => {
            e.stopPropagation(); // prevent opening editor
            onDelete();
          }}
        >
          <Ionicons name="trash-outline" size={24} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'flex-start',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  deleteBtn: {
    padding: 8,
    justifyContent: 'center',
  },
});