import "./styles.css";
import { NavLink, Routes, Route } from "react-router-dom";

import Inbox from "./components/Inbox";
import Spam from "./components/Spam";
import View from "./components/View";
import Trash from "./components/Trash";

export default function App() {
  const activeStyle = ({ isActive }) => ({
    color: isActive ? "black" : "grey",
    borderRight: isActive ? "5px solid rgb(48, 25, 52)" : ""
  });
  return (
    <div className="App">
      <nav>
        <NavLink style={activeStyle} to="/" className="navbar_link">
          <span></span>
          Inbox
        </NavLink>
        <p>
          {" "}
          <NavLink style={activeStyle} to="/spam" className="navbar_link">
            <span></span> Spam
          </NavLink>
        </p>
        <p>
          <NavLink style={activeStyle} to="/trash" className="navbar_link">
            Trash
          </NavLink>
        </p>
      </nav>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/spam" element={<Spam />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/view/:mailId" element={<View />} />
      </Routes>
    </div>
  );
}
