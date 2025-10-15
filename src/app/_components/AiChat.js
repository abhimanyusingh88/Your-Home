"use client";
import { useState, useEffect, useRef } from "react";
import ChatFloatingButton from "./ChatFloatingButton";
import ChatWindow from "./ChatWindow";
import { getBotReply } from "./getBotReply";

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
      <ChatFloatingButton onClick={() => setOpen(true)} />
      <ChatWindow
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
        isTyping={isTyping}
        input={input}
        setInput={setInput}
        onSend={handleSend}
        bottomRef={bottomRef}
        maxReached={messages.length >= MAX_RESPONSES}
      />
    </>
  );
}
