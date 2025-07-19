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
  const [language, setLanguage] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
    if (storedLang && (storedLang === "es" || storedLang === "en") && storedLang !== language) {
      setLanguage(storedLang);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language, isHydrated]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  // Función de traducción
  const t = (key: string) => {
    const langTranslations = translations[language];
    return langTranslations?.[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
