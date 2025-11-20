import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Alert, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useStore } from '../store/useStore';
import * as MediaLibrary from 'expo-media-library';

export default function NoteEditScreen({ route, navigation }) {
  const { note } = route.params;
  const { addNote, updateNote } = useStore();

  const [title, setTitle] = useState(note?.title || '');
  const [body, setBody] = useState(note?.body || '');
  const [image, setImage] = useState(note?.image || null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permission denied');

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Camera permission denied');

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
    }
  };

  const saveNote = () => {
    if (!title.trim()) return Alert.alert('Title required');

    const noteData = {
      id: note?.id || Date.now().toString(),
      title,
      body,
      image,
      updatedAt: Date.now(),
    };

    if (note) updateNote(note.id, noteData);
    else addNote(noteData);

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.title}
      />

      <TextInput
        placeholder="Start typing..."
        value={body}
        onChangeText={setBody}
        multiline
        style={styles.body}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      )}

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick from Gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>

        {image && (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setImage(null)}>
            <Text style={styles.deleteButtonText}>Remove Image</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    backgroundColor: '#F5F5F5',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  },
  body: {
    minHeight: 200,
    textAlignVertical: 'top',
    backgroundColor: '#FAFAFA',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: 25
  },
  btnContainer: {
    gap: 12
  },
  button: {
    backgroundColor: '#E7E7E7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600'
  },
  deleteButton: {
    backgroundColor: '#FFEBEB'
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#B00000'
  },
  saveButton: {
    backgroundColor: '#FFD500',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 10
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center'
  }
});
