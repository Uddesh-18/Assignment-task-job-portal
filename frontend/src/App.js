import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminPortal from "./components/AdminPanel";
import CandidatePortal from "./components/CandidatePortal";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login"; 

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role")); // Store role in localStorage

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />
        
        {/* Redirect based on role */}
        {role === "admin" && <Route path="/admin" element={<AdminPortal />} />}
        {role === "candidate" && <Route path="/candidate" element={<CandidatePortal />} />}
        
        <Route path="/chat" element={<Chatbot />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
