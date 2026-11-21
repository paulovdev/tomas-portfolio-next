"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { RevealText } from "@/components/ui/reveal-text";

const menuAnim = {
  initial: { clipPath: "inset(0% 0% 0% 100%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const overlayAnim = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.75,
    },
  },
};

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,}$/, "Please enter a valid name."),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().min(5, "Message must be at least 5 characters."),
});

const fieldClass =
  "w-full py-1 border-b border-black/25 text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none bg-transparent outline-none placeholder:text-black/50 max-md:text-[14px]";

const ContactModal = ({ setContactModal }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = contactSchema.safeParse(form);

    if (!parsed.success) {
      setStatus("error");
      setStatusMessage(
        parsed.error.issues[0]?.message || "Please check your fields.",
      );
      return;
    }

    setStatus("sending");
    setStatusMessage("Sending...");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          message: parsed.data.message,
        },
        "S_6_wsbrL9uhX5TIV",
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

  const submitLabel = status === "sending" ? "Sending..." : "Send";

  return (
    <div
      className="fixed w-full right-0 bottom-0 flex items-end justify-end z-50 pointer-events-none"
      style={{
        WebkitOverflowScrolling: "touch",
        touchAction: "pan-y",
      }}
    >
      <motion.div
        className="relative p-5 max-w-150 w-full bg-bege pointer-events-auto 
        max-md:max-w-full max-md:p-2.5 flex flex-col justify-between h-fit will-change-auto"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="mb-5 w-full flex items-center justify-between">
          <RevealText
            as="p"
            text="Let's talk"
            className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none
             max-md:text-[14px]"
            exit={false}
          />
          <button
            type="button"
            onClick={() => setContactModal(false)}
            className="cursor-pointer bg-transparent border-none p-0"
          >
            <RevealText
              as="span"
              text="Close"
              className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none
               max-md:text-[14px]"
              exit={false}
            />
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          variants={overlayAnim}
          initial="initial"
          animate="animate"
          className="relative flex flex-col items-start justify-between will-change-auto"
        >
          <div className="flex flex-col w-full gap-1">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={fieldClass}
            />

            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
              className={fieldClass}
            />

            <textarea
              id="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className={`${fieldClass} h-15 resize-none`}
            />
          </div>

          <div className="relative flex items-center justify-between w-full mt-5">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-transparent outline-none text-start cursor-pointer disabled:opacity-50"
            >
              <RevealText
                as="span"
                text={submitLabel}
                className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                exit={false}
              />
            </button>

            {status && (
              <RevealText
                as="p"
                key={statusMessage}
                text={statusMessage}
                className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none ${
                  status === "error" ? "text-red-500" : "text-black"
                } max-md:text-[14px]`}
                exit={false}
              />
            )}
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ContactModal;
