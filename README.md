
# **Job Portal Project**  

This project is a **Job Listing and Application Portal** that allows **candidates** to browse and apply for jobs, while **admins** can manage job postings. It also includes an **AI-powered chatbot** for job-related queries.  

## **🚀 Features**  

### **👨‍💼 Candidate Portal**  
- View job listings with **search and filter** options.  
- Apply for jobs by submitting **name and contact details**.  
- Use the **AI-powered chatbot** to get job-related guidance.  

### **🔧 Admin Portal**  
- Add, edit, and manage job listings.  
- View applications submitted by candidates.  

### **🤖 AI Chatbot**  
- Provides **job search assistance** and answers job-related queries.  
- Uses **OpenAI's ChatGPT API** for intelligent responses.  

---

## **📌 Backend Setup**  

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

The backend should now be running on **`http://localhost:5000`**.  

---

## **🎨 Frontend Setup**  

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

The frontend should now be running on **`http://localhost:3000`**.  

---

## **🛠️ Additional Notes**  

- **Database Setup:** Ensure your MySQL database (`job_portal`) is properly configured and imported.  
- **Testing API Endpoints:** Use **Postman** or any API testing tool to verify backend endpoints.
- Modify the .env file as needed to match your setup. 

---

