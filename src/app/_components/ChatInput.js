import { FaPaperPlane } from "react-icons/fa";

export default function ChatInput({ input, setInput, onSend, disabled }) {
  return (
    <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
      <input
        type="text"
        className="flex-1 border border-gray-300 rounded-full px-3 py-2 text-sm 
                   outline-none focus:border-blue-400 text-gray-900 placeholder-gray-500"
        placeholder={disabled ? "Chat limit reached" : "Ask me anything..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        disabled={disabled}
      />
      <button
        onClick={onSend}
        disabled={disabled}
        className={`p-2 rounded-full transition-all ${
          disabled ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        <FaPaperPlane size={14} />
      </button>
    </div>
  );
}
