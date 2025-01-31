import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: "user", text: query };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setQuery("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/chat", { query });
      const botMessage = { sender: "bot", text: response.data.reply || "No response from bot." };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "⚠️ Error: Could not get a response. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "20px auto", textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h2>Job Chatbot</h2>
      <div 
        ref={chatContainerRef}
        style={{ 
          height: "350px", 
          overflowY: "auto", 
          border: "1px solid #ccc", 
          padding: "10px", 
          background: "#fafafa", 
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#888" }}>👋 Ask me anything about job opportunities!</p>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              style={{ 
                textAlign: msg.sender === "user" ? "right" : "left", 
                marginBottom: "8px" 
              }}
            >
              <div 
                style={{ 
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  background: msg.sender === "user" ? "#007bff" : "#eee",
                  color: msg.sender === "user" ? "#fff" : "#000",
                  maxWidth: "75%"
                }}
              >
                <b>{msg.sender === "user" ? "You" : "Bot"}:</b> {msg.text}
              </div>
            </div>
          ))
        )}
        {loading && <p style={{ color: "#007bff", textAlign: "center" }}>🤖 Thinking...</p>}
      </div>
      
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a message..."
          style={{ 
            flex: 1, 
            padding: "8px", 
            borderRadius: "5px", 
            border: "1px solid #ccc" 
          }}
        />
        <button 
          onClick={sendMessage} 
          disabled={loading} 
          style={{ 
            padding: "8px 12px", 
            background: "#007bff", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
