"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only enable custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      if (dotRef.current && circleRef.current) {
        // Add a small delay to the circle for a trailing effect
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

        setTimeout(() => {
          if (circleRef.current) {
            circleRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
          }
        }, 50)
      }

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Handle interactive elements
    const handleInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select')

      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => setIsHovering(true))
        element.addEventListener("mouseleave", () => setIsHovering(false))
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Run once on mount and then on any DOM changes
    handleInteractiveElements()

    const observer = new MutationObserver(handleInteractiveElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      observer.disconnect()
    }
  }, [isVisible])

  // Don't render on mobile
  if (typeof window !== "undefined" && window.innerWidth < 768) return null

  return (
    <>
      <div ref={dotRef} className={cn("cursor cursor-dot", !isVisible && "opacity-0")} />
      <div
        ref={circleRef}
        className={cn("cursor cursor-circle", !isVisible && "opacity-0", isHovering && "cursor-hover")}
      />
    </>
  )
}

