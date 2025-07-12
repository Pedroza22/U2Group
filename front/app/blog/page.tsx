"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { AdminDataManager, AdminBlog } from "@/data/admin-data"
import { useState, useEffect } from "react"

export default function BlogPage() {
  const { t, language } = useLanguage(); // Asegurarse de que el componente se re-renderice al cambiar de idioma

  // OBTENER TODOS LOS BLOGS DESDE EL ADMINISTRADOR
  const [allBlogs, setAllBlogs] = useState<AdminBlog[]>([])
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
  const filteredBlogs: AdminBlog[] =
    selectedCategory === "all" ? allBlogs : allBlogs.filter((blog) => blog.category === selectedCategory)

  // Mapeo de categorías a claves de traducción (dentro del componente y render)
  const categoryTranslationMap: Record<string, string> = {
    "Diseño Interior": t("interiorDesignCategory"),
    "Sostenibilidad": t("sustainabilityCategory"),
    "Corporativo": t("corporateCategory"),
    "Residencial": t("residentialCategory"),
    // Puedes agregar más categorías aquí si las tienes
    "Interior Design": t("interiorDesignCategory"),
    "Sustainability": t("sustainabilityCategory"),
    "Corporate": t("corporateCategory"),
    "Residential": t("residentialCategory"),
  };

  return (
    <div className="min-h-screen bg-white neutra-font">
      <Header currentPage="blog" />
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("blogTitle")}</h1>
            <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("blogSubtitle")}</p>
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      {/* GRID DE TODOS LOS BLOGS */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          {/* Filtro de categorías */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Button
              className={`px-6 py-2 rounded-full neutra-font text-sm shadow-md ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
              onClick={() => {
                setSelectedCategory("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {t("viewAllArticles")}
            </Button>
            {Object.keys(categoryTranslationMap).filter((cat, idx, arr) => arr.indexOf(cat) === idx).map((cat) => (
              <Button
                key={cat}
                className={`px-6 py-2 rounded-full neutra-font text-sm shadow-md ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {categoryTranslationMap[cat] || cat}
              </Button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            {filteredBlogs.map((blog) => (
              <Card key={blog.id} className="bg-white border-2 border-blue-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/3 flex items-center justify-center p-6">
                    <Image src={blog.images && blog.images[0] ? blog.images[0] : "/placeholder.svg"} alt={blog.title} width={150} height={120} className="rounded-xl object-cover border border-blue-100" />
                  </div>
                  <div className="w-full md:w-2/3 p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {categoryTranslationMap[blog.category] || blog.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        • {blog.date} • {blog.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight">{blog.title}</h3>
                    <Link href={`/blog/${blog.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent shadow-md"
                      >
                        {t("readArticle")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      <Footer />
    </div>
  )
}
