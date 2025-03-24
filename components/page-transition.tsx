"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionState, setTransitionState] = useState<"idle" | "entering" | "exiting">("idle")
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    if (pathname) {
      setIsTransitioning(true)
      setTransitionState("entering")

      const enterTimeout = setTimeout(() => {
        setTransitionState("exiting")
        setDisplayChildren(children)

        const exitTimeout = setTimeout(() => {
          setTransitionState("idle")
          setIsTransitioning(false)
        }, 700)

        return () => clearTimeout(exitTimeout)
      }, 700)

      return () => clearTimeout(enterTimeout)
    }
  }, [pathname, children])

  return (
    <>
      {displayChildren}
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

