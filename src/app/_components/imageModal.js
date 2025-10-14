"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ImageModal({ open, onClose, src, alt }) {
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          onClick={onClose}
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Moving background gradient (neutral tones) */}
          <motion.div
            className="absolute inset-0 z-0 opacity-40"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              backgroundSize: ["200% 200%", "200% 200%", "200% 200%"],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(30,30,30,0.9), rgba(10,10,10,0.9))",
            }}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-[90%] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, rotateX: 15 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.85, opacity: 0, rotateX: -10 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 0.8,
            }}
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <Image
                src={src}
                width={1200}
                height={800}
                alt={alt}
                className="rounded-lg shadow-2xl object-contain"
              />
            </motion.div>

            <motion.button
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
