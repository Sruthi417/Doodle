import "../components/notes/notes.scss";
import Navbar from "../components/notes/navbar";
import Todo from "../components/notes/Todos";
import Notelist from "../components/notes/notes";

const Note = () => {
  return (
    <div className="note-page">
      <Navbar />
      <Todo />
      <Notelist/>
      
    </div>
  );
};
export default Note;
