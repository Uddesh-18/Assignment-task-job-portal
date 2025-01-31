# Job Portal Project

This repository contains the backend and frontend for the Job Portal project. Follow the instructions below to set up and run the project.

---

## 🚀 Setup Instructions

### 📌 Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the backend root directory and add the following environment variables:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=password
   DB_NAME=job_portal
   OPENAI_API_KEY=your_openai_api_key
   ```
  

4. Start the backend server:
   ```sh
   node server.js
   ```

The backend should now be running on `http://localhost:5000`.

---

### 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the frontend server:
   ```sh
   npm start
   ```

The frontend should now be running on `http://localhost:3000`.

---

🛠️ Additional Notes

Ensure that your database (db) is imported in mysql.

Use a tool like Postman  to test API endpoints.

Modify the .env file as needed to match your setup.



