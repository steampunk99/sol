"use client"

import { useEffect, useRef } from "react"
import { useMousePosition } from "./mouse-provider"
import { useSound } from "./sound-provider"
import { cn } from "@/lib/utils"
import gsap from "gsap"

export default function Cursor() {
  const { mouseX, mouseY, cursorType, cursorText } = useMousePosition()
  const { playSound } = useSound()

  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = () => {
      if (dotRef.current && circleRef.current) {
        gsap.to(dotRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.1,
          ease: "power2.out",
        })

        gsap.to(circleRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mouseX, mouseY])

  useEffect(() => {
    if (cursorType === "hover") {
      playSound("hover")
    }
  }, [cursorType, playSound])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor cursor-dot"
        style={{
          transform: `translate(${mouseX}px, ${mouseY}px)`,
        }}
      />
      <div
        ref={circleRef}
        className={cn("cursor cursor-circle", cursorType !== "default" && "cursor-hover")}
        style={{
          transform: `translate(${mouseX}px, ${mouseY}px)`,
        }}
      >
        <div ref={textRef} className="cursor-text">
          {cursorText || (cursorType === "view" ? "VIEW" : cursorType === "drag" ? "DRAG" : "")}
        </div>
      </div>
    </>
  )
}

