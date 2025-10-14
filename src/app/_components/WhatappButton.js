"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const phone = "918876535557";
    const message = encodeURIComponent("Hello! I’d like to know more about your cabins.");
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank");
  };

  if (!show) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 cursor-pointer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={handleClick}
    >
      <div className="relative group">
        {/* Pulsing ring */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-50 animate-ping"></div>

        {/* WhatsApp icon button */}
        <div className="relative flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300">
          <FaWhatsapp size={34} />
        </div>

        {/* Red notification dot */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white"></div>
      </div>
    </motion.div>
  );
}
