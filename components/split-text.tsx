"use client";

import React from "react";
import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  staggerChildren?: number;
  animationDuration?: number;
  delay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  charClassName = "",
  staggerChildren = 0.05,
  animationDuration = 0.8,
  delay = 0.1,
}) => {
  const letters = text.split("");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: "100%",
      rotate: -5,
      scale: 0.9,
      opacity: 0,
    },
    visible: {
      y: "0%",
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: animationDuration,
      },
    },
  };

  return (
    <motion.div
      className={`inline-flex ${className}`}
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className={`char-wrapper ${charClassName}`}
          variants={child}
        >
          {letter === " " ? (
            <span>&nbsp;</span>
          ) : (
            <>
              <span className="char-main">{letter}</span>
              <span className="char-shadow">{letter}</span>
            </>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const GlitchText: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  return (
    <span className={`glitch-text ${className}`} data-text={text}>
      {text}
    </span>
  );
}; 