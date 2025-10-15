import { motion } from "framer-motion";

export default function ChatMessages({ messages, isTyping, bottomRef }) {
  return (
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
  );
}
