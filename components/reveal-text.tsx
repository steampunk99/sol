"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
}

export default function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true)
          }, delay)
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
  }, [delay])

  return (
    <div ref={containerRef} className={cn("reveal-text", isRevealed && "is-revealed", className)}>
      <span className="reveal-text-inner" style={{ transitionDelay: `${delay}ms` }}>
        {text}
      </span>
    </div>
  )
}

