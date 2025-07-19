"use client"

import { useState } from "react"
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  planSet: string
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "56478SM",
      name: "56478SM",
      image: "/placeholder.svg?height=80&width=120",
      price: 1000,
      planSet: "PDF",
      quantity: 1,
    },
    {
      id: "833073WAT",
      name: "833073WAT",
      image: "/placeholder.svg?height=80&width=120",
      price: 1500,
      planSet: "PDF + Editable",
      quantity: 1,
    },
    {
      id: "86415HH",
      name: "86415HH",
      image: "/placeholder.svg?height=80&width=120",
      price: 1000,
      planSet: "PDF",
      quantity: 2,
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D00FF] to-[#4F46E5] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Carrito de Compras</h2>
                <p className="text-white/80 text-sm">{cartItems.length} artículos</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm">Agrega algunos planos para comenzar</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex gap-4">
                    <div className="w-20 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">Plan {item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.planSet}</p>
                      <p className="text-lg font-bold text-[#0D00FF]">${item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 font-medium min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span className="text-[#0D00FF]">${total.toLocaleString()}</span>
              </div>

              <Button className="w-full bg-gradient-to-r from-[#0D00FF] to-[#4F46E5] hover:from-[#0D00FF]/90 hover:to-[#4F46E5]/90 text-white font-semibold py-3 rounded-xl">
                Proceder al Pago
              </Button>

              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl bg-transparent"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
