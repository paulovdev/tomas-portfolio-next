"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeNav from "../../navs/home-nav";
import { urlFor } from "@/app/lib/sanityImage";

const textSlideAnim = {
  initial: { y: "19px" },
  animate: (i = 0) => ({
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
      delay: 0.1 + 0.025 * i,
    },
  }),
  exit: {
    y: "-100%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

const AnimatedLetters = ({ text }) => (
  <motion.span className="inline-block overflow-hidden whitespace-nowrap">
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        variants={textSlideAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={i}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </motion.span>
);

export default function HomePage({ media }) {
  const [index, setIndex] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % media.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [media]);

  if (!media.length) return null;

  const current = media[index];
  const isVideo = current.asset.mimeType?.startsWith("video/");

  const imageUrl = !isVideo
    ? urlFor(current.asset).width(1800).quality(90).auto("format").url()
    : null;

  return (
    <>
      <HomeNav />

      <div className="relative h-svh bg-[#F0EEE6] max-md:h-[calc(var(--vh)*100)] w-full overflow-hidden">
        <AnimatePresence>
          {isVideo ? (
            <motion.video
              key={current.asset._id}
              src={current.asset.url}
              className="absolute inset-0 w-full h-screen object-cover will-change-clip"
              autoPlay
              muted
              loop
              playsInline
              initial={{ clipPath: "inset(0% 100% 0% 0% )" }}
              animate={{
                clipPath: "inset(0% 0% 0% 0% )",
                transition: {
                  duration: 1,
                  type: "tween",
                  ease: [0.87, 0, 0.13, 1],
                },
              }}
              exit={{
                clipPath: "inset(0% 0% 0% 100% )",
                transition: {
                  duration: 1,
                  type: "tween",
                  ease: [0.87, 0, 0.13, 1],
                },
              }}
            />
          ) : (
            <motion.img
              key={current.asset._id}
              src={imageUrl}
              alt={current.alt || ""}
              className="absolute inset-0 w-full h-full object-cover will-change-clip"
              initial={{ clipPath: "inset(0% 100% 0% 0% )" }}
              animate={{
                clipPath: "inset(0% 0% 0% 0% )",
                transition: {
                  duration: 1,
                  type: "tween",
                  ease: [0.87, 0, 0.13, 1],
                },
              }}
              exit={{
                clipPath: "inset(0% 0% 0% 100% )",
                transition: {
                  duration: 1,
                  type: "tween",
                  ease: [0.87, 0, 0.13, 1],
                },
              }}
            />
          )}
        </AnimatePresence>

        {!loadingDone && (
          <motion.div
            className="absolute inset-0 flex flex-col justify-center items-center bg-[#F0EEE6] z-1000"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              delay: 2,
              duration: 1,
              type: "tween",
              ease: [0.87, 0, 0.13, 1],
            }}
            onAnimationComplete={() => setLoadingDone(true)}
          >
            <h1 className="text-[1em] font-medium text-p tracking-[-0.05em] select-none flex flex-wrap">
              <AnimatedLetters text="Tomás — Branding & Visual Identity Designer" />
            </h1>
          </motion.div>
        )}
      </div>
    </>
  );
}
