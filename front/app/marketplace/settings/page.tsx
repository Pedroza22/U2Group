"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { User, Mail, Lock, Bell } from "lucide-react"

interface UserData {
  username: string;
  email: string;
}

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login?redirect=/marketplace/settings")
      return
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/auth/user/", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token")
            router.push("/login?redirect=/marketplace/settings")
            return
          }
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al cargar los datos del usuario")
        }

        const data = await response.json()
        setUserData(data)
        setFormData(prev => ({
          ...prev,
          username: data.username,
          email: data.email
        }))
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError(err instanceof Error ? err.message : "Error al cargar los datos del usuario")
      }
    }

    fetchUserData()
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccessMessage("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login?redirect=/marketplace/settings")
        return
      }

      // Solo incluir la contraseña si se está intentando cambiar
      const updateData: any = {
        username: formData.username,
        email: formData.email,
      }

      if (formData.newPassword) {
        if (!formData.currentPassword) {
          throw new Error("Se requiere la contraseña actual para cambiar la contraseña")
        }
        updateData.current_password = formData.currentPassword
        updateData.new_password = formData.newPassword
      }

      const response = await fetch("/api/auth/user/update/", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al actualizar los datos")
      }

      const data = await response.json()
      setSuccessMessage(data.message || "Datos actualizados correctamente")
      
      // Limpiar las contraseñas después de una actualización exitosa
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: ""
      }))

      // Actualizar los datos del usuario en el estado
      if (data.user) {
        setUserData(data.user)
        setFormData(prev => ({
          ...prev,
          username: data.user.username,
          email: data.user.email
        }))
      }
    } catch (err) {
      console.error("Error updating user data:", err)
      setError(err instanceof Error ? err.message : "Error al actualizar los datos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="marketplace" />

      <main className="flex-1 container mx-auto px-4 pt-2 pb-24">
        <div className="py-4">
          <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Perfil */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <User className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Perfil</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Mail className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Email</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>
            </div>

            {/* Contraseña */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-6">
                <Lock className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Contraseña</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña actual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Notificaciones */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Bell className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Notificaciones</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700">Recibir notificaciones por email</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-gray-700">Recibir notificaciones de ofertas</span>
                </label>
              </div>
            </div>
          </form>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 