"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const modalAnim = {
  initial: {
    width: "0%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  animate: {
    width: "100%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    width: "0%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityAnim = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

export default function ContactModal({ setContactModal }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="w-full right-0 bottom-0 flex items-end justify-end"
      variants={modalAnim}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="relative p-4 max-w-[700px] w-full bg-[#F0EEE6] z-50"
        {...opacityAnim}
      >
        <div className="mb-12 flex justify-between">
          <p className="text-p text-[.9em] font-medium">Let's talk</p>
          <button
            onClick={() => setContactModal(false)}
            className="text-p text-[.9em] font-medium"
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            id="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border-b border-p/25 bg-transparent outline-none"
          />
          <input
            id="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className="border-b border-p/25 bg-transparent outline-none"
          />
          <textarea
            id="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className="border-b border-p/25 bg-transparent outline-none h-12"
          />

          <button type="submit" className="text-start text-p font-medium">
            Send
          </button>

          {status === "sending" && <p>Sending...</p>}
          {status === "success" && <p>Message sent!</p>}
          {status === "error" && (
            <p className="text-red-500">Error sending message.</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
}
