import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Chatbot from "./Chatbot"; 

const CandidatePortal = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [application, setApplication] = useState({ job_id: "", candidate_name: "", contact: "" });
  const [isNotCandidate, setIsNotCandidate] = useState(false);
  const [chatVisible, setChatVisible] = useState(false); 

  // Check role on component mount
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "candidate") {
      setIsNotCandidate(true);
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/jobs");
        setJobs(res.data);
      } catch (err) {
        alert("Failed to fetch jobs. Please try again later.");
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!application.job_id || !application.candidate_name || !application.contact) {
      alert("Please fill in all details!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/apply-job", application);
      alert("Application Submitted!");
      setApplication({ job_id: "", candidate_name: "", contact: "" });
    } catch (err) {
      alert("Error submitting application. Please try again.");
    }
  };

  const filteredJobs = jobs.filter(
    (job) => job.location.toLowerCase().includes(search.toLowerCase()) || job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  if (isNotCandidate) {
    return <Navigate to="/" />;
  }

  return (
    <div className="portal-container">
      <h2 className="portal-title">Candidate Portal</h2>
      <button className="logout-button" onClick={handleLogout}>Logout</button>

      {/* Chatbot Toggle Button */}
      <button 
        onClick={() => setChatVisible(!chatVisible)} 
        className="chatbot-toggle-button"
      >
        {chatVisible ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {/* Conditionally Render the Chatbot */}
      {chatVisible && <Chatbot />}

      <br />

      <input
        type="text"
        className="search-input"
        placeholder="Search by job title or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <li className="job-item" key={job.id}>
              {job.title} - {job.location}
            </li>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </ul>

      <h3>Apply for a Job</h3>
      <form className="form-container" onSubmit={handleApply}>
        <select
          className="form-input"
          value={application.job_id}
          onChange={(e) => setApplication({ ...application, job_id: e.target.value })}
        >
          <option value="">Select a Job</option>
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title} - {job.location}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-input"
          placeholder="Your Name"
          value={application.candidate_name}
          onChange={(e) => setApplication({ ...application, candidate_name: e.target.value })}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Contact"
          value={application.contact}
          onChange={(e) => setApplication({ ...application, contact: e.target.value })}
        />
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CandidatePortal;
