"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "@/data/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicializar idioma desde localStorage si existe, si no, usar 'es'
  function getInitialLanguage(): Language {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("u2-language") as Language | null
      if (saved === "es" || saved === "en") return saved
    }
    return "es"
  }

  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  // Estado para saber si ya se montó y evitar parpadeo
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cuando cambia el idioma, guardarlo en localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("u2-language", lang)
  }

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key
  }

  // Evitar renderizar hijos hasta que esté montado (para evitar parpadeo de idioma)
  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
