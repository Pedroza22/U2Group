"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { AdminDataManager } from "@/data/admin-data"
import { useState, useEffect } from "react"

export default function BlogPage() {
  const { t } = useLanguage()

  // OBTENER TODOS LOS BLOGS DESDE EL ADMINISTRADOR
  const [allBlogs, setAllBlogs] = useState([])
  // NUEVO ESTADO PARA EL FILTRO
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const blogs = AdminDataManager.getBlogs()
    setAllBlogs(blogs)
  }, [])

  // FUNCIÓN PARA OBTENER COLOR DE CATEGORÍA - SOLO AZULES
  const getCategoryColor = (category: string) => {
    return "bg-blue-600 text-white"
  }

  // FUNCIÓN PARA FILTRAR BLOGS POR CATEGORÍA
  const filteredBlogs =
    selectedCategory === "all" ? allBlogs : allBlogs.filter((blog) => blog.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* HEADER */}
      <Header currentPage="blog" />

      {/* HEADER DE LA PÁGINA */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl neutra-font-black text-blue-600 mb-4">{t("blogTitle")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto neutra-font">{t("blogSubtitle")}</p>

            {/* FILTRO DE CATEGORÍAS - NUEVO */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-md text-sm neutra-font transition-colors ${
                    selectedCategory === "all" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory("Tips")}
                  className={`px-4 py-2 rounded-md text-sm neutra-font transition-colors ${
                    selectedCategory === "Tips" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Tips
                </button>
                <button
                  onClick={() => setSelectedCategory("News")}
                  className={`px-4 py-2 rounded-md text-sm neutra-font transition-colors ${
                    selectedCategory === "News" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  News
                </button>
                <button
                  onClick={() => setSelectedCategory("Articles")}
                  className={`px-4 py-2 rounded-md text-sm neutra-font transition-colors ${
                    selectedCategory === "Articles" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Articles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE TODOS LOS BLOGS */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white">
              {/* IMAGEN DEL BLOG */}
              <div className="relative aspect-video">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title || "Blog post"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* ETIQUETA DE CATEGORÍA */}
                {blog.category && (
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)} neutra-font`}
                    >
                      {blog.category}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* METADATA */}
                <div className="mb-3">
                  <span className="text-gray-500 text-sm neutra-font">
                    {blog.date} {blog.readTime && `• ${blog.readTime}`}
                  </span>
                </div>

                {/* TÍTULO */}
                <h3 className="neutra-font-bold text-gray-900 mb-3 text-xl leading-tight min-h-[3rem]">{blog.title}</h3>

                {/* EXCERPT */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 neutra-font min-h-[4rem]">{blog.excerpt}</p>

                {/* CTA */}
                <div className="flex justify-end">
                  <Link href={`/blog/${blog.id}`}>
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
      </div>

      {/* FOOTER - EXACTAMENTE IGUAL AL DE LA PÁGINA PRINCIPAL */}
      <Footer />
    </div>
  )
}
