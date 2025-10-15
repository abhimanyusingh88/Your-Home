import { FaTimes } from "react-icons/fa";

export default function ChatHeader({ onClose }) {
  return (
    <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h3 className="text-lg font-semibold">AI Concierge</h3>
      <button onClick={onClose} className="hover:text-gray-300 transition">
        <FaTimes />
      </button>
    </div>
  );
}
