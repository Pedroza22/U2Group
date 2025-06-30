"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("") // Limpiar error al escribir
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulación de login - aquí iría la lógica real de autenticación
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular delay

      // Credenciales de prueba ( Colocalo mal la primera vez para ver el error )
      if (formData.username === "admin" && formData.password === "u2group2025") {
        localStorage.setItem("u2-admin-token", "authenticated")
        router.push("/admin/dashboard")
      } else {
        setError("Baboso lo colocaste mal ")
      }
    } catch (err) {
      setError("Error de conexión. Inténtalo más tarde.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl bg-white">
        {/* LOGO */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <Image
              src="/images/u2-logo.png"
              alt="U2 Group Logo"
              width={40}
              height={40}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-2xl neutra-font-black text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600 neutra-font">Accede a tu cuenta de administrador</p>
        </div>

        {/* FORMULARIO DE LOGIN */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm neutra-font">
              {error}
            </div>
          )}

          {/* USERNAME */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                placeholder="Ingresa tu usuario"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent neutra-font"
                placeholder="Ingresa tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg neutra-font-bold disabled:opacity-50"
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* FOOTER */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 neutra-font">© 2024 U2 Group. Todos los derechos reservados , PD COLOCA MAL LAS CREDENCIALES PRIMERA VEZ PARA VER EL ERROR.</p>
        </div>

        {/* CREDENCIALES DE PRUEBA */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 neutra-font text-center mb-2">
            <strong>Credenciales de prueba:</strong>
          </p>
          <p className="text-xs text-gray-600 neutra-font text-center">
            Usuario: <code className="bg-gray-200 px-1 rounded">admin</code>
            <br />
            Contraseña: <code className="bg-gray-200 px-1 rounded">u2group2025</code>
          </p>
        </div>
      </Card>
    </div>
  )
}
