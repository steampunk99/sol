"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useMotion } from "./motion-provider"
import { useSound } from "./sound-provider"
import { useMousePosition } from "./mouse-provider"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { currentSection, navigateToSection } = useMotion()
  const { playSound } = useSound()
  const { setCursorType, setCursorText } = useMousePosition()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    playSound("click")
  }

  const handleNavigation = (index: number) => {
    navigateToSection(index)
    setIsMenuOpen(false)
    playSound("transition")
  }

  const navItems = [
    { label: "Home", section: 0 },
    { label: "Work", section: 1 },
    { label: "About", section: 2 },
    { label: "Contact", section: 3 },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className="nav">
        <Link
          href="/"
          className="nav-logo"
          onClick={(e) => {
            e.preventDefault()
            navigateToSection(0)
            playSound("click")
          }}
          onMouseEnter={() => {
            setCursorType("hover")
            setCursorText("")
          }}
          onMouseLeave={() => {
            setCursorType("default")
            setCursorText("")
          }}
        >
          SOLFIT
        </Link>

        <button
          className={cn("nav-toggle", isMenuOpen && "active")}
          onClick={toggleMenu}
          onMouseEnter={() => {
            setCursorType("hover")
            setCursorText(isMenuOpen ? "CLOSE" : "MENU")
          }}
          onMouseLeave={() => {
            setCursorType("default")
            setCursorText("")
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={cn("nav-menu", isMenuOpen && "active")}>
        <div className="nav-menu-items">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={cn("nav-menu-item", currentSection === item.section && "text-primary")}
              onClick={() => handleNavigation(item.section)}
              onMouseEnter={() => {
                setCursorType("hover")
                setCursorText("")
              }}
              onMouseLeave={() => {
                setCursorType("default")
                setCursorText("")
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

