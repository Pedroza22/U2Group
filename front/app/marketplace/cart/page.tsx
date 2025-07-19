"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MarketplaceHeader from "@/components/layout/marketplace-header"
import Image from "next/image"

interface CartItem {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login?redirect=/marketplace/cart")
      return
    }

    // Aquí cargaríamos los items del carrito desde localStorage o API
    const loadCartItems = () => {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
      setLoading(false)
    }

    loadCartItems()
  }, [router])

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const removeItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedItems)
    localStorage.setItem("cart", JSON.stringify(updatedItems))
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handleCheckout = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      const response = await fetch("/api/orders/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity
          }))
        })
      })

      if (!response.ok) {
        throw new Error("Error al procesar el pedido")
      }

      // Limpiar carrito
      localStorage.removeItem("cart")
      setCartItems([])
      
      // Redirigir a la página de pedidos
      router.push("/marketplace/orders")
    } catch (err) {
      setError("No se pudo procesar el pedido")
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito</h1>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando carrito...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Tu carrito está vacío</p>
            <button
              onClick={() => router.push("/marketplace")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Explorar productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center gap-4"
                >
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.product_name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product_name}
                    </h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Resumen del pedido
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>Gratis</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 