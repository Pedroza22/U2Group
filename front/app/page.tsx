"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import GoogleMapsWorking from "@/components/google-maps-working"
import IntroVideo from "@/components/intro-video"

// Componente simple de calculadora
function SimpleCalculator() {
  const [area, setArea] = useState(75)
  const PRICE_PER_M2 = 4
  const total = area * PRICE_PER_M2

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="max-w-800px mx-auto p-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Convierte cada metro cuadrado en{" "}
          <span className="text-blue-600 text-5xl md:text-7xl font-black">algo extraordinario.</span>
        </h1>

        <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
          Comienza a construir el espacio de tus sueños desde{" "}
          <span className="text-blue-600 text-3xl md:text-5xl font-black">${total.toLocaleString("en-US")} USD</span>{" "}
          con U2 Group.
        </p>

        <p className="text-lg md:text-xl text-gray-800 mb-8">
          <span className="text-blue-600 text-xl md:text-2xl font-bold">{area} m²</span> · ${PRICE_PER_M2} USD por m²
        </p>

        <div className="mb-8">
          <input
            type="range"
            min={1}
            max={200}
            step={1}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #0D00FF 0%, #0D00FF ${(area / 200) * 100}%, #ddd ${(area / 200) * 100}%, #ddd 100%)`,
            }}
          />
        </div>

        <Link href="/disena">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full">
            Diseña conmigo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #0D00FF;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(13, 0, 255, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #0D00FF;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(13, 0, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log("🏠 HomePage mounted")
    setMounted(true)

    // LIMPIAR SESSIONSTORAGE PARA TESTING - DESCOMENTA ESTA LÍNEA PARA PROBAR
    // sessionStorage.clear()

    // Verificar si se debe mostrar el video
    const hasVisited = sessionStorage.getItem("hasVisited")
    const forceShowVideo = sessionStorage.getItem("showIntroVideo") === "true"

    console.log("📊 Session state:", { hasVisited, forceShowVideo })

    if (forceShowVideo || !hasVisited) {
      console.log("🎬 SHOWING INTRO VIDEO")
      setShowVideo(true)
      setShowMainContent(false)
      sessionStorage.setItem("hasVisited", "true")
      sessionStorage.removeItem("showIntroVideo")
    } else {
      console.log("⏭️ SKIPPING VIDEO - showing main content")
      setShowVideo(false)
      setShowMainContent(true)
    }
  }, [])

  // Función que se ejecuta cuando el video termina
  const handleVideoEnd = () => {
    console.log("🏁 Video ended - showing main content")
    setShowVideo(false)
    setShowMainContent(true)
  }

  // Función para mostrar video desde el logo
  const handleLogoClick = () => {
    console.log("🖱️ Logo clicked - FORCING VIDEO SHOW")
    sessionStorage.setItem("showIntroVideo", "true")
    setShowVideo(true)
    setShowMainContent(false)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Debug info
  console.log("🎯 Current render state:", { showVideo, showMainContent, mounted })

  // Datos de blogs estáticos
  const featuredBlogs = [
    {
      id: "blog1",
      title: "Tendencias en diseño arquitectónico moderno",
      category: "Diseño Interior",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-01-15",
      readTime: "5 min",
    },
    {
      id: "blog2",
      title: "Arquitectura sostenible y eco-friendly",
      category: "Sostenibilidad",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-02-20",
      readTime: "7 min",
    },
    {
      id: "blog3",
      title: "Espacios de trabajo creativos y productivos",
      category: "Corporativo",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-03-10",
      readTime: "6 min",
    },
    {
      id: "blog4",
      title: "Remodelación de casas históricas",
      category: "Residencial",
      image: "/placeholder.svg?height=150&width=200",
      date: "2024-04-05",
      readTime: "8 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-200">
      {/* VIDEO DE INTRO - Pantalla de carga */}
      {showVideo && <IntroVideo onVideoEnd={handleVideoEnd} />}

      {/* CONTENIDO PRINCIPAL */}
      {showMainContent && (
        <>
          {/* HEADER CON LOGO CLICKEABLE */}
          <Header currentPage="inicio" onLogoClick={handleLogoClick} />

          {/* SECCIÓN: WE DESIGN THE FUTURE */}
          <section className="w-full py-16 bg-gray-200">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Título principal centrado */}
              <div className="text-center mb-8">
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">We design the future</h2>
              </div>

              {/* Texto descriptivo centrado */}
              <div className="text-center max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  At U2 Group, architecture is our canvas and creativity our most powerful tool. We are a creative
                  studio that transforms bold ideas into built structures, blending contemporary design with visionary
                  functionality.
                </p>
              </div>

              <div className="text-center max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We don't repeat formulas; we reinvent them. Every project begins with innovation, pushing the
                  boundaries of conventional architecture to create spaces that are not just functional, but
                  transformative and deeply personal.
                </p>
              </div>

              {/* Texto negro y azul centrado */}
              <div className="text-center mb-12">
                <p className="text-xl md:text-2xl text-gray-900 font-medium mb-2">
                  U2 Group doesn't just design spaces.
                </p>
                <p className="text-2xl md:text-3xl text-blue-600 font-bold">we reimagine them.</p>
              </div>

              {/* Frase pequeña centrada */}
              <div className="text-center mb-12">
                <p className="text-sm text-gray-600 italic">"Let's go group good design, take time, build, cost."</p>
              </div>
            </div>

            {/* URBANUNITY TEXTO GIGANTE CON SCROLL - ANCHO COMPLETO */}
            <div className="w-full overflow-hidden whitespace-nowrap mb-12">
              <div className="inline-block text-8xl md:text-9xl lg:text-[12rem] font-black text-blue-600 animate-scroll-continuous">
                URBANUNITY URBANUNITY URBANUNITY URBANUNITY URBANUNITY URBANUNITY URBANUNITY URBANUNITY URBANUNITY
                URBANUNITY URBANUNITY URBANUNITY
              </div>
            </div>

            {/* VIDEO DE INTERIOR - ANCHO COMPLETO - SOLO .webm */}
            <div className="w-full mb-12">
              <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  controls={false}
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                >
                  <source src="/videos/interior-video.webm" type="video/webm" />
                </video>
              </div>
            </div>



            {/* ESTILOS PARA EL SCROLL CONTINUO */}
            <style jsx>{`
              @keyframes scroll-continuous {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .animate-scroll-continuous {
                animation: scroll-continuous 80s linear infinite;
              }
            `}</style>
          </section>

          {/* HERO SECTION ORIGINAL */}
          <section className="w-full py-12 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-blue-600 leading-tight mb-6">
                  U2 Group es una incubadora de ideas arquitectónicas que desafían el status quo.
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Transformamos espacios en experiencias únicas que reflejan tu visión y estilo de vida, combinando
                  innovación, funcionalidad y diseño excepcional.
                </p>
              </div>
            </div>
          </section>

          {/* CALCULADORA */}
          <section className="w-full py-12 bg-gray-200">
            <div className="container mx-auto px-4">
              <SimpleCalculator />
            </div>
          </section>

          {/* PROYECTOS CON GOOGLE MAPS */}
          <section className="w-full py-12 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black text-blue-600 mb-4">U2 Group Projects</h2>
                <p className="text-gray-600 text-lg">
                  Descubre cómo transformamos ideas en realidades arquitectónicas excepcionales.
                </p>
              </div>

              <div className="mb-8">
                <GoogleMapsWorking
                  apiKey="AIzaSyC2NBqGaRtCaiAcFyKw2eB1jrLPD1rBKPA"
                  height="600px"
                  zoom={4}
                  center={{ lat: 10, lng: -40 }}
                />
              </div>

              <div className="text-center">
                <Link href="/proyectos">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Ver Todos los Proyectos
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* BLOGS */}
          <section className="w-full py-12 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Últimas Noticias</h2>
                <p className="text-gray-600 text-lg">
                  Mantente al día con las últimas tendencias en arquitectura y diseño.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {featuredBlogs.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <div className="flex">
                      <div className="w-1/3 relative">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          width={200}
                          height={150}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="w-2/3 p-6">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                            {post.category}
                          </span>
                          <span className="text-gray-500 text-sm ml-2">
                            • {post.date} • {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight">{post.title}</h3>
                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                          >
                            Leer Artículo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Link href="/blog">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Ver Todos los Artículos
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <div className="bg-gray-200">
            <Footer />
          </div>
        </>
      )}
    </div>
  )
}
