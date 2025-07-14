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
import { getBlogLikeFavoriteCount, toggleBlogLike, toggleBlogFavorite } from "@/lib/api-blogs";
import { Heart, Star } from "lucide-react"
import { BLOG_CATEGORIES, CATEGORY_TRANSLATIONS } from "@/data/blog-categories";
import { useSearchParams } from 'next/navigation'

export default function BlogPage() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();

  // OBTENER TODOS LOS BLOGS DESDE EL BACKEND
  const [allBlogs, setAllBlogs] = useState<AdminBlog[]>([])
  const [likeCounts, setLikeCounts] = useState<{ [blogId: number]: { likes: number; favorites: number } }>({});
  // NUEVO ESTADO PARA EL FILTRO - Inicializar con el valor de la URL o "all"
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/blogs/`);
      setAllBlogs(res.data as AdminBlog[]);
      // Para cada blog, obtener el contador de likes/favoritos
      (res.data as AdminBlog[]).forEach((blog) => {
        getBlogLikeFavoriteCount(blog.id).then(count => {
          setLikeCounts(prev => ({ ...prev, [blog.id]: count }));
        });
      });
      setError("");
    } catch (err) {
      console.error('Error al cargar blogs:', err);
      setError("Error al cargar los blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();

    // Recargar blogs cada 30 segundos
    const interval = setInterval(() => {
      loadBlogs();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Efecto para actualizar la URL cuando cambia la categoría seleccionada
  useEffect(() => {
    const url = new URL(window.location.href);
    if (selectedCategory === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", selectedCategory);
    }
    window.history.pushState({}, '', url);
  }, [selectedCategory]);

  // FUNCIÓN PARA OBTENER COLOR DE CATEGORÍA - SOLO AZULES
  const getCategoryColor = (category: string) => {
    return "bg-blue-600 text-white"
  }

  // FUNCIÓN PARA FILTRAR BLOGS POR CATEGORÍA
  const filteredBlogs: AdminBlog[] =
    selectedCategory === "all" ? allBlogs : allBlogs.filter((blog) => blog.category === selectedCategory)

  // FUNCIÓN PARA DAR LIKE O FAVORITO DESDE LA LANDING
  const handleLike = async (blogId: number) => {
    try {
      const result = await toggleBlogLike(blogId);
      const newCounts = await getBlogLikeFavoriteCount(blogId);
      setLikeCounts(prev => ({ ...prev, [blogId]: newCounts }));
    } catch (error) {
      console.error('Error al dar like:', error);
    }
  };

  const handleFavorite = async (blogId: number) => {
    try {
      const result = await toggleBlogFavorite(blogId);
      const newCounts = await getBlogLikeFavoriteCount(blogId);
      setLikeCounts(prev => ({ ...prev, [blogId]: newCounts }));
    } catch (error) {
      console.error('Error al marcar como favorito:', error);
    }
  };

  // Función para cambiar la categoría
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white neutra-font">
      <Header currentPage="blog" />
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("blogTitle")}</h1>
            <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("blogSubtitle")}</p>
            {error && <p className="text-red-600 mt-4">{error}</p>}
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
              onClick={() => handleCategoryChange("all")}
            >
              {t("viewAllArticles")}
            </Button>
            {BLOG_CATEGORIES.filter((cat, idx, arr) => arr.indexOf(cat) === idx).map((cat) => (
              <Button
                key={cat}
                className={`px-6 py-2 rounded-full neutra-font text-sm shadow-md ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {t(CATEGORY_TRANSLATIONS[cat] || cat)}
              </Button>
            ))}
          </div>
          {loading ? (
            <div className="text-center py-10">Cargando blogs...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 mb-12">
              {filteredBlogs.length === 0 ? (
                <div className="col-span-2 text-center py-10 text-gray-500">
                  No hay blogs disponibles en esta categoría
                </div>
              ) : (
                filteredBlogs.map((blog) => (
                  <Card key={blog.id} className="bg-white border-2 border-blue-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="w-full md:w-1/3 flex items-center justify-center p-6">
                        <Image src={blog.image || (blog.images && blog.images[0]) || "/placeholder.svg"} alt={blog.title} width={150} height={120} className="rounded-xl object-cover border border-blue-100" />
                      </div>
                      <div className="w-full md:w-2/3 p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                            {t(CATEGORY_TRANSLATIONS[blog.category] || blog.category)}
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
                ))
              )}
            </div>
          )}
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      <Footer />
    </div>
  )
}
