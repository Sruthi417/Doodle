import API from "./axios";

export const getAllNotesAPI = () => {
  return API.get("/notes");
};

export const deleteNoteAPI = (id) => {
  return API.get(`/notes/$(id)`);
};

export const searchNotesAPI = (query) => {
  return API.get(`/notes/search?q=${encodeURIComponent(query)}`);
};
