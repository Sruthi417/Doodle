import { create } from "zustand";
import { getAllNotesAPI, deleteNoteAPI, searchNotesAPI } from "../api/note";

const useNoteStore = create((set, get) => ({
  notes: [],
  loading: false,
  searchQuery: "",
  isSearching: false,
  _allNotes: [], // cached full list for restoring after search clears

  //fetch notes
  fetchNotes: async () => {
    try {
      set({ loading: true });
      const res = await getAllNotesAPI();
      set({ notes: res.data, _allNotes: res.data, loading: false });
    } catch (err) {
      console.log(err);
      set({ loading: false });
    }
  },

  // search notes (called with debounced query from navbar)
  setSearchQuery: (query) => {
    set({ searchQuery: query });

    if (!query.trim()) {
      // empty search → restore all notes
      const { _allNotes } = get();
      set({ notes: _allNotes, isSearching: false });
      return;
    }

    set({ isSearching: true });
  },

  performSearch: async (query) => {
    if (!query.trim()) return;

    try {
      const res = await searchNotesAPI(query);
      // only apply if query still matches current search
      if (get().searchQuery === query) {
        set({ notes: res.data, isSearching: false });
      }
    } catch (err) {
      console.log(err);
      set({ isSearching: false });
    }
  },

  deleteNote: async (id) => {
    try {
      await deleteNoteAPI(id);

      set((state) => ({
        notes: state.notes.filter((n) => n._id !== id),
        _allNotes: state._allNotes.filter((n) => n._id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useNoteStore;
