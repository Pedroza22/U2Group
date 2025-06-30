"use client"

import { useState, useRef, useEffect } from "react"

interface IntroVideoProps {
  onVideoEnd: () => void // CALLBACK CUANDO EL VIDEO TERMINE
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // FUNCIÓN QUE SE EJECUTA CUANDO EL VIDEO TERMINA
    const handleVideoEnd = () => {
      console.log("Video terminado - congelando en último fotograma")
      onVideoEnd() // NOTIFICAR AL COMPONENTE PADRE
    }

    // FUNCIÓN QUE SE EJECUTA CUANDO EL VIDEO SE CARGA
    const handleVideoLoad = () => {
      console.log("Video cargado correctamente")
      setIsVideoLoaded(true)
    }

    // FUNCIÓN QUE SE EJECUTA SI HAY ERROR AL CARGAR EL VIDEO
    const handleVideoError = (e: Event) => {
      console.error("Error cargando video:", e)
      // SI HAY ERROR, SIMULAR QUE EL VIDEO TERMINÓ DESPUÉS DE 3 SEGUNDOS
      setTimeout(() => {
        onVideoEnd()
      }, 3000)
    }

    // AGREGAR EVENT LISTENERS
    video.addEventListener("ended", handleVideoEnd)
    video.addEventListener("loadeddata", handleVideoLoad)
    video.addEventListener("error", handleVideoError)

    // CLEANUP - REMOVER EVENT LISTENERS
    return () => {
      video.removeEventListener("ended", handleVideoEnd)
      video.removeEventListener("loadeddata", handleVideoLoad)
      video.removeEventListener("error", handleVideoError)
    }
  }, [onVideoEnd])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* VIDEO DE INTRO */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        // NO INCLUIR 'loop' - queremos que se reproduzca solo una vez
      >
        <source src="/videos/hero-video.webm" type="video/webm" />
      </video>

      {/* OVERLAY CON TEXTO */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-2xl animate-fade-in">U2 GROUP</h1>
          <p className="text-xl md:text-2xl drop-shadow-lg animate-fade-in-delay">Arquitectura del Futuro</p>
        </div>
      </div>

      {/* ESTILOS PARA ANIMACIONES */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.5s both;
        }
      `}</style>
    </div>
  )
}
