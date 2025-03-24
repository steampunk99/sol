"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  threshold?: number
}

export default function FadeIn({ children, className, delay = 0, threshold = 0.1 }: FadeInProps) {
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
        threshold,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay, threshold])

  return (
    <div
      ref={containerRef}
      className={cn("fade-in", isRevealed && "is-revealed", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

