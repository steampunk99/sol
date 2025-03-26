"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export default function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Split text into individual characters
  const characters = children.split("")

  return (
    <div ref={containerRef} className={cn("split-text-container", className)}>
      <div className="split-text-line">
        {characters.map((char, index) => (
          <span
            key={index}
            className="split-text-char"
            style={{
              // Convert milliseconds to seconds if delay is large (assume it's in ms)
              animationDelay: `${(delay > 100 ? delay / 1000 : delay) + index * 0.05}s`,
              display: char === " " ? "inline-block" : "inline-block",
              width: char === " " ? "0.5em" : "auto",
              // Apply animation only when visible
              animation: isVisible ? "char-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" : "none"
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}