"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface RevealImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  delay?: number
}

export default function RevealImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  delay = 0,
}: RevealImageProps) {
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
    <div ref={containerRef} className={cn("reveal-image", isRevealed && "is-revealed", className)}>
      <div className="reveal-image-inner">
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

