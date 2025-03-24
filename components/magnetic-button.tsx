"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}

export default function MagneticButton({ children, className, strength = 40, onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Only enable magnetic effect on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return

      const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      const maxDistance = Math.max(width, height) * 2

      if (distance < maxDistance) {
        const x = (distanceX / maxDistance) * strength
        const y = (distanceY / maxDistance) * strength
        setPosition({ x, y })
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener("mousemove", handleMouseMove)

    if (buttonRef.current) {
      buttonRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)

      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [strength])

  return (
    <button
      ref={buttonRef}
      className={cn("magnetic-button", className)}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

