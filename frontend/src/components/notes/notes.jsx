import "./notes.scss";
//import { dummynote } from "../../data/dummynote";
import cross from "../../assets/cross.png";
import { useEffect } from "react";
import useNoteStore from "../../store/useNoteStore";
import { useNavigate } from "react-router-dom";
import emptynote from "../../assets/emptynote.png"

const Notelist = () => {
  const { notes, loading, fetchNotes, deleteNote, searchQuery, isSearching } =
    useNoteStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Show "No items matched" when actively searching and no results
  if (searchQuery.trim() && !isSearching && notes.length === 0) {
    return (
      <div className="notes-list">
        <p
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            color: "#999",
            fontSize: "16px",
            marginTop: "40px",
          }}
        >
          No items matched
        </p>
      </div>
    );
  }

  //empty state
  if (!searchQuery.trim() && (!notes || notes.length === 0)) {
    return (
      <div className="empty-notes">
        <img src={emptynote} alt="create" className="empty-icon" />

        <p>No notes yet</p>

        <button onClick={() => navigate("/write")}>
          Create your first note
        </button>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          className="note-card"
          key={note._id}
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
