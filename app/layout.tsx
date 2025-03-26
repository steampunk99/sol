// app/layout.tsx
import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import {
  Space_Grotesk,
  Syne,
  JetBrains_Mono,
  Outfit,
  Unbounded,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ExperimentalNavbar from "@/components/experimental-navbar";
import Footer from "@/components/footer";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/page-transition";
import AutoAnimate from "@/components/auto-animate";
import LenisProvider from "@/components/lenis-provider";
import ScrollAdapter from "@/components/scroll-adapter";

// Replace with more impactful fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Add new boundary-pushing fonts
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SOLFIT • Creative Solutions",
  description:
    "Business consultants, Brand & Events Managers as well as the originators of your branding and printing solutions.",
  generator: "steampunk99",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Tawk.to Chat Widget Script */}
        <Script
          id="tawk-to"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
              (function(){
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/67e40f1e4d842c1908e1fbeb/1in9dm4ai';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin', '*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </head>
      <body
        className={cn(
          spaceGrotesk.variable,
          syne.variable,
          jetbrainsMono.variable,
          outfit.variable,
          unbounded.variable,
          "font-sans bg-background text-foreground antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <LenisProvider>
            <ScrollAdapter>
              <Loader />
              <AutoAnimate />
              <div className="flex min-h-screen flex-col">
                <ExperimentalNavbar />
                <PageTransition>
                  <main className="flex-1">{children}</main>
                </PageTransition>
                <Footer />
              </div>
            </ScrollAdapter>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
