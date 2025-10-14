"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { knowledgeBase } from "./ChatCodeBase";

export default function AIChatButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "👋 Hello! I’m your AI concierge at *The Wilderness*. How can I help you today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const MAX_RESPONSES = 50;

  

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotReply = (text) => {
    const lower = text.toLowerCase();
    for (const key in knowledgeBase) {
      if (lower.includes(key)) return knowledgeBase[key];
    }
    return "🤖 I’m here to help with anything related to The Wilderness — cabins, dining, spa, bookings, and more!";
  };

  const handleSend = () => {
    if (!input.trim() || messages.length >= MAX_RESPONSES) return;

    const userText = input.trim();
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setInput("");

    if (messages.length + 2 >= MAX_RESPONSES) {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text:
            "💬 This conversation has reached its limit of 50 messages. Please start a new chat if you’d like to continue. 😊",
        },
      ]);
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      const reply = getBotReply(userText);
      setMessages((m) => [...m, { from: "bot", text: reply }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-28 right-8 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        onClick={() => setOpen(true)}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-ping"></div>
          <div className="relative flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300">
            <FaRobot size={30} />
          </div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
        </div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold">AI Concierge</h3>
              <button
                onClick={() => setOpen(false)}
                className="hover:text-gray-300 transition"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-80 bg-gray-50">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-2xl max-w-[80%] ${
                    m.from === "bot"
                      ? "bg-blue-100 text-gray-900 self-start"
                      : "bg-green-100 text-gray-900 self-end ml-auto"
                  }`}
                >
                  {m.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 rounded-2xl bg-blue-100 text-gray-700 w-fit"
                >
                  <span className="animate-pulse">The AI is typing...</span>
                </motion.div>
              )}
              <div ref={bottomRef}></div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm 
                           outline-none focus:border-blue-400 text-gray-900 placeholder-gray-500"
                placeholder={
                  messages.length >= MAX_RESPONSES
                    ? "Chat limit reached"
                    : "Ask me anything..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={messages.length >= MAX_RESPONSES}
              />
              <button
                onClick={handleSend}
                disabled={messages.length >= MAX_RESPONSES}
                className={`p-2 rounded-full transition-all ${
                  messages.length >= MAX_RESPONSES
                    ? "bg-gray-300"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
