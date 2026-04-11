import "./notes.scss";
import { dummynote } from "../../data/dummynote";
import cross from "../../assets/cross.png";

const Notelist = () => {
  console.log(dummynote);
  return (
    <div className="notes-list">
      {dummynote.map((note) => (
        <div className="note-card" key={note._id}>
          <div className="delete">
            <img src={cross} alt="delete" />
          </div>
          <div className="card">
            <div className="Title">{note.Title}</div>
            <div className="Content">{note.Content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Notelist;
