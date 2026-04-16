import API from "./axios";

// NOTE
export const createNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const getNoteById = (id) => API.get(`/notes/${id}`);

// TODO
export const addTodo = (noteId, data) =>
  API.post(`/notes/${noteId}/todo`, data);

export const toggleTodo = (noteId, todoId) =>
  API.patch(`/notes/${noteId}/todo/${todoId}`);

export const deleteTodo = (noteId, todoId) =>
  API.delete(`/notes/${noteId}/todo/${todoId}`);

export const editTodo = (noteId, todoId, data) =>
  API.put(`/notes/${noteId}/todo/${todoId}`, data);