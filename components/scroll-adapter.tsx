"use client"

import React, { useEffect } from 'react'

interface ScrollAdapterProps {
  children: React.ReactNode
}

export default function ScrollAdapter({ children }: ScrollAdapterProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create a function to trigger intersection observer checks
    const triggerIntersection = () => {
      // Get all elements being observed
      const elementsToAnimate = document.querySelectorAll('.scroll-reveal, .reveal-text, .reveal-image, .fade-in, .stagger-item, .animate-when-ready')
      
      // Force intersection checks by slightly modifying element positions
      elementsToAnimate.forEach(el => {
        const rect = el.getBoundingClientRect()
        const isInView = (
          rect.top <= window.innerHeight &&
          rect.bottom >= 0
        )
        
        // If element is in view, trigger the 'visible' class or manually trigger
        // intersection observer by manipulating position slightly
        if (isInView) {
          el.classList.add('visible')
          
          // For reveal-text animations
          if (el.classList.contains('reveal-text') && !el.classList.contains('is-revealed')) {
            el.classList.add('is-revealed')
          }
          
          // For reveal-image animations
          if (el.classList.contains('reveal-image') && !el.classList.contains('is-revealed')) {
            el.classList.add('is-revealed')
          }
          
          // For fade-in animations
          if (el.classList.contains('fade-in') && !el.classList.contains('is-revealed')) {
            el.classList.add('is-revealed')
          }
          
          // For stagger animations
          if (el.classList.contains('stagger-item') && !el.classList.contains('is-revealed')) {
            el.classList.add('is-revealed')
          }
          
          // For animate-when-ready
          if (el.classList.contains('animate-when-ready') && !el.classList.contains('animate')) {
            el.classList.add('animate')
          }
        }
      })
    }

    // Listen for Lenis scroll events
    const handleScroll = () => {
      triggerIntersection()
    }

    // Attach to custom event from Lenis
    document.addEventListener('lenisscroll', handleScroll)
    
    // Also trigger on initial load
    setTimeout(triggerIntersection, 100)

    return () => {
      document.removeEventListener('lenisscroll', handleScroll)
    }
  }, [])

  return <>{children}</>
} 