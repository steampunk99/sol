"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const ExperimentalButton: React.FC<ButtonProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white bg-black rounded-md group btn-experimental ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export const OutlineButton: React.FC<ButtonProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-orange-500 rounded-md group btn-outline-experimental ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

export const AnimatedArrowButton: React.FC<ButtonProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-orange-500 bg-transparent border border-orange-500 rounded-md hover:bg-orange-500 hover:text-white transition-colors duration-300 ${className}`}
    >
      <span>{children}</span>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:translate-x-1"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </motion.svg>
    </Link>
  );
}; 