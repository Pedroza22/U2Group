"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { Heart, Trash2 } from "lucide-react"

interface FavoriteProduct {
  id: number;
  name: string;
  price: number;
  main_image: string;
  area_m2: number;
  bedrooms: number;
  bathrooms: number;
}

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cargar favoritos desde localStorage por ahora
    // Más adelante se puede conectar con la API
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem("favorites")
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites))
      }
      setLoading(false)
    }

    loadFavorites()
  }, [])

  const removeFavorite = (productId: number) => {
    const newFavorites = favorites.filter(fav => fav.id !== productId)
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="marketplace" />

      <main className="flex-1 container mx-auto px-4 pt-2 pb-24">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes favoritos</h2>
            <p className="text-gray-600 mb-6">Guarda tus planos favoritos para verlos más tarde</p>
            <button
              onClick={() => router.push("/marketplace")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar planos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.main_image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
                  >
                    <Trash2 className="w-4 h-4 text-gray-700 group-hover:text-red-600" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold text-blue-600">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="font-medium">{product.area_m2}</p>
                      <p className="text-xs">m²</p>
                    </div>
                    <div>
                      <p className="font-medium">{product.bedrooms}</p>
                      <p className="text-xs">Bed</p>
                    </div>
                    <div>
                      <p className="font-medium">{product.bathrooms}</p>
                      <p className="text-xs">Bath</p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/marketplace/products/${product.id}`)}
                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 