import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  toggleFavourite,
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
} from "./note.controller.js";

const noterouter = express.Router();


// Notes
noterouter.post("/", createNote);
noterouter.get("/", getNotes);
noterouter.put("/:id", updateNote);
noterouter.delete("/:id", deleteNote);
noterouter.patch("/:id/favourite", toggleFavourite);


// Todos
noterouter.post("/:id/todo", addTodo);
noterouter.patch("/:noteId/todo/:todoId", toggleTodo);
noterouter.put("/:noteId/todo/:todoId", editTodo);
noterouter.delete("/:noteId/todo/:todoId", deleteTodo);

export default noterouter;