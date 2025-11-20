import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { storage } from '../services/storage';
import { useStore } from '../store/useStore';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useStore();

  const handleLogin = async () => {
    if (!username || !password) return Alert.alert('Fill all fields');

    const users = await storage.getUsers();
    if (users[username]?.password === password) {
      await login(username);
      navigation.replace('NotesList');
    } else {
      Alert.alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Notes</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.secondaryButtonText}>Go to Signup</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 40,
    color: '#000',
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#F7F7F7',
    padding: 14,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16
  },
  buttonWrapper: {
    marginTop: 20,
    gap: 12
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '700'
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  secondaryButtonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '700'
  }
});
