import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

const Login = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role); 
    localStorage.setItem("role", role); // Save role in localStorage
    navigate(role === "admin" ? "/admin" : "/candidate"); 
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="button-container">
        <button className="login-button" onClick={() => handleLogin("admin")}>Login as Admin</button>
        <button className="login-button" onClick={() => handleLogin("candidate")}>Login as Candidate</button>
      </div>
    </div>
  );
};

export default Login;
