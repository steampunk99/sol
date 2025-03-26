import { cn } from "@/lib/utils"
import RevealText from "./reveal-text"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  center?: boolean
  className?: string
  titleClassName?: string
}

export default function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4 mb-12", center && "text-center", className)}>
      <h2 className={cn("text-4xl md:text-5xl font-display font-bold tracking-tight", titleClassName)}>
        <RevealText text={title} delay={300} />
      </h2>
      {subtitle && <p className="text-muted-foreground max-w-3xl">{subtitle}</p>}
    </div>
  )
}

