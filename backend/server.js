require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise"); 
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai/index.mjs");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is missing in .env file!");
  process.exit(1);
}

// MySQL Database Connection 
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "password",
  database: process.env.DB_NAME || "job_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Add New Job Listing (Admin)
app.post("/add-job", async (req, res) => {
  const { title, description, location, salary, contact_email } = req.body;
  
  if (!title || !description || !location || !contact_email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO jobs (title, description, location, salary, contact_email) VALUES (?, ?, ?, ?, ?)",
      [title, description, location, salary, contact_email]
    );
    res.json({ message: "Job added successfully!", jobId: result.insertId });
  } catch (err) {
    console.error("Error adding job:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get All Jobs
app.get("/jobs", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM jobs");
    res.json(result);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Apply for a Job (Candidate)
app.post("/apply-job", async (req, res) => {
  const { job_id, candidate_name, contact } = req.body;

  if (!job_id || !candidate_name || !contact) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db.query(
      "INSERT INTO applications (job_id, candidate_name, contact) VALUES (?, ?, ?)",
      [job_id, candidate_name, contact]
    );
    res.json({ message: "Application submitted successfully!" });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// ChatGPT Job Search
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query cannot be empty" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: query }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("ChatGPT API Error:", error);
    res.status(500).json({ error: "ChatGPT API error", details: error.message });
  }
});

// Start Server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
