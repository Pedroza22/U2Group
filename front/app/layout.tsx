import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/hooks/use-language"
import { useEffect, useState } from "react";
import { CookieBanner } from "./components/cookie-banner";

export const metadata: Metadata = {
  title: "U2 Group - Arquitectura del Futuro",
  description: "Transformando espacios, creando futuro",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* PROVIDER DE IDIOMAS - Envuelve toda la aplicación y el banner de cookies */}
          <LanguageProvider>
            {children}
            <CookieBanner />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
