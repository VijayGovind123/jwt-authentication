import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Errorpage from "./components/Errorpage";
import Protected from "./components/Protected";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/protected" element={<Protected />} />
        <Route path="/404" element={<Errorpage />} />

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}
export default App;
