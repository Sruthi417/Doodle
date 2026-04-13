import "./notes.scss";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
//import { dummyNotes } from "../../data/dummytodo";
import { useEffect } from "react";
import useTodoStore from "../../store/useTodoStore";

const Todo = () => {

  const {todos,fetchTodo,deleteTodo,loading,toggleTodo}=useTodoStore();
  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="todos">
      {todos.map((todo) => (
        <div className="todo" key={todo._id}>
          <div className="headings">
            <div className="title">{todo.todo_title}</div>
            <div className="content">{todo.todo_content}</div>
            <div className="delete" onClick={()=>deleteTodo(todo.noteId, todo._id)}>
              <img src={cross} alt="delete" />
            </div>
          </div>

          {/* List */}
           <div className="list">
            <div className="todo-item">
              <div
                className={`circle ${todo.completed ? "done" : ""}`}
                onClick={() => toggleTodo(todo.noteId, todo._id)}
              >
                {todo.completed && (
                  <img src={tick} className="tick-icon" alt="tick" />
                )}
              </div>

              <span
                className={`remainder ${
                  todo.completed ? "completed" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;