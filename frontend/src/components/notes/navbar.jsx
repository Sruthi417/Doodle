import "./notes.scss";
import write from "../../assets/write.png";
import SearchIcon from "../../assets/SearchIcon.png";
import { getProfile, logout } from "../../api/profile";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useNoteStore from "../../store/useNoteStore";

const Navbar = () => {
  const [user, setUser] = useState(null); //for storing user data from database
  const [open, setOpen] = useState(false); // for opening and closing dropdown
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dropdownref = useRef(); //when clicked outside close dropdown
  const debounceRef = useRef(null);

  const { searchQuery, setSearchQuery, performSearch } = useNoteStore();

  // Debounced search — fires 400ms after user stops typing
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchQuery(value);

      // Clear previous timeout
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.trim()) {
        debounceRef.current = setTimeout(() => {
          performSearch(value);
        }, 400);
      }
    },
    [setSearchQuery, performSearch]
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

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
    await logout();
    window.location.href = "/";
  };

  if (loading) return (
    <div className="navbar" style={{ justifyContent: 'center' }}>
      <div className="loading-spinner">Loading Profile...</div>
    </div>
  );

  if (error && !user) {
    return (
      <div className="navbar" style={{ justifyContent: 'space-between', padding: '0 20px' }}>
        <span className="name">DOODLE</span>
        <button className="logout" onClick={() => window.location.href = "/"}>Back to Login</button>
      </div>
    );
  }

  return (
    <div className="navbar">
      <div className="nav">
        <span className="name">DOODLE</span>
        <div className="right-section">
          <button className="image" onClick={() => navigate("/write")}>
            <img src={write} />
          </button>

          {user && (
            <div className="profile">
              <div className="avatar">
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
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
