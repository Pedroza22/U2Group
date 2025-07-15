"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

interface HeaderProps {
  currentPage?: string
  onLogoClick?: () => void
}

export default function Header({ currentPage, onLogoClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  const navItems = [
    { id: "inicio", label: t("inicio"), href: "/" },
    { id: "proyectos", label: t("proyectos"), href: "/proyectos" },
    { id: "nosotros", label: t("nosotros"), href: "/nosotros" },
    { id: "disena", label: t("disena"), href: "/disena" },
    { id: "blog", label: t("blog"), href: "/blog" },
    { id: "contacto", label: t("contacto"), href: "/contacto" },
  ]

  return (
    <header className="bg-white shadow-sm border-b neutra-font">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <a
            className="flex items-center cursor-pointer"
            onClick={onLogoClick ? (e) => { e.preventDefault(); onLogoClick(); } : undefined}
            href="/"
          >
            <Image src="/images/u2-logo.png" alt="U2 Group" width={80} height={80} className="mr-2" />
            <span className="text-xl neutra-font-black text-blue-600"></span>
          </a>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-gray-700 hover:text-blue-600 transition-colors neutra-font ${
                  currentPage === item.id ? "text-blue-600 font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* BOTÓN DE IDIOMA Y MENÚ MÓVIL */}
          <div className="flex items-center space-x-4">
            {/*FIX DEL BOTÓN */}
            <Button
              onClick={handleLanguageToggle}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 neutra-font bg-transparent"
            >
              <Globe className="w-4 h-4" />
              {language === "es" ? "EN" : "ES"}
            </Button>

            {/* BOTÓN MENÚ MÓVIL */}
            <Button onClick={toggleMenu} variant="ghost" size="sm" className="md:hidden">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* MENÚ MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors neutra-font ${
                    currentPage === item.id ? "text-blue-600 font-medium bg-blue-50" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
