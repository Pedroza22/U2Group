"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

interface HeaderProps {
  currentPage?: string
  onLogoClick?: () => void // NUEVA PROP PARA EL CLICK DEL LOGO
}

export default function Header({ currentPage = "", onLogoClick }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage()

  const handleLanguageChange = (newLanguage: "es" | "en") => {
    setLanguage(newLanguage)
  }

  const getLinkClass = (page: string) => {
    return currentPage === page
      ? "text-blue-600 font-medium transition-colors"
      : "text-gray-700 hover:text-blue-600 transition-colors"
  }

  // FUNCIÓN PARA MANEJAR EL CLICK DEL LOGO
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log("🖱️ Logo clicked in Header")
    if (onLogoClick) {
      onLogoClick()
    }
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO - AHORA CLICKEABLE PARA REPRODUCIR VIDEO */}
        <div className="flex items-center">
          {onLogoClick ? (
            // Si hay función onLogoClick, hacer el logo clickeable
            <button onClick={handleLogoClick} className="cursor-pointer hover:opacity-80 transition-opacity">
              <Image src="/images/u2-logo.png" alt="U2 Group Logo" width={80} height={35} className="object-contain" />
            </button>
          ) : (
            // Si no hay función, usar Link normal
            <Link href="/">
              <Image src="/images/u2-logo.png" alt="U2 Group Logo" width={80} height={35} className="object-contain" />
            </Link>
          )}
        </div>

        {/* NAVEGACIÓN */}
        <nav className="hidden md:flex items-center space-x-8 text-lg neutra-font">
          <Link href="/" className={getLinkClass("inicio")}>
            {t("inicio")}
          </Link>
          <Link href="/proyectos" className={getLinkClass("proyectos")}>
            {t("proyectos")}
          </Link>
          <Link href="/nosotros" className={getLinkClass("nosotros")}>
            {t("nosotros")}
          </Link>
          <Link href="/disena" className={getLinkClass("disena")}>
            {t("disena")}
          </Link>
          <Link href="/blog" className={getLinkClass("blog")}>
            {t("blog")}
          </Link>
          <Link href="/contacto" className={getLinkClass("contacto")}>
            {t("contacto")}
          </Link>
        </nav>

        {/* SELECTOR DE IDIOMA Y MENÚ MÓVIL */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-white text-gray-700 neutra-font">
                <Globe className="w-4 h-4 mr-2" />
                {language.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleLanguageChange("es")}
                className={language === "es" ? "bg-blue-50 text-blue-600" : ""}
              >
                {t("spanish")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "bg-blue-50 text-blue-600" : ""}
              >
                {t("english")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="md:hidden bg-white text-gray-700">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
