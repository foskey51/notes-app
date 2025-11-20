import React, { useEffect } from 'react';
import { useStore } from './src/store/useStore';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import NoteEditScreen from './src/screens/NoteEditScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NotesListScreen from './src/screens/NotesListScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { currentUser, init, isLoading } = useStore();

  useEffect(() => {
    init();
  }, []);

  if (isLoading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: true,  title: '🗒️ Notes', headerTitleAlign: 'center' }}>
      {currentUser ? (
        <>
          <Stack.Screen name="NotesList" component={NotesListScreen} />
          <Stack.Screen name="NoteEdit" component={NoteEditScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}