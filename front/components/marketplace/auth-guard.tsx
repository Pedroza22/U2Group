"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, loading } = useAuth()
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Dar tiempo al AuthProvider para verificar la autenticación
    const timer = setTimeout(() => {
      const verifyAuth = async () => {
        console.log('🔍 AuthGuard: Verificando autenticación');
        console.log('🔑 isAuthenticated:', isAuthenticated);
        
        if (!isAuthenticated) {
          console.log('❌ No autenticado, redirigiendo a login');
          // Si no está autenticado, redirigir a login principal
          router.push('/login?redirect=' + encodeURIComponent(window.location.pathname))
          return
        }

        console.log('✅ Autenticado, mostrando contenido');
        setIsChecking(false)
      }

      verifyAuth()
    }, 1000) // Reducir a 1 segundo ya que AuthProvider es más rápido

    return () => clearTimeout(timer)
  }, [isAuthenticated, router]) // Solo ejecutar cuando cambien estas dependencias

  if (loading || isChecking) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Ya se está redirigiendo
  }

  return <>{children}</>
} 