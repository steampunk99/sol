"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const loaderRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const initialLoadDone = useRef(false)

  useEffect(() => {
    // Only show loader on initial page load, not on navigation
    if (initialLoadDone.current) {
      setIsLoading(false)
      return
    }

    // Simulate loading assets
    const loadAssets = () => {
      const intervalId = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + Math.random() * 10
          return newProgress >= 100 ? 100 : newProgress
        })
      }, 200)

      return intervalId
    }

    const intervalId = loadAssets()

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      // Delay to show 100% for a moment
      setTimeout(() => {
        if (loaderRef.current) {
          loaderRef.current.classList.add("hidden")

          // Remove loader after animation completes
          setTimeout(() => {
            setIsLoading(false)
            initialLoadDone.current = true
          }, 800)
        }
      }, 500)
    }
  }, [progress])

  // Don't render anything if not loading
  if (!isLoading) return null

  return (
    <div ref={loaderRef} className="loader">
      <div className="noise-animation"></div>
      <div className="loader-text">SOLFIT SOLUTIONS</div>
      <div className="loader-line">
        <div className="loader-line-inner" style={{ width: `${progress}%` }} />
      </div>
      <div className="loader-text mt-4">{Math.round(progress)}%</div>
    </div>
  )
}

