import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
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
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8CF',
    justifyContent: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 40,
    color: '#B38700',
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5C200',
    backgroundColor: '#FFF3A6',
    padding: 12,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16
  },
  buttonWrapper: {
    marginTop: 10
  }
});
