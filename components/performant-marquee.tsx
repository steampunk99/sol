import { cn } from "@/lib/utils"

interface PerformantMarqueeProps {
  text: string
  className?: string
  speed?: number
}

export default function PerformantMarquee({ text, className, speed = 25 }: PerformantMarqueeProps) {
  // Duplicate the text to ensure continuous scrolling
  const duplicatedText = `${text} ${text} ${text} ${text}`

  return (
    <div className={cn("marquee-container overflow-hidden", className)}>
      <div className="marquee-content" style={{ animationDuration: `${speed}s` }}>
        {duplicatedText.split("•").map((segment, index) => (
          <span key={index}>{segment}•</span>
        ))}
      </div>
    </div>
  )
}

