"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useRef } from "react"

type SoundContextType = {
  isMuted: boolean
  toggleMute: () => void
  playSound: (sound: "hover" | "click" | "transition") => void
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSound: () => {},
})

export const useSound = () => useContext(SoundContext)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  const hoverSoundRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const transitionSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio elements
    hoverSoundRef.current = new Audio("/sounds/hover.mp3")
    clickSoundRef.current = new Audio("/sounds/click.mp3")
    transitionSoundRef.current = new Audio("/sounds/transition.mp3")

    // Set volume
    if (hoverSoundRef.current) hoverSoundRef.current.volume = 0.2
    if (clickSoundRef.current) clickSoundRef.current.volume = 0.3
    if (transitionSoundRef.current) transitionSoundRef.current.volume = 0.4

    setIsInitialized(true)
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const playSound = (sound: "hover" | "click" | "transition") => {
    if (isMuted || !isInitialized) return

    switch (sound) {
      case "hover":
        if (hoverSoundRef.current) {
          hoverSoundRef.current.currentTime = 0
          hoverSoundRef.current.play()
        }
        break
      case "click":
        if (clickSoundRef.current) {
          clickSoundRef.current.currentTime = 0
          clickSoundRef.current.play()
        }
        break
      case "transition":
        if (transitionSoundRef.current) {
          transitionSoundRef.current.currentTime = 0
          transitionSoundRef.current.play()
        }
        break
    }
  }

  return <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>{children}</SoundContext.Provider>
}

