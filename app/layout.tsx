import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Syne, JetBrains_Mono, Outfit, Unbounded } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ExperimentalNavbar from "@/components/experimental-navbar"
import Footer from "@/components/footer"
import Loader from "@/components/loader"
import ChatWidget from "@/components/chat-widget"
import { cn } from "@/lib/utils"
import PageTransition from "@/components/page-transition"
import AutoAnimate from "@/components/auto-animate"



// Replace with more impactful fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

// Add new boundary-pushing fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "SOLFIT • Creative Solutions",
  description:
    "Business consultants, Brand & Events Managers as well as the originators of your branding and printing solutions.",
    generator: 'steampunk99'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          spaceGrotesk.variable,
          syne.variable,
          jetbrainsMono.variable,
          outfit.variable,
          unbounded.variable,
          "font-sans bg-background text-foreground antialiased",
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <Loader />
          <AutoAnimate />
          <div className="flex min-h-screen flex-col">
            <ExperimentalNavbar />
            <PageTransition>
              <main className="flex-1">{children}</main>
            </PageTransition>
            <Footer />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
