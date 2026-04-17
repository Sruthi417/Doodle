import "./write.scss";
import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import {
  createNote,
  updateNote,
  getNoteById,
  addTodo as addTodoAPI,
  editTodo as editTodoAPI,
  deleteTodo as deleteTodoAPI,
  toggleTodo as toggleTodoAPI,
} from "../../api/write";
import { deleteNoteAPI } from "../../api/note";
import DOMPurify from "dompurify";
import tick from "../../assets/tick.png";
import cross from "../../assets/cross.png";

const Font = Quill.import("formats/font");

Font.whitelist = [
  "arial",
  "roboto",
  "poppins",
  "inter",
  "lato",
  "montserrat",
  "times-new-roman",
  "georgia",
  "monospace",
];

Quill.register(Font, true);

const Size = Quill.import("attributors/style/size");

Size.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
  "36px",
  "42px",
  "48px",
];

Quill.register(Size, true);

const modules = {
  toolbar: [
    [{ font: Font.whitelist }],
    [{ size: Size.whitelist }],

    ["bold", "italic", "underline", "strike"],

    [{ color: [] }, { background: [] }],

    [{ script: "sub" }, { script: "super" }],

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ list: "ordered" }, { list: "bullet" }],

    [{ align: [] }],

    ["link", "image"],

    ["clean"],
  ],
};
const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "list",
  "align",
  "link",
  "image",
];

const cleanContent = (html) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "h1",
      "h2",
      "h3",
      "a",
    ],
    ALLOWED_ATTR: ["href"],
  });
};

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const [noteId, setNoteId] = useState(id || null);

  // Todo state
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [todoForm, setTodoForm] = useState({
    todo_title: "",
    todo_content: "",
    text: "",
  });

  // Fetch note on mount
  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      const res = await getNoteById(id);

      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setNoteId(res.data._id);
      setTodos(res.data.todos || []);
    };

    fetchNote();
  }, [id]);

  // Autosave (unchanged logic)
  useEffect(() => {
    const delay = setTimeout(async () => {
      const isEmpty = !title.trim() && (!content || content === "<p><br></p>");

      try {
        if (isEmpty && noteId) {
          await deleteNoteAPI(noteId);
          setNoteId(null);

          window.history.replaceState(null, "", "/write");
          return;
        }

        if (isEmpty && !noteId) return;

        if (!noteId) {
          const res = await createNote({ title, content });

          setNoteId(res.data._id);

          window.history.replaceState(null, "", `/write/${res.data._id}`);
        } else {
          const cleaned = cleanContent(content);
          await updateNote(noteId, { title, content: cleaned });
        }
      } catch (err) {
        console.log(err);
      }
    }, 800);

    return () => clearTimeout(delay);
  }, [title, content]);

  // --- Todo handlers ---

  const openAddModal = () => {
    setEditingTodo(null);
    setTodoForm({ todo_title: "", todo_content: "", text: "" });
    setShowModal(true);
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setTodoForm({
      todo_title: todo.todo_title || "",
      todo_content: todo.todo_content || "",
      text: todo.text || "",
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTodo(null);
    setTodoForm({ todo_title: "", todo_content: "", text: "" });
  };

  const handleSaveTodo = async () => {
    if (!todoForm.todo_title.trim()) return;

    try {
      let currentNoteId = noteId;

      // If note doesn't exist yet, create it first
      if (!currentNoteId) {
        const res = await createNote({ title, content });
        currentNoteId = res.data._id;
        setNoteId(currentNoteId);
        window.history.replaceState(null, "", `/write/${currentNoteId}`);
      }

      if (editingTodo) {
        // Edit existing todo
        const res = await editTodoAPI(currentNoteId, editingTodo._id, {
          todo_title: todoForm.todo_title,
          todo_content: todoForm.todo_content,
          text: todoForm.text,
        });
        setTodos(res.data);
      } else {
        // Add new todo
        const res = await addTodoAPI(currentNoteId, {
          todo_title: todoForm.todo_title,
          todo_content: todoForm.todo_content,
          text: todoForm.text,
        });
        setTodos(res.data);
      }

      closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const res = await deleteTodoAPI(noteId, todoId);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggleTodo = async (todoId) => {
    try {
      const res = await toggleTodoAPI(noteId, todoId);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="writing">
      <div className="noting">
        <div className="head">
          <textarea
            className="titles"
            placeholder="Title"
            value={title}
            rows={1}
            onChange={(e) => {
              setTitle(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />
          <button className="to-add" onClick={openAddModal}>
            Add ToDo
          </button>
        </div>

        {/* Todo List */}
        {todos.length > 0 && (
          <div className="todo-section">
            {todos.map((todo) => (
              <div className="todo-card" key={todo._id}>
                <div className="todo-left">
                  <div
                    className={`todo-circle ${todo.completed ? "done" : ""}`}
                    onClick={() => handleToggleTodo(todo._id)}
                  >
                    {todo.completed && (
                      <img src={tick} className="tick-icon" alt="tick" />
                    )}
                  </div>
                  <div className="todo-info">
                    <span
                      className={`todo-title ${
                        todo.completed ? "completed" : ""
                      }`}
                    >
                      {todo.todo_title}
                    </span>
                    {todo.todo_content && (
                      <span
                        className={`todo-content ${
                          todo.completed ? "completed" : ""
                        }`}
                      >
                        {todo.todo_content}
                      </span>
                    )}
                  </div>
                </div>
                <div className="todo-actions">
                  <button
                    className="todo-edit-btn"
                    onClick={() => openEditModal(todo)}
                  >
                    Edit
                  </button>
                  <div
                    className="todo-delete"
                    onClick={() => handleDeleteTodo(todo._id)}
                  >
                    <img src={cross} alt="delete" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="contents">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Write your notes here..."
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="todo-modal-overlay" onClick={closeModal}>
          <div className="todo-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingTodo ? "Edit Todo" : "Add Todo"}</h3>
            <input
              type="text"
              placeholder="Todo title"
              value={todoForm.todo_title}
              onChange={(e) =>
                setTodoForm({ ...todoForm, todo_title: e.target.value })
              }
            />
            <textarea
              placeholder="Todo content (optional)"
              value={todoForm.todo_content}
              onChange={(e) =>
                setTodoForm({ ...todoForm, todo_content: e.target.value })
              }
              rows={3}
            />
            <input
              type="text"
              placeholder="Short label (e.g. Buy milk)"
              value={todoForm.text}
              onChange={(e) =>
                setTodoForm({ ...todoForm, text: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button className="modal-cancel" onClick={closeModal}>
                Cancel
              </button>
              <button className="modal-save" onClick={handleSaveTodo}>
                {editingTodo ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Write;
