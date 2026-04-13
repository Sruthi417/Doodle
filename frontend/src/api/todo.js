import API from './axios';

/*noterouter.patch("/:noteId/todo/:todoId", verifyToken, toggleTodo);
noterouter.put("/:noteId/todo/:todoId", verifyToken, editTodo);
noterouter.delete("/:noteId/todo/:todoId", verifyToken, deleteTodo);
noterouter.get("/todos", verifyToken, getAllTodos); */

export const getAllTodos=()=>{
   return API.get("/notes/todos")
}

export const toggleTodoAPI=(noteId,todoId)=>{
    return API.patch(`/notes/${noteId}/todo/${todoId}`);
};

export const deleteTodoAPI=(noteId,todoId)=>{
    return API.delete(`/notes/${noteId}/todo/${todoId}`);
}

