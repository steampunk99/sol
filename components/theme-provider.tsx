"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Ensure theme toggle only works after hydration to prevent mismatch
  React.useEffect(() => {
    setMounted(true)

    // Force theme application on initial load
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

