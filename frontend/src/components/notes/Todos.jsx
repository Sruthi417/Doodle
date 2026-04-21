import "./notes.scss";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import { useEffect } from "react";
import useTodoStore from "../../store/useTodoStore";

// Group flat todos by noteId + todo_title + todo_content
const groupTodos = (todos) => {
  if (!Array.isArray(todos)) return [];
  const groups = [];
  const map = new Map();

  todos.forEach((todo) => {
    const key = `${todo.noteId}|||${todo.todo_title}|||${todo.todo_content || ""}`;
    if (!map.has(key)) {
      const group = {
        key,
        noteId: todo.noteId,
        todo_title: todo.todo_title,
        todo_content: todo.todo_content,
        items: [],
      };
      map.set(key, group);
      groups.push(group);
    }
    map.get(key).items.push(todo);
  });

  return groups;
};

const Todo = () => {
  const { todos, fetchTodo, deleteTodo, loading, toggleTodo } = useTodoStore();

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  if (loading) return <p>Loading...</p>;

  const grouped = groupTodos(todos);

  return (
    <div className="todos">
      {grouped.map((group) => (
        <div className="todo" key={group.key}>
          <div className="headings">
            <div className="title">{group.todo_title}</div>
            <div className="content">{group.todo_content}</div>
          </div>

          {/* List of items under this group */}
          <div className="list">
            {group.items.map((todo) => (
              <div className="todo-item" key={todo._id}>
                <div
                  className={`circle ${todo.completed ? "done" : ""}`}
                  onClick={() => toggleTodo(todo.noteId, todo._id)}
                >
                  {todo.completed && (
                    <img src={tick} className="tick-icon" alt="tick" style={{ pointerEvents: "none" }} />
                  )}
                </div>

                <span
                  className={`remainder ${todo.completed ? "completed" : ""}`}
                  onClick={() => toggleTodo(todo.noteId, todo._id)}
                  style={{ cursor: "pointer" }}
                >
                  {todo.text}
                </span>

                <div
                  className="item-delete"
                  onClick={() => deleteTodo(todo.noteId, todo._id)}
                >
                  <img src={cross} alt="delete" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;