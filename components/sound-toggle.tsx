"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useSound } from "./sound-provider"
import { useMousePosition } from "./mouse-provider"

export default function SoundToggle() {
  const { isMuted, toggleMute, playSound } = useSound()
  const { setCursorType, setCursorText } = useMousePosition()

  const handleToggle = () => {
    toggleMute()
    playSound("click")
  }

  return (
    <button
      className="sound-toggle"
      onClick={handleToggle}
      onMouseEnter={() => {
        setCursorType("hover")
        setCursorText(isMuted ? "UNMUTE" : "MUTE")
      }}
      onMouseLeave={() => {
        setCursorType("default")
        setCursorText("")
      }}
    >
      {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
    </button>
  )
}

