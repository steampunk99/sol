"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedScrollIndicatorProps {
  className?: string;
}

export const AnimatedScrollIndicator: React.FC<AnimatedScrollIndicatorProps> = ({
  className = "",
}) => {
  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <motion.span 
        className="text-xs tracking-widest font-medium mb-2 text-orange-500"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        SCROLL
      </motion.span>
      
      <motion.div className="relative h-16 w-px bg-orange-500/30">
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/3 bg-orange-500"
          animate={{ 
            top: ["0%", "66%", "0%"]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            ease: "easeInOut" 
          }}
        />
      </motion.div>
    </motion.div>
  );
}; 