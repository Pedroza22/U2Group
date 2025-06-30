"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import PriceCalculator from "@/components/price-calculator"
import IntroVideo from "@/components/intro-video"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { AdminDataManager } from "@/data/admin-data"

export default function HomePage() {
  // Estado para controlar si el video de intro ha terminado
  const [showMainContent, setShowMainContent] = useState(false)

  // Hook de idiomas para las traducciones
  const { t } = useLanguage()

  // Función que se ejecuta cuando el video termina
  const handleVideoEnd = () => {
    console.log("Video terminado - mostrando contenido principal")
    setShowMainContent(true)
  }

  // Prevenir scroll mientras el video está reproduciéndose
  useEffect(() => {
    if (!showMainContent) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    // Limpiar el overflow cuando el componente se desmonte
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showMainContent])

  // Definir el tipo para los blogs destacados
  type BlogPost = {
    id: string | number
    title?: string
    image?: string
    category?: string
    date?: string
    readTime?: string
  }

  // Obtener blogs destacados desde el administrador
  const [featuredBlogs, setFeaturedBlogs] = useState<BlogPost[]>([])

  useEffect(() => {
    // Cargar blogs destacados del admin
    const blogs = AdminDataManager.getFeaturedBlogs(4)
    setFeaturedBlogs(blogs)
  }, [])

  // Función para obtener color de categoría - solo azules de la empresa
  const getCategoryColor = (category: string) => {
    return "bg-blue-600 text-white"
  }

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* VIDEO DE INTRO - Se muestra primero */}
      {!showMainContent && <IntroVideo onVideoEnd={handleVideoEnd} />}

      {/* CONTENIDO PRINCIPAL - Se muestra después del video */}
      {showMainContent && (
        <>
          {/* HEADER - Navegación principal */}
          <Header currentPage="inicio" />

          {/* SECCIÓN HERO - Texto principal de bienvenida */}
          <section className="w-full py-16 md:py-24 bg-gray-100 animate-fade-in-up">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl neutra-font-black text-blue-600 leading-tight mb-8">
                  {t("heroDescription")}
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8 neutra-font">
                  {t("heroText")}
                </p>
                <Button
                  variant="outline"
                  className="border-gray-400 text-gray-700 hover:bg-gray-100 px-8 py-3 text-lg font-medium bg-transparent neutra-font"
                >
                  KNOW MORE
                </Button>
              </div>
            </div>
          </section>

          {/* CALCULADORA - Herramienta para estimar costos */}
          <section className="w-full py-16 bg-gray-100 animate-fade-in-up">
            <div className="container mx-auto px-4">
              <PriceCalculator />
            </div>
          </section>

          {/* PROYECTOS - Muestra nuestro portafolio */}
          <section className="w-full py-16 bg-gray-50 animate-fade-in-up">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-4">{t("projectsTitle")}</h2>
                <p className="text-gray-600 text-lg neutra-font">{t("projectsSubtitle")}</p>
              </div>

              {/* Mapa de ubicaciones de proyectos */}
              <div className="relative bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=800"
                    alt="Mapa mundial de proyectos"
                    width={800}
                    height={400}
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-8 w-full max-w-2xl">
                      <div className="flex flex-col items-center">
                        <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                        <span className="text-sm font-medium neutra-font">Madrid</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                        <span className="text-sm font-medium neutra-font">Barcelona</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <MapPin className="w-6 h-6 text-blue-600 mb-2" />
                        <span className="text-sm font-medium neutra-font">Valencia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón para ver todos los proyectos */}
              <div className="text-center">
                <Link href="/proyectos">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 neutra-font">
                    {t("projectsDescription")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* BLOGS - Artículos y noticias */}
          <section className="w-full py-16 bg-gray-100 animate-fade-in-up">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-4">{t("blogTitle")}</h2>
                <p className="text-gray-600 text-lg neutra-font">{t("blogSubtitle")}</p>
              </div>

              {/* Grid de blogs destacados */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {featuredBlogs.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                    <div className="flex">
                      {/* Imagen del blog */}
                      <div className="w-1/3 relative">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title || "Blog post"}
                          width={200}
                          height={150}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      {/* Contenido del blog */}
                      <div className="w-2/3 p-6">
                        <div className="mb-3">
                          {post.category && (
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)} neutra-font`}
                            >
                              {post.category}
                            </span>
                          )}
                          <span className="text-gray-500 text-sm ml-2 neutra-font">
                            {post.date && `• ${post.date}`} {post.readTime && `• ${post.readTime}`}
                          </span>
                        </div>

                        <h3 className="neutra-font-bold text-gray-900 mb-4 text-lg leading-tight min-h-[3rem]">
                          {post.title}
                        </h3>

                        <Link href={`/blog/${post.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent neutra-font"
                          >
                            {t("readPost")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Botón para ver todos los blogs */}
              <div className="text-center">
                <Link href="/blog">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 neutra-font">
                    {t("readAllBlogs")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* FOOTER - Información de contacto y enlaces */}
          <Footer />
        </>
      )}

      {/* ESTILOS PARA ANIMACIONES - CSS en JS para las transiciones */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
      `}</style>
    </div>
  )
}
