import { motion } from "framer-motion";
import { FaRobot } from "react-icons/fa";

export default function ChatFloatingButton({ onClick }) {
  return (
    <motion.div
      className="fixed bottom-28 right-8 z-50 cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={onClick}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-ping"></div>
        <div className="relative flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300">
          <FaRobot size={30} />
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </motion.div>
  );
}
