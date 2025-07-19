"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart, LogOut, LogIn, User, Heart, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"

export default function MarketplaceHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const handleLoginClick = () => {
    router.push("/login")
  }

  const handleLogoutClick = () => {
    logout()
  }

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  // Navegación básica siempre visible
  const baseNavItems = [
    { id: "products", label: t("productos"), href: "/marketplace" },
  ]

  // Navegación adicional para usuarios autenticados
  const authNavItems = [
    { id: "cart", label: t("carrito"), href: "/marketplace/cart" },
    { id: "orders", label: t("ordenes"), href: "/marketplace/orders" },
  ]

  // Combinar items de navegación según autenticación
  const navItems = isAuthenticated ? [...baseNavItems, ...authNavItems] : baseNavItems

  return (
    <header className="bg-white shadow-sm border-b neutra-font">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <Image src="/images/u2-logo.png" alt="U2 Group" width={80} height={80} className="mr-2" />
          </Link>

          {/* NAVEGACIÓN DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors neutra-font"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex items-center gap-3">
            {/* Botón de idioma */}
            <Button
              onClick={handleLanguageToggle}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              {language === "es" ? "EN" : "ES"}
            </Button>

            {isAuthenticated ? (
              <>
                {/* User Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200"
                  >
                    <User className="w-5 h-5 text-gray-900" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <p className="text-sm text-gray-600">{t("conectado_como")}</p>
                        <p className="font-medium text-gray-900">{user?.username || user?.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/marketplace/settings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          {t("ajustes")}
                        </Link>
                        <button
                          onClick={handleLogoutClick}
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          {t("salir")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Favorites Button */}
                <Link
                  href="/marketplace/favorites"
                  className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 relative"
                >
                  <Heart className="w-5 h-5 text-gray-900" />
                </Link>

                {/* Cart Button */}
                <Link
                  href="/marketplace/cart"
                  className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 relative"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-900" />
                </Link>
              </>
            ) : (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 neutra-font"
              >
                <LogIn className="w-4 h-4" />
                {t("iniciar_sesion")}
              </Button>
            )}

            {/* BOTÓN MENÚ MÓVIL */}
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="sm" className="md:hidden">
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
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors neutra-font"
                >
                  {item.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleLogoutClick()
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                >
                  {t("salir")}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    handleLoginClick()
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  {t("iniciar_sesion")}
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 