import "./write.scss";

const Write = () => {
  return (
    <div className="writing">
      <div className="noting">
        <div className="head">
          <div
            className="titles"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></div>
          <button className="to-add">Add ToDo</button>
        </div>
        <div className="contents">Write your notes here...</div>
      </div>
    </div>
  );
};

export default Write