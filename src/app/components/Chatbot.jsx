"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiX } from "react-icons/fi";
import { BsRobot, BsPerson } from "react-icons/bs";

const API_URL = "http://localhost:5000/api/message"; // <-- backend
const LLM_URL = "https://h4b-chatbot-backend.onrender.com/chat";

export default function ChatWidget() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", type: "text", text: "Namaste!\nWelcome to Jharkhand Tourism." },
    { from: "bot", type: "text", text: "Hello, I can help you explore destinations, plan trips and more. What are you looking for?" },
    {
      from: "bot",
      type: "buttons",
      text: "Choose an option",
      buttons: [
        { title: "Explore by Cities", payload: "EXPLORE_CITIES" },
        { title: "Plan your Trip", payload: "PLAN_TRIP" }
        
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const pushMessage = (m) => setMessages((prev) => [...prev, m]);

  async function sendToServer(text, payload = null) {
    pushMessage({ from: "user", type: "text", text });
    setIsTyping(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, payload })
      });
      const json = await res.json();
      if (json && Array.isArray(json.messages)) {
        json.messages.forEach((m) => pushMessage({ from: "bot", ...m }));
      } else {
        pushMessage({ from: "bot", type: "text", text: "Sorry, something went wrong." });
      }
    } catch (err) {
      console.error(err);
      pushMessage({ from: "bot", type: "text", text: "Connection error. Try again." });
    } finally {
      setIsTyping(false);
    }
  }

  async function sendToLLM(text) {
    const userMessage = { from: "user", type: "text", text };
    pushMessage(userMessage);
    setIsTyping(true);

    try {
      const res = await fetch(LLM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, chat_history: [] })
      });

      const contentType = res.headers.get("content-type") || "";
      let json;
      if (contentType.includes("application/json")) {
        json = await res.json();
      } else {
        json = await res.text();
      }
      console.log("LLM Backend Response:", json);

      if (json && Array.isArray(json.messages)) {
        json.messages.forEach((m) => pushMessage({ from: "bot", ...m }));
      } else if (json && typeof json.response === "string") {
        pushMessage({ from: "bot", type: "text", text: json.response });
      } else if (typeof json === "string") {
        pushMessage({ from: "bot", type: "text", text: json });
      } else {
        console.error("Unknown response shape from LLM backend:", json);
        pushMessage({ from: "bot", type: "text", text: "Sorry, something went wrong." });
      }
    } catch (err) {
      console.error("Network / fetch error to LLM backend:", err);
      pushMessage({ from: "bot", type: "text", text: "⚠ Error: Could not reach backend." });
    } finally {
      setIsTyping(false);
      setInput("");
    }
  }

  const onQuickReply = (btn) => sendToServer(btn.title, btn.payload);

  const onSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendToLLM(input.trim());
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform text-3xl hover:cursor-pointer"
      >
        💬
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 h-[520px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 font-semibold flex justify-between items-center">
              <span className="flex items-center gap-2">
                <BsRobot className="text-xl" /> Jharkhand Tourism
              </span>
              <button onClick={() => setShowChat(false)}>
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: m.from === "user" ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-end gap-2 ${
                    m.from === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {m.from === "bot" && <BsRobot className="text-green-600 text-lg shrink-0" />}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm shadow max-w-[70%] ${
                      m.from === "user"
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {m.type === "text" && (
                      <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\n/g, "<br/>") }} />
                    )}

                    {m.type === "link" && (
                      <div>
                        <span className="font-bold mr-1">LINK:</span>
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {m.text}
                        </a>
                      </div>
                    )}

                    {m.type === "buttons" && m.buttons && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.buttons.map((b, bi) => (
                          <button
                            key={bi}
                            className="bg-green-500 text-white px-3 py-1 rounded-xl text-xs shadow hover:scale-105 transition-transform"
                            onClick={() => onQuickReply(b)}
                          >
                            {b.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {m.from === "user" && <BsPerson className="text-gray-500 text-lg shrink-0" />}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <BsRobot className="text-green-600" />
                  <span className="animate-pulse">Typing...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={onSend} className="p-3 border-t border-gray-200 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow hover:scale-105 transition-transform flex items-center gap-1 hover:cursor-pointer"
              >
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
