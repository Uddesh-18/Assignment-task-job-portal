import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css"; 

const AdminPortal = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({ title: "", description: "", location: "", salary: "", contact_email: "" });
  const [jobs, setJobs] = useState([]);

  // Check if the user is an admin, else redirect to login
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      alert("Unauthorized! Redirecting to login.");
      navigate("/login");
    }
  }, [navigate]);

  const addJob = async () => {
    if (!job.title || !job.description || !job.location || !job.salary || !job.contact_email) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/add-job", job);
      alert("Job Added Successfully");
      setJob({ title: "", description: "", location: "", salary: "", contact_email: "" });
      fetchJobs();
    } catch (error) {
      alert("Error adding job");
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/jobs");
      setJobs(res.data);
    } catch (error) {
      alert("Error fetching jobs");
    }
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <h2>Admin Portal</h2>
      <button onClick={logout} className="logout-button">Logout</button>

      <h3>Add Job</h3>
      <div className="job-form">
        <input
          type="text"
          placeholder="Title"
          value={job.title}
          onChange={(e) => setJob({ ...job, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={job.description}
          onChange={(e) => setJob({ ...job, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={job.location}
          onChange={(e) => setJob({ ...job, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={job.salary}
          onChange={(e) => setJob({ ...job, salary: e.target.value })}
        />
        <input
          type="email"
          placeholder="Contact Email"
          value={job.contact_email}
          onChange={(e) => setJob({ ...job, contact_email: e.target.value })}
        />
        <button onClick={addJob}>Add Job</button>
      </div>

      <h3>All Jobs</h3>
      <button onClick={fetchJobs} className="refresh-button">Refresh</button>
      <ul className="job-list">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job.id} className="job-item">
              {job.title} - {job.location}
            </li>
          ))
        ) : (
          <p>No jobs available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPortal;
