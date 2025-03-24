"use client"

import type React from "react"

import { useRef, useEffect, useState, Children, cloneElement, isValidElement } from "react"
import { cn } from "@/lib/utils"

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  baseDelay?: number
  staggerDelay?: number
  threshold?: number
}

export default function StaggerContainer({
  children,
  className,
  baseDelay = 0,
  staggerDelay = 100,
  threshold = 0.1,
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      {
        threshold,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  // Clone children and add staggered delay
  const staggeredChildren = Children.map(children, (child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        className: cn("stagger-item", isRevealed && "is-revealed", child.props.className),
        style: {
          ...child.props.style,
          transitionDelay: `${baseDelay + index * staggerDelay}ms`,
        },
      })
    }
    return child
  })

  return (
    <div ref={containerRef} className={className}>
      {staggeredChildren}
    </div>
  )
}

