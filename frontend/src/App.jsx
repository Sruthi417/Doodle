import "./App.css";
import Welcome from "./pages/Welcome";
import Note from "./pages/Note";
import Write_Note from "./pages/Write_Note"
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="layout">
      <div className="screen">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Note/>}/>
          <Route path="/write" element={<Write_Note/>}/>
          </Routes>
      </div>
     </div>
  );
}

export default App;
