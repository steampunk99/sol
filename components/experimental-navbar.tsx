"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ExperimentalNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/services", label: "SERVICES" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/contact", label: "CONTACT" },
  ]

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle theme change with localStorage for persistence
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-[1000] transition-all duration-300",
          scrolled ? " py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-foreground text-2xl font-bold tracking-tighter relative z-[1001]">
            <span className="glitch-text" data-text="SOLFIT  SOLUTIONS">
              SOLFIT SOLUTIONS
            </span>
          </Link>

          <div className="flex items-center gap-4 relative z-[1001]">
            {mounted && (
              <button
                onClick={() => handleThemeChange(theme === "dark" ? "light" : "dark")}
                className="text-foreground p-2 rounded-full hover:bg-foreground/10 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
            <button
              className={cn("experimental-nav-toggle ", isOpen && "open")}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      <div className={cn("experimental-menu", isOpen && "open")}>
        <div className="noise-animation"></div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn("experimental-menu-item", pathname === link.href && "active")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <p className="text-muted-foreground">solfitsolutions2019@gmail.com</p>
                <p className="text-muted-foreground">+256 772 344 419</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Address</h3>
                <p className="text-muted-foreground">Kampala, Uganda</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Social</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Instagram
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    Twitter
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-foreground">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

