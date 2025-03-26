"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "@/hooks/use-window-size"

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const windowSize = useWindowSize()
  const scrollingContainerRef = useRef<HTMLDivElement>(null)
  const [pageHeight, setPageHeight] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const requestRef = useRef<number | null>(null)

  const resizePageHeight = () => {
    if (scrollingContainerRef.current) {
      setPageHeight(scrollingContainerRef.current.scrollHeight)
    }
  }

  useEffect(() => {
    resizePageHeight()
  }, [windowSize.width, windowSize.height])

  useEffect(() => {
  

    const scrollingElement = scrollingContainerRef.current
    if (!scrollingElement) return

    let current = 0
    let target = 0
    const ease = 2.75

    const lerp = (start: number, end: number, t: number) => {
      return start * (1 - t) + end * t
    }

    const setTransform = (el: HTMLElement, transform: string) => {
      el.style.transform = transform
    }

    const onScroll = () => {
      target = window.scrollY
    }

    const smoothScroll = () => {
      current = lerp(current, target, ease)

      if (scrollingElement) {
        setTransform(scrollingElement, `translate3d(0, ${-current}px, 0)`)
      }

      setScrollY(current)

      requestRef.current = requestAnimationFrame(smoothScroll)
    }

    window.addEventListener("scroll", onScroll)
    requestRef.current = requestAnimationFrame(smoothScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])



  return (
    <div className="smooth-scroll">
      <div ref={scrollingContainerRef} className="smooth-scroll-container">
        {children}
      </div>
      <div style={{ height: pageHeight }} />
    </div>
  )
}

