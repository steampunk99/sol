"use client"

import { useEffect } from "react"
import { usePageTransition } from "./page-transition"

export default function AutoAnimate() {
  const { canAnimate, transitionComplete } = usePageTransition()
  
  useEffect(() => {
    // Function to add animate class to elements
    const animateElements = () => {
      // Only start animations when transition is complete and animations are allowed
      if (!canAnimate() || !transitionComplete()) {
        return
      }
      
      // Add specific classes for hero elements
      const heroElements = [
        '.creative-hero-title',
        '.creative-hero-subtitle',
        '.creative-hero-buttons',
        '.home-hero-title',
        '.home-hero-subtitle',
        '.home-hero-buttons'
      ]
      
      // Add animate class with delays
      heroElements.forEach((selector, index) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          setTimeout(() => {
            el.classList.add('animate')
          }, index * 150)
        })
      })
      
      // Add animate class to all animate-when-ready elements
      const animateElements = document.querySelectorAll('.animate-when-ready')
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animate')
        }, 500 + index * 100) // Start after hero elements
      })
    }
    
    // Set timeout to run after transition completes
    const timer = setTimeout(animateElements, 100)
    
    // Create a mutation observer to watch for canAnimate changes
    const checkInterval = setInterval(() => {
      if (canAnimate() && transitionComplete()) {
        animateElements()
        clearInterval(checkInterval)
      }
    }, 100)
    
    return () => {
      clearTimeout(timer)
      clearInterval(checkInterval)
    }
  }, [canAnimate, transitionComplete])
  
  // This component doesn't render anything
  return null
} 