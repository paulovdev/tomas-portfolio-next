"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RevealText } from "../ui/reveal-text";

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
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const WorkModal = ({ work, setWorkModal }) => {
  const animatedUnderline =
    "relative inline-flex w-fit after:content-[''] after:absolute after:left-0 after:bottom-[4px] max-md:after:bottom-[5px] after:w-full after:h-[2px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)]";

  useEffect(() => {
    if (!work) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [work]);

  if (!work) return null;

  return (
    <>
      <motion.div
        data-lenis-prevent
        className="fixed right-0 top-0 p-5 w-full max-w-175 h-full bg-bege backdrop-blur-2xl z-9999 
        overflow-y-auto overflow-x-hidden overscroll-contain max-lg:w-screen will-change-auto max-lg:p-2.5 max-lg:top-0 max-lg:right-0"
        variants={menuAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        <div className="size-full">
          <nav className="mb-20 w-full flex items-center justify-between max-ssm:mb-10">
            <RevealText
              as="h2"
              text={work.title}
              className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
              exit={false}
            />

            <button
              type="button"
              className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] cursor-pointer bg-transparent border-none p-0"
              onClick={() => setWorkModal(false)}
            >
              Close
            </button>
          </nav>

          <div className="mb-20 flex flex-col items-start">
            <RevealText
              as="p"
              text={work.description}
              className="text-[24px] text-black font-medium font-instrument tracking-[-5%] leading-[80%]"
              exit={false}
            />
          </div>

          <div className="pb-10 flex items-end justify-end">
            <div className="w-full flex flex-col items-start justify-between">
              <RevealText
                as="h3"
                text="Information"
                className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                exit={false}
              />
              <ul className="flex flex-col mt-2">
                <li className="flex items-center">
                  <RevealText
                    as="span"
                    text="Year:"
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                  <RevealText
                    as="span"
                    text={work.year}
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                </li>

                <li className="flex items-center">
                  <RevealText
                    as="span"
                    text="Client:"
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                  <RevealText
                    as="span"
                    text={work.client}
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                </li>

                {work.website ? (
                  <li className="flex items-center">
                    <RevealText
                      as="span"
                      text="Website:"
                      className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                      exit={false}
                    />
                    <a
                      href={work.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={animatedUnderline}
                    >
                      <RevealText
                        as="span"
                        text={work.website}
                        className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                        exit={false}
                      />
                    </a>
                  </li>
                ) : null}

                <li className="flex max-ssm:flex-col items-center max-ssm:items-start max-ssm:gap-0 gap-2">
                  <RevealText
                    as="span"
                    text="Services:"
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                  <RevealText
                    as="span"
                    text={work.services}
                    className="text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
                    exit={false}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-lg z-900 cursor-not-allowed"
        variants={overlayAnim}
        initial="initial"
        animate="animate"
        exit="exit"
        onClick={() => setWorkModal(false)}
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
      />
    </>
  );
};

export default WorkModal;
