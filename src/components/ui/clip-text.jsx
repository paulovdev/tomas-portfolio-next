import { motion } from "framer-motion";

const wordReveal = {
  initial: {
    y: "100%",
  },
  animate: (custom) => ({
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
  exit: (custom) => ({
    y: "100%",
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
      delay: custom,
    },
  }),
};

export const ClipText = ({
  text,
  as: Tag = "span", 
  className,
  delay = 0,
  animate,
  children,
  indent = 0,
  exit = "exit",
}) => {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-[0.2em]"
          style={index === 0 ? { marginLeft: indent } : undefined}
        >
          <motion.span
            variants={wordReveal}
            initial="initial"
            animate={animate}
            exit={exit}
            custom={delay + index * 0.025}
            className="inline-block will-change-transform px-[0.05em] py-[0.1em]"
          >
            {word} {children}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
