import "./App.css";
import Welcome from "./pages/Welcome";
import Note from "./pages/Note";
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="layout">
      <div className="screen">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Note/>}/>
          </Routes>
      </div>
     </div>
  );
}

export default App;
