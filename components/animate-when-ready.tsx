"use client"

import React, { useEffect, useState, useRef } from "react"
import { usePageTransition } from "./page-transition"
import { cn } from "@/lib/utils"

interface AnimateWhenReadyProps {
  children: React.ReactNode
  as?: React.ElementType
  delay?: number
  duration?: number
  className?: string
  animateClassName?: string
  onlyOnce?: boolean // If true, will only animate once, not on re-entry to view
}

export default function AnimateWhenReady({
  children,
  as: Component = "div",
  delay = 0,
  duration = 0.6,
  className = "",
  animateClassName = "animate",
  onlyOnce = false,
}: AnimateWhenReadyProps) {
  const { canAnimate, transitionComplete } = usePageTransition()
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Don't animate until the transition is complete
    if (!canAnimate() || !transitionComplete()) {
      return
    }

    // If this is supposed to only animate once and it already has, skip
    if (onlyOnce && hasAnimated.current) {
      return
    }

    // Set up intersection observer for scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add slight delay to ensure smooth transition
            setTimeout(() => {
              setShouldAnimate(true)
              hasAnimated.current = true
            }, delay * 1000)
            
            if (onlyOnce) {
              observer.disconnect()
            }
          } else if (!onlyOnce) {
            setShouldAnimate(false)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [canAnimate, transitionComplete, delay, onlyOnce])

  return (
    <Component
      ref={elementRef}
      className={cn(
        className,
        shouldAnimate && animateClassName
      )}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </Component>
  )
} 