"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/services", label: "SERVICES & PRODUCTS" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/contact", label: "CONTACT" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-background/90 backdrop-blur-md py-3" : "bg-transparent py-6",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="relative z-10">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary font-display tracking-tight">SOLFIT</span>
                <span className="hidden md:inline-block text-xs tracking-widest uppercase">Solutions</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm tracking-wider transition-colors hover:text-primary relative hover-link",
                    pathname === link.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <ModeToggle />
            </div>

            <div className="md:hidden flex items-center">
              <ModeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 transition-transform duration-500 transform md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "text-3xl font-display tracking-wider transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
      <div className={cn("transition-all duration-500", scrolled ? "h-16" : "h-24")} /> {/* Spacer for fixed header */}
    </>
  )
}

