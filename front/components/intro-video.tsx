"use client"

import { useEffect, useRef, useState } from "react"

interface IntroVideoProps {
  onVideoEnd: () => void
}

export default function IntroVideo({ onVideoEnd }: IntroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoError, setVideoError] = useState<string | null>(null)

  useEffect(() => {
    console.log("🎬 IntroVideo component mounted")
    const video = videoRef.current
    if (!video) {
      console.error("❌ Video ref is null")
      return
    }

    // Bloquear scroll mientras el video se reproduce
    document.body.style.overflow = "hidden"
    console.log("🔒 Scroll blocked")

    // Event listeners
    const handleLoadedData = () => {
      console.log("✅ Video data loaded successfully")
    }

    const handleCanPlay = () => {
      console.log("✅ Video can play - attempting to start")
      playVideo()
    }

    const handleEnded = () => {
      console.log("🏁 Video ended")
      setIsPlaying(false)
      document.body.style.overflow = "unset"
      onVideoEnd()
    }

    const handlePlay = () => {
      console.log("▶️ Video started playing")
      setIsPlaying(true)
    }

    const handlePause = () => {
      console.log("⏸️ Video paused")
      setIsPlaying(false)
    }

    const handleError = (e: any) => {
      console.error("❌ Video error:", e)
      console.error("❌ Video error details:", video.error)
      setVideoError(`Error: ${video.error?.message || "Unknown error"}`)
      setTimeout(() => {
        document.body.style.overflow = "unset"
        onVideoEnd()
      }, 3000)
    }

    const handleLoadStart = () => {
      console.log("🔄 Video load started")
    }

    // Auto-play el video
    const playVideo = async () => {
      console.log("🎯 Attempting to play video...")
      try {
        await video.play()
        console.log("✅ Video play successful")
      } catch (error) {
        console.error("❌ Autoplay failed:", error)
        setTimeout(() => {
          document.body.style.overflow = "unset"
          onVideoEnd()
        }, 3000)
      }
    }

    // Add all event listeners
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)
    video.addEventListener("ended", handleEnded)
    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("error", handleError)
    video.addEventListener("loadstart", handleLoadStart)

    // Try to load the video
    console.log("🔄 Loading video...")
    video.load()

    return () => {
      console.log("🧹 Cleaning up IntroVideo")
      document.body.style.overflow = "unset"
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplay", handleCanPlay)
      video.removeEventListener("ended", handleEnded)
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("error", handleError)
      video.removeEventListener("loadstart", handleLoadStart)
    }
  }, [onVideoEnd])

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video element - SOLO .webm */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        controls={false}
        controlsList="nodownload nofullscreen noremoteplaybook"
        disablePictureInPicture
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        {/* SOLO FORMATO .webm COMO DIJISTE */}
        <source src="/videos/intro-video.webm" type="video/webm" />
        Tu navegador no soporta el elemento de video.
      </video>

      {/* Logo U2 Group */}
      <div className="absolute bottom-8 left-8 z-10">
        <div className="text-white text-2xl font-bold opacity-80">U2 GROUP</div>
      </div>

      {/* Indicador de carga */}
      {!isPlaying && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg"></p>
            <p className="text-sm opacity-70">intro-video.webm</p>
          </div>
        </div>
      )}

      {/* Error display */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div className="text-center text-white">
            <div className="text-red-400 text-xl mb-4">❌ Error de Video</div>
            <p className="text-sm mb-4">{videoError}</p>
            <p className="text-xs opacity-70">Continuando en 3 segundos...</p>
          </div>
        </div>
      )}
    </div>
  )
}
