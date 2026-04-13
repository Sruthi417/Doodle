import "./notes.scss";
import write from "../../assets/write.png";
import SearchIcon from "../../assets/SearchIcon.png";
import { getProfile, logout, updateProfile } from "../../api/profile";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null); //for storing user data from database
  const [open, setOpen] = useState(false); // for opening and closing dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownref = useRef(); //when clicked outside close dropdown
  const fileInputRef = useRef();

  //fetch user
  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await getProfile();

        if (isMounted) setUser(res.data);
      } catch (err) {
        if (isMounted) {
          setError("Failed to load user");

          if (err.response?.status === 401) {
            window.location.href = "/";
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  //  Close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownref.current && !dropdownref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //logout

  const handleLogout = async () => {
    await logoutUser();
    window.location.href = "/";
  };

  // Open file picker
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  //  Upload image
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await updateProfile(formData);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="navbar">Loading...</div>;
  

  return (
    <div className="navbar">
      <div className="nav">
        <span className="name">DOODLE</span>
        <div className="right-section">
          <button className="image">
            <img src={write} />
          </button>

          {user && (
            <div className="profile">
              <div className="avatar" onClick={handleAvatarClick}>
                {user.profileImage?.url ? (
                  <img src={user.profileImage.url} alt="profile" />
                ) : (
                  user.name?.charAt(0).toUpperCase()
                )}
              </div>

              <span className="username" onClick={() => setOpen(!open)}>
                {user.name}
              </span>

              {open && (
                <div className="dropdown" ref={dropdownref}>
                  <div className="user-info">
                    <p className="name">{user.name}</p>
                    <p className="email">{user.email}</p>
                  </div>

                  <hr />

                  <button className="logout" onClick={handleLogout}>
                    Sign Out
                  </button>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept="image/*"
              />
            </div>
          )}
        </div>
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
