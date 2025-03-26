"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Logo {
  src?: string        // Image source (optional)
  alt: string         // Alternative text or logo name
  width?: number
  height?: number
  shape?: 'star' | 'pentagon' | 'hexagon' | 'cloud' | undefined // Shape type for SVG placeholder
}

interface LogoMarqueeProps {
  logos: Logo[]
  speed?: number      // Speed in seconds for one complete cycle
  pauseOnHover?: boolean
  className?: string
}

export default function LogoMarquee({ 
  logos, 
  speed = 25, 
  pauseOnHover = true,
  className
}: LogoMarqueeProps) {
  const [duplicatedLogos, setDuplicatedLogos] = useState<Logo[]>([])
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate logos to ensure continuous scrolling
  useEffect(() => {
    // Duplicate the logos array to ensure continuous scrolling
    setDuplicatedLogos([...logos, ...logos, ...logos])
  }, [logos])

  // Render SVG shape based on type
  const renderShape = (shape: string | undefined, alt: string) => {
    switch(shape) {
      case 'star':
        return (
          <svg width="80" height="80" viewBox="0 0 100 100" className="text-primary">
            <path
              d="M50 0 L63 38 L100 38 L69 59 L81 100 L50 75 L19 100 L31 59 L0 38 L37 38 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text x="50" y="55" textAnchor="middle" fontSize="10" fill="currentColor">{alt}</text>
          </svg>
        )
      case 'pentagon':
        return (
          <svg width="80" height="80" viewBox="0 0 100 100" className="text-primary">
            <path
              d="M50 0 L100 35 L81 100 L19 100 L0 35 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text x="50" y="55" textAnchor="middle" fontSize="10" fill="currentColor">{alt}</text>
          </svg>
        )
      case 'hexagon':
        return (
          <svg width="80" height="80" viewBox="0 0 100 100" className="text-primary">
            <path
              d="M25 0 L75 0 L100 50 L75 100 L25 100 L0 50 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text x="50" y="55" textAnchor="middle" fontSize="10" fill="currentColor">{alt}</text>
          </svg>
        )
      case 'cloud':
        return (
          <svg width="80" height="80" viewBox="0 0 100 60" className="text-primary">
            <path
              d="M25 60 C 10 60, 0 50, 0 35 C 0 20, 15 10, 30 15 C 30 5, 40 0, 50 0 C 65 0, 75 10, 75 20 C 90 15, 100 25, 100 40 C 100 50, 90 60, 75 60 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <text x="50" y="35" textAnchor="middle" fontSize="10" fill="currentColor">{alt}</text>
          </svg>
        )
      default:
        return (
          <div className="flex items-center justify-center h-16 w-32 border border-primary rounded">
            {alt}
          </div>
        )
    }
  }

  if (duplicatedLogos.length === 0) {
    return null
  }

  return (
    <div 
      className={cn(
        "logo-marquee", 
        className
      )}
    >
      {/* Gradient overlay for left fade effect */}
      <div className="marquee-fade-left" />
      
      {/* Gradient overlay for right fade effect */}
      <div className="marquee-fade-right" />
      
      {/* Marquee container */}
      <div
        className="logo-marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="logo-marquee-item opacity-70"
          >
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 180}
                height={logo.height || 120}
                className="h-32 w-auto object-contain"
              />
            ) : (
              renderShape(logo.shape, logo.alt)
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 