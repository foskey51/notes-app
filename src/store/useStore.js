import { create } from 'zustand';
import { storage } from '../services/storage';

export const useStore = create((set, get) => ({
  currentUser: null,
  notes: [],
  isLoading: true,

  init: async () => {
    const user = await storage.getCurrentUser();
    if (user) {
      const notes = await storage.getNotes(user);
      set({ currentUser: user, notes, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  },

  login: async (username) => {
    const notes = await storage.getNotes(username);
    await storage.setCurrentUser(username);
    set({ currentUser: username, notes });
  },

  logout: async () => {
    await storage.clearCurrentUser();
    set({ currentUser: null, notes: [] });
  },

  setNotes: (notes) => set({ notes }),

  addNote: (note) => {
    const notes = [note, ...get().notes];
    set({ notes });
    storage.saveNotes(get().currentUser, notes);
  },

  updateNote: (id, updatedNote) => {
    const notes = get().notes.map(n => n.id === id ? { ...n, ...updatedNote, updatedAt: Date.now() } : n);
    set({ notes });
    storage.saveNotes(get().currentUser, notes);
  },

  deleteNote: (id) => {
    const notes = get().notes.filter(n => n.id !== id);
    set({ notes });
    storage.saveNotes(get().currentUser, notes);
  },
}));