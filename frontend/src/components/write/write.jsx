import "./write.scss";
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

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
  "bullet",
  "align",
  "link",
  "image",
];

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
