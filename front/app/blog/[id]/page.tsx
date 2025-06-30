"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Heart, Star, Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { useParams } from "next/navigation"
import { AdminDataManager } from "@/data/admin-data"
import { useState, useEffect } from "react"

export default function BlogPostPage() {
  const { t } = useLanguage()
  const params = useParams()
  const blogId = params.id

  // Estado para manejar los datos del blog desde el admin
  const [blogPost, setBlogPost] = useState(null)
  const [relatedBlogs, setRelatedBlogs] = useState([])
  const [latestBlogs, setLatestBlogs] = useState([])

  // Cargar datos del blog cuando el componente se monta
  useEffect(() => {
    const blogs = AdminDataManager.getBlogs()
    const currentBlog = blogs.find((b) => b.id === Number(blogId))

    if (currentBlog) {
      setBlogPost(currentBlog)
      // Blogs relacionados por categoría (excluyendo el actual)
      const related = blogs.filter((b) => b.category === currentBlog.category && b.id !== currentBlog.id).slice(0, 3)
      setRelatedBlogs(related)

      // Últimos blogs publicados (excluyendo el actual)
      const latest = blogs.filter((b) => b.id !== currentBlog.id).slice(0, 4)
      setLatestBlogs(latest)
    }
  }, [blogId])

  // Mostrar loading mientras carga el blog
  if (!blogPost) {
    return <div>Cargando blog...</div>
  }

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* Header de navegación */}
      <Header currentPage="blog" />

      {/* Contenido principal del blog */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna principal - contenido del blog */}
          <div className="lg:col-span-2">
            {/* Encabezado del artículo */}
            <div className="mb-8">
              <p className="text-gray-600 text-center mb-4 neutra-font">{blogPost.excerpt || "(Por llenar)"}</p>

              <h1 className="text-4xl md:text-6xl neutra-font-black text-blue-600 leading-tight mb-6">
                {blogPost.title || "(Por llenar)"}
              </h1>

              {/* Metadatos del artículo */}
              <div className="flex items-center gap-4 mb-8">
                {blogPost.category && (
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm neutra-font">
                    {blogPost.category}
                  </span>
                )}
                <span className="text-gray-500 neutra-font">
                  {blogPost.date && `• ${blogPost.date}`} {blogPost.readTime && `• ${blogPost.readTime}`}
                </span>
              </div>

              {/* Imagen principal del artículo */}
              <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
                <Image
                  src={blogPost.image || "/placeholder.svg"}
                  alt={blogPost.title || "Imagen del blog"}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Contenido del artículo */}
            <div className="prose max-w-none">
              <p className="text-lg text-gray-700 mb-6 neutra-font leading-relaxed">
                {blogPost.content || "(Por llenar)"}
              </p>

              {/* Espacio para contenido adicional que se agregará manualmente */}
              <div className="min-h-[20rem] mb-8 p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-center text-gray-500 neutra-font">(Por llenar - Contenido adicional del artículo)</p>
              </div>
            </div>

            {/* Galería de imágenes adicionales */}
            <div className="my-12">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font">(Por llenar)</span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font">(Por llenar)</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font">(Por llenar)</span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font">(Por llenar)</span>
                  </div>
                </div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font">(Por llenar)</span>
                  </div>
                </div>
              </div>

              {/* Botones de interacción */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-800 hover:bg-gray-700 neutra-font"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Me gusta 0
                </Button>
                <Button
                  variant="outline"
                  className="bg-gray-800 text-white border-gray-800 hover:bg-gray-700 neutra-font"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Favorito 0
                </Button>
              </div>
            </div>

            {/* Información del autor */}
            <div className="bg-gray-50 rounded-lg p-8 my-12">
              <h3 className="text-2xl neutra-font-bold text-gray-900 mb-6">Sobre el Autor</h3>
              <div className="flex gap-6">
                <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-500 neutra-font text-sm">(Por llenar)</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl neutra-font-bold text-gray-900 mb-2">{blogPost.author || "(Por llenar)"}</h4>
                  <p className="text-gray-700 neutra-font leading-relaxed">(Por llenar - Biografía del autor)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar derecho */}
          <div className="lg:col-span-1">
            {/* Últimos blogs publicados */}
            <div className="mb-12">
              <h3 className="text-3xl neutra-font-black text-blue-600 mb-6">Últimos Blogs</h3>
              <div className="space-y-6">
                {latestBlogs.length > 0 ? (
                  latestBlogs.map((blog) => (
                    <div key={blog.id} className="flex gap-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title || "Blog"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1 neutra-font">{blog.date}</p>
                        <Link href={`/blog/${blog.id}`}>
                          <h4 className="text-sm neutra-font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight">
                            {blog.title || "(Por llenar)"}
                          </h4>
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 neutra-font">(Por llenar - No hay blogs disponibles)</div>
                )}
              </div>
            </div>

            {/* Suscripción al newsletter */}
            <div className="bg-gray-800 text-white rounded-lg p-6 mb-8">
              <h3 className="text-xl neutra-font-bold mb-2">Únete al Newsletter</h3>
              <p className="text-gray-300 text-sm mb-4 neutra-font">
                Recibe las últimas noticias y artículos directamente en tu email
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 neutra-font"
                />
                <Button className="w-full bg-white text-gray-800 hover:bg-gray-100 neutra-font">Suscribirse</Button>
              </div>
            </div>

            {/* Compartir artículo */}
            <div className="mb-8">
              <h3 className="text-lg neutra-font-bold text-gray-900 mb-4">Compartir Artículo</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-gray-100 hover:bg-gray-200">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs relacionados */}
        <div className="mt-16">
          <h2 className="text-4xl neutra-font-black text-blue-600 mb-8">Blogs Relacionados</h2>
          {relatedBlogs.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {relatedBlogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title || "Blog relacionado"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="neutra-font-bold text-gray-900 text-lg leading-tight mb-4">
                      {blog.title || "(Por llenar)"}
                    </h3>
                    <Link href={`/blog/${blog.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white neutra-font bg-transparent"
                      >
                        Leer Artículo
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 neutra-font mb-8">
              (Por llenar - No hay blogs relacionados disponibles)
            </div>
          )}

          {/* Botón para ver todos los blogs */}
          <div className="text-center">
            <Link href="/blog">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full neutra-font">
                Ver Todos los Blogs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer del sitio */}
      <Footer />
    </div>
  )
}
