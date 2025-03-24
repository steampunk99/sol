"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type MouseContextType = {
  mouseX: number
  mouseY: number
  cursorType: "default" | "hover" | "view" | "drag"
  cursorText: string
  setCursorType: (type: "default" | "hover" | "view" | "drag") => void
  setCursorText: (text: string) => void
}

const MouseContext = createContext<MouseContextType>({
  mouseX: 0,
  mouseY: 0,
  cursorType: "default",
  cursorText: "",
  setCursorType: () => {},
  setCursorText: () => {},
})

export const useMousePosition = () => useContext(MouseContext)

export function MouseProvider({ children }: { children: React.ReactNode }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "drag">("default")
  const [cursorText, setCursorText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible])

  useEffect(() => {
    // Add event listeners for interactive elements
    const handleInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]',
      )

      interactiveElements.forEach((element) => {
        const cursorType = element.getAttribute("data-cursor-type")
        const cursorText = element.getAttribute("data-cursor-text")

        element.addEventListener("mouseenter", () => {
          if (cursorType) {
            setCursorType(cursorType as any)
          } else {
            setCursorType("hover")
          }

          if (cursorText) {
            setCursorText(cursorText)
          }
        })

        element.addEventListener("mouseleave", () => {
          setCursorType("default")
          setCursorText("")
        })
      })
    }

    // Run once on mount and then on any DOM changes
    handleInteractiveElements()

    const observer = new MutationObserver(handleInteractiveElements)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <MouseContext.Provider
      value={{
        mouseX: mousePosition.x,
        mouseY: mousePosition.y,
        cursorType,
        cursorText,
        setCursorType,
        setCursorText,
      }}
    >
      {children}
    </MouseContext.Provider>
  )
}

