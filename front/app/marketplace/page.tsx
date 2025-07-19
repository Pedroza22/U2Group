"use client"

import { Suspense, useState, useEffect, useCallback } from "react"
import Header from "@/components/layout/header"
import ControlsBar from "@/components/marketplace/controls-bar"
import PlanGrid from "@/components/marketplace/plan-grid"
import FilterSidebar from "@/components/marketplace/filter-sidebar"
import LoadingGrid from "@/components/marketplace/loading-grid"
import { Product, getProducts } from "@/lib/api-products"
import { FilterConfig, getFilterConfigs } from "@/lib/api-filters"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Heart, Settings, LogOut, Package } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/layout/footer"

export default function MarketplacePage() {
  const router = useRouter()
  const [isControlsVisible, setIsControlsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [unit, setUnit] = useState<"sqft" | "m2">("m2")
  const [activeView, setActiveView] = useState<"images" | "plans">("images")
  const [filters, setFilters] = useState<Record<string, any>>({})
  const [filterConfigs, setFilterConfigs] = useState<FilterConfig[]>([])
  const [sortBy, setSortBy] = useState("Trending")
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [favoritesCount, setFavoritesCount] = useState(5)

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const userMenuItems = [
    { 
      icon: Package, 
      label: "Orders", 
      onClick: () => router.push("/marketplace/orders")
    },
    { 
      icon: Settings, 
      label: "Settings", 
      onClick: () => router.push("/marketplace/settings")
    },
    { 
      icon: LogOut, 
      label: "Log out", 
      onClick: handleLogout
    },
  ]

  // Modificar el efecto de scroll para una animación más suave
  useEffect(() => {
    let lastScroll = window.scrollY
    let ticking = false

    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (currentScroll > lastScroll && currentScroll > 100) {
            setIsControlsVisible(false)
          } else if (currentScroll < lastScroll || currentScroll <= 100) {
            setIsControlsVisible(true)
          }
          lastScroll = currentScroll
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Resto de la lógica de fetching...
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const configData = await getFilterConfigs();
        setFilterConfigs(configData);
      } catch (error) {
        console.error('Error fetching filter configs:', error);
      }
    };
    fetchConfigs();
  }, []);

  const loadProducts = useCallback(async (currentFilters: Record<string, any>) => {
    setLoading(true);
    try {
      const productData = await getProducts(currentFilters);
      setProducts(productData?.results || []);
    } catch (error) {
      setProducts([]);
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts(filters);
  }, [filters, loadProducts]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="marketplace" />

      <main className="flex-1 container mx-auto px-4 pt-2 pb-24">
        <div className={`sticky top-0 bg-white/80 backdrop-blur-sm z-20 -mx-4 px-4 transition-all duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-4">
              <ControlsBar
                isSticky={!isControlsVisible}
                activeView={activeView}
                setActiveView={setActiveView}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            <div className="flex items-center gap-3">
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
                    <div className="relative z-10 py-2">
                      {userMenuItems.map((item, index) => {
                        const IconComponent = item.icon
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              item.onClick()
                              setIsUserDropdownOpen(false)
                            }}
                            className="w-full px-4 py-3 text-left transition-all duration-200 text-gray-900 hover:bg-gray-50 flex items-center gap-3"
                          >
                            <IconComponent className="w-5 h-5 text-gray-900" />
                            <span>{item.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Favorites Button */}
              <button 
                onClick={() => router.push("/marketplace/favorites")}
                className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 relative"
              >
                <Heart className="w-5 h-5 text-gray-900" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button 
                onClick={() => router.push("/marketplace/cart")}
                className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-900" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="py-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {loading ? (
              <span className="animate-pulse">Cargando...</span>
            ) : (
              <>{(products?.length ?? 0).toLocaleString()} planes</>
            )}
          </h1>
        </div>

        <div className="flex gap-6 mt-4 min-h-[calc(100vh-24rem)]">
          <div className="flex-1">
            <Suspense fallback={<LoadingGrid />}>
              {loading ? (
                <LoadingGrid />
              ) : (
                <PlanGrid 
                  products={products} 
                  unit={unit} 
                  filters={filters} 
                  sortBy={sortBy}
                  onProductClick={(id) => router.push(`/marketplace/products/${id}`)}
                />
              )}
            </Suspense>
          </div>
          <div className="flex items-start">
            <FilterSidebar 
              unit={unit} 
              setUnit={setUnit} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
