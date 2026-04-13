import { create } from "zustand";
import { getAllNotesAPI, deleteNoteAPI } from "../api/note";

const useNoteStore = create((set) => ({
  notes: [],
  loading: false,

  //fetch notes
  fetchNotes: async () => {
    try {
      set({ loading: true });
      const res = await getAllNotesAPI();
      set({ notes: res.data, loading: false });
    } catch (err) {
      console.log(err);
      set({ loading: false });
    }
  },

  deleteNote: async (id) => {
    try {
      await deleteNoteAPI(id);

     
      set((state) => ({
        notes: state.notes.filter((n) => n._id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useNoteStore
