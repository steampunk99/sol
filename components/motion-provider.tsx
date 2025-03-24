"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"

type MotionContextType = {
  currentSection: number
  totalSections: number
  setTotalSections: (total: number) => void
  navigateToSection: (section: number) => void
  isTransitioning: boolean
}

const MotionContext = createContext<MotionContextType>({
  currentSection: 0,
  totalSections: 0,
  setTotalSections: () => {},
  navigateToSection: () => {},
  isTransitioning: false,
})

export const useMotion = () => useContext(MotionContext)

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [totalSections, setTotalSections] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      if (isTransitioning) return

      // Clear previous timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }

      // Set a timeout to prevent rapid scrolling
      wheelTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          navigateToSection(currentSection + 1)
        } else if (e.deltaY < 0 && currentSection > 0) {
          navigateToSection(currentSection - 1)
        }
      }, 100)
    }

    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
    }
  }, [currentSection, totalSections, isTransitioning])

  const navigateToSection = (section: number) => {
    if (section < 0 || section >= totalSections || isTransitioning) return

    setIsTransitioning(true)
    setCurrentSection(section)

    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000)
  }

  return (
    <MotionContext.Provider
      value={{
        currentSection,
        totalSections,
        setTotalSections,
        navigateToSection,
        isTransitioning,
      }}
    >
      {children}
    </MotionContext.Provider>
  )
}

