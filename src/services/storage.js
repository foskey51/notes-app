import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USERS: 'users',
  CURRENT_USER: 'current_user',
  NOTES_PREFIX: 'notes_',
};

export const storage = {
  async getUsers() {
    const data = await AsyncStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : {};
  },

  async saveUser(username, { password, notes = [] }) {
    const users = await this.getUsers();
    users[username] = { password, notes };
    await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
  },

  async getCurrentUser() {
    return await AsyncStorage.getItem(KEYS.CURRENT_USER);
  },

  async setCurrentUser(username) {
    await AsyncStorage.setItem(KEYS.CURRENT_USER, username);
  },

  async clearCurrentUser() {
    await AsyncStorage.removeItem(KEYS.CURRENT_USER);
  },

  async getNotes(username) {
    const users = await this.getUsers();
    return users[username]?.notes || [];
  },

  async saveNotes(username, notes) {
    const users = await this.getUsers();
    if (users[username]) {
      users[username].notes = notes;
      await AsyncStorage.setItem(KEYS.USERS, JSON.stringify(users));
    }
  },
};