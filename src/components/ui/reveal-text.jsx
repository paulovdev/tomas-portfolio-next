"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { ClipText } from "@/components/ui/clip-text";

export function RevealText({
  text,
  as = "span",
  className,
  indent = 0,
  delay,
  exit,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: once, amount: 0.2 });

  return (
    <div ref={ref}>
      <ClipText
        as={as}
        text={text}
        animate={isInView ? "animate" : "initial"}
        exit={exit}
        className={className}
        indent={indent}
        delay={delay}
      />
    </div>
  );
}
