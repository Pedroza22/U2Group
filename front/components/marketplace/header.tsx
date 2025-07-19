"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Heart, Settings, LogOut, Package, Globe, ChevronDown } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { useAuth } from "@/context/auth-context"

interface HeaderProps {
  isVisible: boolean
  cartCount: number
  favoritesCount: number
  sortBy: string
  setSortBy: (sort: string) => void
  activeView: "images" | "plans"
  setActiveView: (view: "images" | "plans") => void
}

export default function Header({
  isVisible,
  cartCount,
  favoritesCount,
  sortBy,
  setSortBy,
  activeView,
  setActiveView,
}: HeaderProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false)
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleUserClick = () => {
    if (!user) {
      router.push('/login');
    } else {
      setIsUserDropdownOpen((open) => !open);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    router.push('/');
  };

  const userMenuItems = [
    { icon: User, label: t("Mi perfil"), onClick: () => { setIsUserDropdownOpen(false); router.push('/profile'); } },
    { icon: Package, label: t("ordenes"), onClick: () => { setIsUserDropdownOpen(false); router.push('/profile/orders'); } },
    { icon: Settings, label: t("ajustes"), onClick: () => { setIsUserDropdownOpen(false); router.push('/profile/settings'); } },
    { icon: LogOut, label: t("salir"), onClick: handleLogout },
  ];

  const sortOptions = [
    t("Tendencias"),
    t("Precio: Menor a Mayor"),
    t("Precio: Mayor a Menor"),
    t("Más Nuevos"),
    t("Más Populares"),
    t("Área: Menor a Mayor"),
    t("Área: Mayor a Menor"),
  ];

  const handleSortSelect = (option: string) => {
    setSortBy(option)
    setIsSortDropdownOpen(false)
  }

  return (
    <header
      className={`bg-white text-gray-800 transition-transform duration-300 shadow-sm ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } fixed top-0 left-0 right-0 z-30`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 bg-[#0D00FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">J2</span>
            </div>
            <span className="text-xl font-bold text-gray-800">GROUP</span>
          </Link>

          {/* Botones de vista y sort juntos */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView("images")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium ${
                activeView === "images"
                  ? "bg-[#0D00FF] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              {t("Imágenes del plan")}
            </button>

            <button
              onClick={() => setActiveView("plans")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 font-medium ${
                activeView === "plans"
                  ? "bg-[#0D00FF] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {t("Planos de planta")}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 font-medium"
              >
                {sortBy}
                <ChevronDown className={`w-4 h-4 transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-30 overflow-hidden">
                  <div className="py-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSortSelect(option)}
                        className={`w-full px-4 py-2 text-left transition-all duration-200 ${
                          sortBy === option
                            ? "bg-[#0D00FF]/10 text-[#0D00FF] font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contador de planes y controles del lado derecho */}
          <div className="flex items-center gap-3">
            {/* Aquí puedes dejar el contador de planes, si lo tienes */}
            {/* Selector de idioma */}
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span className="font-medium">ES</span>
            </div>
            {/* Usuario, favoritos, carrito */}
            <button
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 relative"
              onClick={() => router.push('/profile/favorites')}
              aria-label="Favoritos"
            >
              <Heart className="w-5 h-5 text-gray-600" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0D00FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 relative"
              onClick={() => router.push('/cart')}
              aria-label="Carrito"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#0D00FF] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount}
              </span>
            </button>
            <div className="relative">
              <button
                onClick={handleUserClick}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                aria-label="Usuario"
              >
                <User className="w-5 h-5 text-gray-600" />
              </button>
              {isUserDropdownOpen && user && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-40 overflow-hidden">
                  <div className="py-2">
                    {userMenuItems.map((item, index) => {
                      const IconComponent = item.icon
                      return (
                        <button
                          key={index}
                          onClick={item.onClick}
                          className="w-full px-4 py-3 text-left transition-all duration-200 text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <IconComponent className="w-5 h-5 text-gray-500" />
                          <span>{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
