"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const modalAnim = {
  initial: {
    x: "100%",
  },
  animate: {
    x: "0%",
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messageRegex = /^.{5,}$/;

const ContactModal = ({ setContactModal }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameRegex.test(form.name)) {
      setStatus("error");
      setStatusMessage("Please enter a valid name.");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setStatus("error");
      setStatusMessage("Please enter a valid email.");
      return;
    }

    if (!messageRegex.test(form.message)) {
      setStatus("error");
      setStatusMessage("Message must be at least 5 characters.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending...");

    try {
      await emailjs.send(
        "service_n2crrfz",
        "template_j26tpv4",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "S_6_wsbrL9uhX5TIV"
      );

      setStatus("success");
      setStatusMessage("Message sent!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setStatusMessage("Error sending message.");
    }
  };

  return (
    <motion.div
      className="w-full right-0 bottom-0 flex items-end justify-end"
      {...modalAnim}
    >
      <motion.div
        className="relative p-4 max-w-[700px] w-full bg-[#F0EEE6] z-50 max-md:max-w-full"
        {...opacityAnim}
      >
        <div className="mb-12 w-full flex items-center justify-between">
          <p className="text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em]">
            Let's talk
          </p>
          <button
            onClick={() => setContactModal(false)}
            className="text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em]"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative h-[160px] flex flex-col items-start justify-between gap-2"
        >
          <div className="flex flex-col w-full h-full">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="mb-4 w-full border-b border-p/25 text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />

            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className="mb-4 w-full border-b border-p/25 text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />

            <textarea
              id="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="w-full h-[50px] border-b border-p/25 text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em] bg-transparent outline-none placeholder:text-p"
            />
          </div>

          <div className="mb-8 relative flex flex-col items-end justify-end">
            <button
              type="submit"
              className="mb-2 w-full text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em] bg-transparent outline-none text-start"
            >
              Send
            </button>

            {status && (
              <motion.p
                key={statusMessage}
                className={`text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.03em] ${
                  status === "error" ? "text-red-500" : "text-p"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {statusMessage}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
