"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Create a global transition state that can be accessed by other components
export let globalTransitionState = {
  isTransitioning: false,
  canAnimate: false, // Start with animations disabled
  transitionComplete: false
}

// Export a function that components can use to check if they should animate
export function usePageTransition() {
  return {
    shouldDelayAnimation: () => globalTransitionState.isTransitioning,
    canAnimate: () => globalTransitionState.canAnimate,
    transitionComplete: () => globalTransitionState.transitionComplete
  }
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionState, setTransitionState] = useState<"idle" | "entering" | "exiting">("idle")
  const [displayChildren, setDisplayChildren] = useState(children)
  const previousPathname = useRef<string | null>(null)
  
  // Set initial state on mount
  useEffect(() => {
    // Wait a bit after initial mount before allowing animations
    const timer = setTimeout(() => {
      globalTransitionState.canAnimate = true;
      globalTransitionState.transitionComplete = true;
    }, 1000); // Ensure this is longer than your loader's reveal time
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Only trigger transition if this isn't the initial render
    if (previousPathname.current !== null && previousPathname.current !== pathname) {
      // Reset animation flags
      globalTransitionState.isTransitioning = true;
      globalTransitionState.canAnimate = false;
      globalTransitionState.transitionComplete = false;
      
      // Start the transition - covering screen
      setIsTransitioning(true)
      setTransitionState("entering")

      // Wait for entering animation to complete before showing new content
      const enterTimeout = setTimeout(() => {
        // Update content while screen is covered
        setDisplayChildren(children)
        
        // Short delay to ensure content is ready before revealing
        setTimeout(() => {
          setTransitionState("exiting")
          
          // Reveal new content
          const exitTimeout = setTimeout(() => {
            setTransitionState("idle")
            setIsTransitioning(false)
            globalTransitionState.isTransitioning = false;
            
            // Allow animations only after transition is complete
            setTimeout(() => {
              globalTransitionState.canAnimate = true;
              globalTransitionState.transitionComplete = true;
            }, 50);
          }, 700)
          
          return () => clearTimeout(exitTimeout)
        }, 50);
      }, 700)

      return () => clearTimeout(enterTimeout)
    } else {
      // First load - no transition needed
      previousPathname.current = pathname
      setDisplayChildren(children)
    }
  }, [pathname, children])

  // Update ref for next comparison
  useEffect(() => {
    previousPathname.current = pathname
  }, [pathname])

  return (
    <>
      <div 
        className={cn(
          "transition-opacity duration-300",
          isTransitioning ? "opacity-0" : "opacity-100"
        )}
      >
        {displayChildren}
      </div>
      {isTransitioning && (
        <div
          className={cn(
            "page-transition",
            transitionState === "entering" && "entering",
            transitionState === "exiting" && "exiting",
          )}
        />
      )}
    </>
  )
}