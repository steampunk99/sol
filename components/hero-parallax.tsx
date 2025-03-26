"use client"

import { useEffect, useRef } from "react"

interface HeroParallaxProps {
  children: React.ReactNode;
  speed?: number
  direction?: "up" | "down"
  className?: string
}

/**
 * Custom parallax component for hero images that preserves parent styling
 */
export default function HeroParallax({
  children,
  speed = 0.2,
  direction = "down",
  className = "",
}: HeroParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    // Apply transform directly to the child image
    const img = element.querySelector('img')
    if (!img) return
    
    // Set will-change for performance
    img.style.willChange = 'transform'
    
    const handleScroll = (e: Event) => {
      // Check if it's a custom Lenis event
      if (e.type === 'lenisscroll') {
        const customEvent = e as CustomEvent
        const scrollPosition = customEvent.detail?.scroll || 0
        const parallaxValue = direction === "down" ? scrollPosition * speed : scrollPosition * -speed
        img.style.transform = `translateY(${parallaxValue}px)`
      } else {
        // Regular scroll fallback
        const scrollPosition = window.scrollY
        const parallaxValue = direction === "down" ? scrollPosition * speed : scrollPosition * -speed
        img.style.transform = `translateY(${parallaxValue}px)`
      }
    }
    
    // Listen for both types of scroll events
    document.addEventListener('lenisscroll', handleScroll)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      document.removeEventListener('lenisscroll', handleScroll)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [speed, direction])
  
  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
} 