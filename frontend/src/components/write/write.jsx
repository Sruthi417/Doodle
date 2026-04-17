import "./write.scss";
import { useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { createNote, updateNote, getNoteById } from "../../api/write";
import { deleteNoteAPI } from "../../api/note";
import DOMPurify from "dompurify";

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

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      const res = await getNoteById(id);

      setTitle(res.data.title || "");
      setContent(res.data.content || "");
      setNoteId(res.data._id);
    };

    fetchNote();
  }, [id]);

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
          <button className="to-add">Add ToDo</button>
        </div>
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
    </div>
  );
};

export default Write;
