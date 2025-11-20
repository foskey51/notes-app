import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function SearchSortBar({ search, setSearch, sort, setSort }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search notes..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sort}
          onValueChange={(itemValue) => setSort(itemValue)}
          style={styles.picker}
          dropdownIconColor="#333"
        >
          <Picker.Item label="Last Updated (newest first)" value="updatedDesc" />
          <Picker.Item label="Last Updated (oldest first)" value="updatedAsc" />
          <Picker.Item label="Title A → Z" value="titleAsc" />
          <Picker.Item label="Title Z → A" value="titleDesc" />
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  searchInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 150 : 50,
  },
});