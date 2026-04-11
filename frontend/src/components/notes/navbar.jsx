import "./notes.scss";
import write from "../../assets/write.png";
import SearchIcon from "../../assets/SearchIcon.png";

const Navbar = () => {
  const handleClick = () => {};
  return (
    <div className="navbar">
      <div className="nav">
        <span className="name">DOODLE</span>
        <button className="image">
          <img src={write} />
        </button>
      </div>

      <div className="search-container">
        <img src={SearchIcon} alt="search" className="search-icon" />
        <input
          type="text"
          placeholder="Search notes..."
          className="search-bar"
        />
      </div>
    </div>
  );
};

export default Navbar;
