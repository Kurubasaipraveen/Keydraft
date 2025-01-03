import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import RegisterPage from "./components/Register";
import "./App.css"; 

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/dash"element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
