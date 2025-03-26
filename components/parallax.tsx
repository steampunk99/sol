"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
  ease?: number
  as?: React.ElementType
}

export default function Parallax({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  ease = 0.1,
  as: Component = motion.div,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Calculate movement based on direction
  let transformTemplate = {}
  const speedFactor = speed * 100 // Adjust the effect strength

  switch (direction) {
    case "up":
      transformTemplate = {
        y: useTransform(scrollYProgress, [0, 1], [speedFactor, -speedFactor])
      }
      break
    case "down":
      transformTemplate = {
        y: useTransform(scrollYProgress, [0, 1], [-speedFactor, speedFactor])
      }
      break
    case "left":
      transformTemplate = {
        x: useTransform(scrollYProgress, [0, 1], [speedFactor, -speedFactor])
      }
      break
    case "right":
      transformTemplate = {
        x: useTransform(scrollYProgress, [0, 1], [-speedFactor, speedFactor])
      }
      break
  }

  return (
    <Component
      ref={ref}
      className={className}
      initial="initial"
      style={{
        ...transformTemplate,
      }}
      transition={{ ease: [0.32, 0.72, 0, 1], duration: ease }}
    >
      {children}
    </Component>
  )
}

// Custom hook for accessing Lenis scroll directly
export function useParallaxScroll(
  speed = 0.1,
  direction = "y"
) {
  const elementRef = useRef<HTMLDivElement>(null)
  const initialPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!elementRef.current) return
    
    // Store initial position
    const computedStyle = window.getComputedStyle(elementRef.current)
    const transform = computedStyle.transform 
    const matrix = new DOMMatrix(transform === 'none' ? '' : transform)
    
    initialPositionRef.current = {
      x: matrix.m41,
      y: matrix.m42
    }
    currentPositionRef.current = { ...initialPositionRef.current }

    // Create the scroll handler
    const handleScroll = (e: Event) => {
      if (!elementRef.current) return
      
      const scrollEvent = e as CustomEvent
      const scrollPosition = scrollEvent.detail?.scroll || window.scrollY
      
      // Calculate new position
      const newPosition = direction === 'y'
        ? scrollPosition * speed
        : scrollPosition * speed
      
      // Apply transformation
      if (direction === 'y') {
        currentPositionRef.current.y = initialPositionRef.current.y + newPosition
        elementRef.current.style.transform = `translate3d(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px, 0)`
      } else {
        currentPositionRef.current.x = initialPositionRef.current.x + newPosition
        elementRef.current.style.transform = `translate3d(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px, 0)`
      }
    }

    // Listen for custom Lenis scroll event
    document.addEventListener('lenisscroll', handleScroll)

    return () => {
      document.removeEventListener('lenisscroll', handleScroll)
    }
  }, [direction, speed])

  return elementRef
} 