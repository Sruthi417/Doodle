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
  getAllTodos,
  getNoteById,
} from "./note.controller.js";
import { verifyToken } from "../../middleware/auth.middleware.js";

const noterouter = express.Router();

// Notes
noterouter.post("/", verifyToken, createNote);
noterouter.get("/", verifyToken, getNotes);
noterouter.get("/:id", verifyToken, getNoteById);
noterouter.put("/:id", verifyToken, updateNote);
noterouter.delete("/:id", verifyToken, deleteNote);
noterouter.patch("/:id/favourite", verifyToken, toggleFavourite);

// Todos
noterouter.post("/:id/todo", verifyToken, addTodo);
noterouter.patch("/:noteId/todo/:todoId", verifyToken, toggleTodo);
noterouter.put("/:noteId/todo/:todoId", verifyToken, editTodo);
noterouter.delete("/:noteId/todo/:todoId", verifyToken, deleteTodo);
noterouter.get("/todos", verifyToken, getAllTodos);

export default noterouter;
