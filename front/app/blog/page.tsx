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
import axios from "axios";
import { getBlogLikeFavoriteCount, setBlogLikeFavorite } from "@/lib/api-blogs";
import { Heart, Star } from "lucide-react"

export default function BlogPage() {
  const { t, language } = useLanguage(); // Asegurarse de que el componente se re-renderice al cambiar de idioma

  // OBTENER TODOS LOS BLOGS DESDE EL BACKEND
  const [allBlogs, setAllBlogs] = useState<AdminBlog[]>([])
  const [likeCounts, setLikeCounts] = useState<{ [blogId: number]: { likes: number; favorites: number } }>({});
  // NUEVO ESTADO PARA EL FILTRO
  const [selectedCategory, setSelectedCategory] = useState("all")

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

  useEffect(() => {
    axios.get(`${API_URL}/blogs/`).then(res => {
      setAllBlogs(res.data as AdminBlog[]);
      // Para cada blog, obtener el contador de likes/favoritos
      (res.data as AdminBlog[]).forEach((blog) => {
          getBlogLikeFavoriteCount(blog.id).then(count => {
          setLikeCounts(prev => ({ ...prev, [blog.id]: count }));
        });
      });
    });
  }, []);

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

  // FUNCIÓN PARA DAR LIKE O FAVORITO DESDE LA LANDING
  const handleLike = async (blogId: number) => {
    await setBlogLikeFavorite(blogId, true, likeCounts[blogId]?.favorites > 0);
    getBlogLikeFavoriteCount(blogId).then(count => {
      setLikeCounts(prev => ({ ...prev, [blogId]: count }));
    });
  };
  const handleFavorite = async (blogId: number) => {
    await setBlogLikeFavorite(blogId, likeCounts[blogId]?.likes > 0, true);
    getBlogLikeFavoriteCount(blogId).then(count => {
      setLikeCounts(prev => ({ ...prev, [blogId]: count }));
    });
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
                    <Image src={blog.image || (blog.images && blog.images[0]) || "/placeholder.svg"} alt={blog.title} width={150} height={120} className="rounded-xl object-cover border border-blue-100" />
                  </div>
                  <div className="w-full md:w-2/3 p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                        {categoryTranslationMap[blog.category] || blog.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        • {blog.date} • {blog.read_time || blog.readTime}
                      </span>
                      <span className="ml-auto flex items-center gap-2">
                        <button title="Me gusta" onClick={() => handleLike(blog.id)} className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                          <Heart className="w-4 h-4" /> {likeCounts[blog.id]?.likes ?? 0}
                        </button>
                        <button title="Favoritos" onClick={() => handleFavorite(blog.id)} className="flex items-center gap-1 text-yellow-500 hover:text-yellow-600">
                          <Star className="w-4 h-4" /> {likeCounts[blog.id]?.favorites ?? 0}
                        </button>
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight">{blog.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{blog.summary || blog.excerpt || ""}</p>
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
