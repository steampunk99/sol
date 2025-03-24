"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function AnimatedImage({ src, alt, width, height, className, priority = false }: AnimatedImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={cn("overflow-hidden relative", className)}>
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          isVisible ? "opacity-100 transform-none" : "opacity-0 translate-y-8",
        )}
      >
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-cover"
        />
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-primary transition-transform duration-700 ease-in-out",
          isVisible ? "translate-x-full" : "translate-x-0",
        )}
      />
    </div>
  )
}

