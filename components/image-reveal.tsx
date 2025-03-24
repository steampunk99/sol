"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageRevealProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  delay?: number
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  delay = 0,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsRevealed(true)
          }, delay)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [delay])

  return (
    <div ref={containerRef} className={cn("image-reveal", isRevealed && "revealed", className)}>
      <div className="image-reveal-inner">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  )
}

