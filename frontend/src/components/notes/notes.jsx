import "./notes.scss";
//import { dummynote } from "../../data/dummynote";
import cross from "../../assets/cross.png";
import { useEffect } from "react";
import useNoteStore from "../../store/useNoteStore";
import { useNavigate } from "react-router-dom";

const Notelist = () => {
  const { notes, loading, fetchNotes, deleteNote } = useNoteStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div className="note-card" key={note._id}
        onClick={() => navigate(`/write/${note._id}`)}
        >
          <div
            className="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteNote(note._id);
            }}
          >
            <img src={cross} alt="delete" />
          </div>
          <div className="card">
            <div className="Title">{note.title}</div>
            <div className="Content">{note.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Notelist;
