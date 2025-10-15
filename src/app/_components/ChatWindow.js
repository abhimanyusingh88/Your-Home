import { motion, AnimatePresence } from "framer-motion";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  open,
  onClose,
  messages,
  isTyping,
  input,
  setInput,
  onSend,
  bottomRef,
  maxReached,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
        >
          <ChatHeader onClose={onClose} />
          <ChatMessages messages={messages} isTyping={isTyping} bottomRef={bottomRef} />
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={onSend}
            disabled={maxReached}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
