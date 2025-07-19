import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/context/cart-context";
import { LanguageProvider } from "@/hooks/use-language";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/app/components/cookie-banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "U2Group - Marketplace",
  description: "Marketplace de planos de casas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* PROVIDER DE IDIOMAS - Envuelve toda la aplicación y el banner de cookies */}
          <LanguageProvider>
            <AuthProvider>
              {children}
              <CookieBanner />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
