import Note from "./note.model.js";

// Create Note
export const createNote = async (req, res) => {
  try {
    const note = await Note.create({
      user: req.user.id,
      // from auth middleware later
      //user: "660000000000000000000000",
      title: req.body.title,
      content: req.body.content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
      //user:"660000000000000000000000"
    }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle Favourite
export const toggleFavourite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    note.isFavourite = !note.isFavourite;
    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Todo
export const addTodo = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.todos.push({
      text: req.body.text,
    });

    await note.save();

    res.json(note.todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle Todo
export const toggleTodo = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const todo = note.todos.id(req.params.todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;

    await note.save();

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Todo
export const editTodo = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    const todo = note.todos.id(req.params.todoId);
    todo.text = req.body.text;

    await note.save();

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.todos.pull(req.params.todoId);

    await note.save();

    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllTodos = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });

    let todos = [];

    notes.forEach(note => {
      note.todos.forEach(todo => {
        todos.push({
          _id: todo._id,
          text: todo.text,
          completed: todo.completed,
          noteId: note._id,
          noteTitle: note.title,
        });
      });
    });

    // Optional: show incomplete todos first
    todos.sort((a, b) => a.completed - b.completed);

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};