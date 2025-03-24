"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export default function AwwwardsNavbar() {
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

  return (
    <>
      <nav className="awwwards-nav">
        <Link href="/" className="awwwards-nav-logo">
          SOLFIT
        </Link>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <button className={cn("awwwards-nav-toggle", isOpen && "open")} onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={cn("menu-overlay", isOpen && "open")}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn("menu-item", pathname === link.href && "active")}
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

