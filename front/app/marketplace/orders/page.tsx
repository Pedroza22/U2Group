"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Image from "next/image"
import { Package, Clock, Calendar } from "lucide-react"

interface OrderItem {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  product_image: string;
}

interface Order {
  id: number;
  created_at: string;
  total_price: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: OrderItem[];
}

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("Verificando token:", token ? "Presente" : "Ausente")
    
    if (!token) {
      console.log("No hay token, redirigiendo a login")
      router.push("/login?redirect=/marketplace/orders")
      return
    }

    const fetchOrders = async () => {
      try {
        console.log("Iniciando fetchOrders")
        setLoading(true)
        setError("")
        
        console.log("Realizando petición a /api/auth/user/orders/")
        const response = await fetch("/api/auth/user/orders/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        console.log("Respuesta recibida:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        })

        // Obtener el texto de la respuesta primero
        const responseText = await response.text()
        console.log("Respuesta completa:", responseText)

        if (!response.ok) {
          console.log("La respuesta no fue exitosa")
          if (response.status === 401) {
            console.log("Error 401: Token inválido o expirado")
            localStorage.removeItem("token")
            router.push("/login?redirect=/marketplace/orders")
            return
          }

          // Intentar parsear el error como JSON
          let errorData
          try {
            errorData = JSON.parse(responseText)
            console.log("Error parseado:", errorData)
          } catch (e) {
            console.log("No se pudo parsear el error como JSON")
            errorData = { error: responseText }
          }

          throw new Error(
            errorData.error || 
            errorData.details || 
            `Error ${response.status}: ${responseText}`
          )
        }

        // Intentar parsear la respuesta como JSON
        let data
        try {
          console.log("Intentando parsear respuesta como JSON")
          data = JSON.parse(responseText)
          console.log("Datos parseados:", data)
        } catch (e) {
          console.error("Error al parsear JSON:", e)
          throw new Error(`Error al parsear la respuesta: ${responseText}`)
        }
        
        // Validar que la respuesta sea un array
        if (Array.isArray(data)) {
          console.log(`Pedidos obtenidos: ${data.length}`)
          setOrders(data)
          return
        }

        console.error("La respuesta no es un array:", data)
        throw new Error(`Formato de respuesta inválido: ${JSON.stringify(data)}`)

      } catch (err) {
        console.error("Error en fetchOrders:", err)
        setError(err instanceof Error ? err.message : "Error al cargar los pedidos")
      } finally {
        console.log("Finalizando fetchOrders")
        setLoading(false)
      }
    }

    fetchOrders()
  }, [router])

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="marketplace" />

      <main className="flex-1 container mx-auto px-4 pt-2 pb-24">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <Package className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-red-900 mb-2">Error al cargar los pedidos</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => router.push("/marketplace")}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Volver al marketplace
              </button>
            </div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tienes pedidos</h2>
            <p className="text-gray-600 mb-6">¡Explora nuestros planos y haz tu primer pedido!</p>
            <button
              onClick={() => router.push("/marketplace")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explorar planos
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(order.created_at)}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pedido #{order.id}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status === 'completed' ? 'Completado' : 
                         order.status === 'cancelled' ? 'Cancelado' : 'Pendiente'}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ${order.total_price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <div key={item.id} className="p-6 flex items-center gap-4">
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={item.product_image}
                          alt={item.product_name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-gray-900">
                          {item.product_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <button
                    onClick={() => router.push(`/marketplace/orders/${order.id}`)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ver detalles del pedido
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