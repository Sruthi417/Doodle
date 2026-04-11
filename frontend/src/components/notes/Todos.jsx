import "./notes.scss";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";
import { dummyNotes } from "../../data/dummytodo";

const Todo = () => {
  return (
    <div className="todos">
      {dummyNotes.map((note) => (
        <div className="todo" key={note._id}>
          <div className="headings">
            <div className="title">{note.title}</div>
            <div className="content">{note.content}</div>
            <div className="delete">
              <img src={cross} alt="delete" />
            </div>
          </div>

          {/* List */}
          <div className="list">
            {note.todos &&
              note.todos.map((todo) => (
                <div className="todo-item" key={todo._id}>
                  <div className={`circle ${todo.completed ? "done" : ""}`}>
                    {todo.completed && (
                      <img src={tick} className="tick-icon" alt="tick" />
                    )}
                  </div>
                  <span
                    className={`remainder ${todo.completed ? "completed" : ""}`}
                  >
                    {todo.text}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Todo;
