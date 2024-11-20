"use client";
import { useState, useEffect, useRef } from "react";
import { handleGenerateText } from "./action";

export default function Home() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", content: "Gemini AI response will appear here!" },
  ]);

  // Ref for the chat container to scroll to the bottom
  const chatContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input) {
      const userMessage = { role: "user", content: input };
      const generatedText = await handleGenerateText(input);
      const aiMessage = {
        role: "ai",
        content: generatedText || "Error: Could not fetch response from Gemini AI.",
      };

      setChatHistory((prevHistory) => [...prevHistory, userMessage, aiMessage]);
      setInput("");
    } else {
      alert("Please enter some text.");
    }
  };

  // Automatic scrolling when chat history updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="layout-container">
      <main className="flex flex-col h-screen justify-between">
        {/* Chat history display */}
        <div ref={chatContainerRef} className="chat-container overflow-y-auto flex-1">
          {chatHistory.map((message, index) => (
            <div key={index} className={`chat-bubble ${message.role}`}>
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="input-form">
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here"
            className="textarea"
          />
          <button type="submit" className="submit-btn" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
