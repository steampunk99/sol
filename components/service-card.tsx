"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={cn(
        "group block p-6 border rounded-none transition-all duration-300",
        "hover:shadow-lg hover:border-primary/50",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 text-primary">{icon}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
        <div className="flex items-center text-sm font-medium text-primary">
          <span>Learn more</span>
          <ArrowRight
            className={cn("ml-1 h-4 w-4 transition-transform duration-300", isHovered ? "translate-x-1" : "")}
          />
        </div>
      </div>
    </Link>
  )
}

