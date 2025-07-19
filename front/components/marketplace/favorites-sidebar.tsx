"use client"

import { useState } from "react"
import { X, Heart, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface FavoriteItem {
  id: string
  name: string
  image: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  stories: number
  garage: number
}

interface FavoritesSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function FavoritesSidebar({ isOpen, onClose }: FavoritesSidebarProps) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([
    {
      id: "56478SM",
      name: "56478SM",
      image: "/placeholder.svg?height=120&width=160",
      price: 1295,
      sqft: 2400,
      bedrooms: 4,
      bathrooms: 3.5,
      stories: 1,
      garage: 3,
    },
    {
      id: "833073WAT",
      name: "833073WAT",
      image: "/placeholder.svg?height=120&width=160",
      price: 1495,
      sqft: 1621,
      bedrooms: 3,
      bathrooms: 2.5,
      stories: 2,
      garage: 2,
    },
    {
      id: "86415HH",
      name: "86415HH",
      image: "/placeholder.svg?height=120&width=160",
      price: 2024,
      sqft: 2301,
      bedrooms: 4,
      bathrooms: 2.5,
      stories: 1,
      garage: 2,
    },
    {
      id: "280242JWD",
      name: "280242JWD",
      image: "/placeholder.svg?height=120&width=160",
      price: 1750,
      sqft: 5280,
      bedrooms: 5,
      bathrooms: 4,
      stories: 2,
      garage: 4,
    },
    {
      id: "14992RK",
      name: "14992RK",
      image: "/placeholder.svg?height=120&width=160",
      price: 970,
      sqft: 1850,
      bedrooms: 3,
      bathrooms: 2,
      stories: 2,
      garage: 2,
    },
  ])

  const removeFavorite = (id: string) => {
    setFavorites((items) => items.filter((item) => item.id !== id))
  }

  const addToCart = (item: FavoriteItem) => {
    // Aquí iría la lógica para agregar al carrito
    console.log("Added to cart:", item)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Mis Favoritos</h2>
                <p className="text-white/80 text-sm">{favorites.length} planos guardados</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Heart className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">No tienes favoritos</p>
              <p className="text-sm">Guarda planos que te gusten aquí</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <Link href={`/plan/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={80}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <Link href={`/plan/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-[#0D00FF] transition-colors">
                            Plan {item.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFavorite(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-lg font-bold text-[#0D00FF] mb-2">desde ${item.price.toLocaleString()}</p>

                      <div className="grid grid-cols-4 gap-2 text-xs text-gray-600 mb-3">
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">{item.sqft}</div>
                          <div>Sq. Ft.</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">{item.bedrooms}</div>
                          <div>Hab</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">{item.bathrooms}</div>
                          <div>Baño</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">{item.garage}</div>
                          <div>Autos</div>
                        </div>
                      </div>

                      <Button
                        onClick={() => addToCart(item)}
                        size="sm"
                        className="w-full bg-[#0D00FF] hover:bg-[#0D00FF]/90 text-white rounded-lg"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl bg-transparent"
            >
              Continuar Navegando
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
