"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const modalAnim = {
  initial: { x: "100%" },
  animate: {
    x: "0%",
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    x: "100%",
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

const opacityAnim = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

const WorkModal = ({ work, workModal, setWorkModal }) => {
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (workModal) {
      scrollPosRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.inset = "0px";
      document.body.style.top = `-${scrollPosRef.current}px`;
      document.body.style.width = "100%";

      return () => {
        const y = Math.abs(parseInt(document.body.style.top || "0"));
        document.body.style.position = "";
        document.body.style.inset = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo({ top: y });
      };
    }
  }, [workModal]);

  return (
    <>
      {workModal && (
        <>
          {/* Modal */}
          <motion.div
            className="
              fixed top-0 right-0 
              max-w-[50vw] max-lg:max-w-screen
              h-svh max-md:h-[calc(var(--vh)*100)]
              overflow-y-auto 
              bg-[#F0EEE6] 
              z-2000
            "
            variants={modalAnim}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              variants={opacityAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="size-full p-4 pt-4"
            >
              <nav className="mb-20 w-full flex items-center justify-between max-ssm:mb-10">
                {" "}
                <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem] font-semibold tracking-[-0.03em]">
                  {work.title}
                </p>
                <p
                  className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem] font-bold tracking-[-0.03em] cursor-pointer"
                  onClick={() => setWorkModal(false)}
                >
                  Close
                </p>
              </nav>

              <div className="mb-20 flex flex-col items-start">
                <p className="text-p/75 text-[1.5em] max-ssm:text-[1.2rem] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
                  {work.description}
                </p>
              </div>

              <div className="pb-10 flex items-end justify-end">
                <div className="w-full flex flex-col items-start justify-between">
                  <p className="mb-4 text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-bold tracking-[-0.03em]">
                    Information
                  </p>
                  <ul>
                    <li className="flex items-center gap-1">
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-bold tracking-[-0.03em]">
                        Year:
                      </p>
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-medium tracking-[-0.03em]">
                        {work.year}
                      </p>
                    </li>
                    <li className="flex items-center gap-1">
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-bold tracking-[-0.03em]">
                        Client:
                      </p>
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-medium tracking-[-0.03em]">
                        {work.client}
                      </p>
                    </li>
                    {work.website ? (
                      <li className="flex items-center gap-1">
                        <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-bold tracking-[-0.03em]">
                          Website:
                        </p>
                        <a
                          href={work.website}
                          target="_blank"
                          className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-medium tracking-[-0.03em] hover:underline"
                        >
                          {work.website}
                        </a>
                      </li>
                    ) : null}
                    <li className="flex flex-col items-start gap-0">
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-bold tracking-[-0.03em]">
                        Services:
                      </p>
                      <p className="text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem]  font-medium tracking-[-0.03em]">
                        {work.services}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Backdrop */}
          <motion.div
            className="
              fixed top-0 left-0 
              w-full
              h-svh max-md:h-[calc(var(--vh)*100)]
              bg-bg/15 backdrop-blur-lg 
              z-1999
            "
            variants={opacityAnim}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setWorkModal(false)}
          />
        </>
      )}
    </>
  );
};

export default WorkModal;
