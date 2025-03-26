"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Store lenis instance in ref for use in other components
    lenisRef.current = lenis

    // Add to window for debugging and external access
    if (typeof window !== "undefined") {
      // @ts-ignore - custom property
      window.lenis = lenis
    }

    // Set up the animation loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    // Expose lenis events for other components to use
    lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }: any) => {
      // Custom scroll event that other components can listen for
      const scrollEvent = new CustomEvent('lenisscroll', {
        detail: { scroll, limit, velocity, direction, progress }
      })
      document.dispatchEvent(scrollEvent)
    })

    return () => {
      // Clean up
      lenis.destroy()
      if (typeof window !== "undefined") {
        // @ts-ignore - custom property
        delete window.lenis
      }
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
} 