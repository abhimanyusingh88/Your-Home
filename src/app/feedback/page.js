"use client";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { createFeedback } from "../_lib/actions";
import toast from "react-hot-toast";
import SubmitButton from "../_components/submitButton";

export default function Page() {
  async function handleSubmit(formData) {
    try {
      await createFeedback(formData);
      toast.success("Thank you for giving your valuable feedback!");
      document.querySelector("form").reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again!");
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-16 px-6 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl backdrop-blur-md border-2 border-accent-900/30 rounded-3xl shadow-xl p-10"
      >
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-accent-400">
            Share Your Experience
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Tell us about your stay — what went well and where we can improve.
          </p>
        </header>

        {/* ✅ Using handleSubmit to run the server action manually */}
        <form action={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full name
              </label>
              <input
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-xl px-4 py-2 bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-accent-500 outline-none text-gray-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full rounded-xl px-4 py-2 bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-accent-500 outline-none text-gray-100 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      Room / Cabin
    </label>
    <input
      name="room"
      placeholder="A-302"
      className="w-full h-[42px] rounded-xl px-4 py-2 bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-accent-500 outline-none text-gray-100 transition"
    />
  </div>

  <div className="col-span-2">
    <label className="block text-sm font-medium text-gray-300 mb-1">
      Overall rating
    </label>
    <select
      name="rating"
      required
      className="w-full h-[42px] rounded-xl px-4 py-2 border border-gray-700 bg-gray-900/60 appearance-none focus:ring-2 focus:ring-accent-500 outline-none text-gray-300 font-sm transition"
      style={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <option value="" className="bg-gray-900 text-gray-100">Select rating</option>
      <option value="5" className="bg-gray-900 text-gray-100">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
      <option value="4" className="bg-gray-900 text-gray-100">⭐️⭐️⭐️⭐️ Very good</option>
      <option value="3" className="bg-gray-900 text-gray-100">⭐️⭐️⭐️ Good</option>
      <option value="2" className="bg-gray-900 text-gray-100">⭐️⭐️ Poor</option>
      <option value="1" className="bg-gray-900 text-gray-100">⭐️ Very poor</option>
    </select>
  </div>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Your feedback
            </label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell us about your stay, the service, the room, food, or anything else..."
              className="w-full rounded-2xl px-4 py-3 bg-gray-900/60 border border-gray-700 focus:ring-2 focus:ring-accent-500 outline-none text-gray-100 transition resize-none"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <SubmitButton>
            
              <FaPaperPlane />
              Submit Feedback
              </SubmitButton>
            

            <div className="text-sm text-red-400">
              **All fields are mandatory to fill
            </div>

            <button
              type="reset"
className="inline-flex items-center gap-3 border-2 border-red-400 bg-transparent hover:bg-red-400 hover:text-white text-red-400 font-semibold px-5 py-2 rounded-xl shadow-md transition"
            >
              Reset
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
