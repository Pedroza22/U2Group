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
import type { AdminBlog } from "@/data/admin-data"
import axios from "axios";
import { getBlogLikeFavorite, setBlogLikeFavorite, getBlogLikeFavoriteCount } from "@/lib/api-blogs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

export default function BlogPostPage() {
  const { t } = useLanguage()
  const params = useParams()
  const blogId = params.id

  // Estado para manejar los datos del blog desde el admin
  const [blogPost, setBlogPost] = useState<AdminBlog | null>(null)
  const [relatedBlogs, setRelatedBlogs] = useState<AdminBlog[]>([])
  const [latestBlogs, setLatestBlogs] = useState<AdminBlog[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Estado para likes/favoritos
  const [likeState, setLikeState] = useState<{ liked: boolean; favorited: boolean } | null>(null);
  const [likeCount, setLikeCount] = useState<{ likes: number; favorites: number }>({ likes: 0, favorites: 0 });
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/blogs/${blogId}/`);
        setBlogPost(res.data as AdminBlog);
        setError("");
      } catch (err: any) {
        setError("No se pudo cargar el blog.");
        setBlogPost(null);
      }
      setLoading(false);
    };
    if (blogId) fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/`);
        const blogs: AdminBlog[] = res.data as AdminBlog[];
        if (blogPost) {
          setRelatedBlogs(blogs.filter((b) => b.category === blogPost.category && b.id !== blogPost.id).slice(0, 3));
          setLatestBlogs(blogs.filter((b) => b.id !== blogPost.id).slice(0, 4));
        }
      } catch {}
    };
    if (blogPost) fetchBlogs();
  }, [blogPost]);

  // Cargar estado de like/favorito y conteo
  useEffect(() => {
    if (blogPost) {
      getBlogLikeFavorite(blogPost.id).then((data) => {
        setLikeState(data ? { liked: data.liked, favorited: data.favorited } : { liked: false, favorited: false });
      });
      getBlogLikeFavoriteCount(blogPost.id).then(setLikeCount);
    }
  }, [blogPost]);

  const handleLike = async () => {
    if (!blogPost || likeLoading) return;
    setLikeLoading(true);
    const newLiked = !(likeState?.liked);
    await setBlogLikeFavorite(blogPost.id, newLiked, likeState?.favorited || false);
    setLikeState((prev) => ({ liked: newLiked, favorited: prev?.favorited ?? false }));
    getBlogLikeFavoriteCount(blogPost.id).then(setLikeCount);
    setLikeLoading(false);
  };
  const handleFavorite = async () => {
    if (!blogPost || likeLoading) return;
    setLikeLoading(true);
    const newFav = !(likeState?.favorited);
    await setBlogLikeFavorite(blogPost.id, likeState?.liked || false, newFav);
    setLikeState((prev) => ({ favorited: newFav, liked: prev?.liked ?? false }));
    getBlogLikeFavoriteCount(blogPost.id).then(setLikeCount);
    setLikeLoading(false);
  };

  if (loading) {
    return <div>Cargando blog...</div>;
  }
  if (error || !blogPost) {
    return <div className="text-red-600">{error || "Blog no encontrado."}</div>;
  }

  // Antes del render principal, define una función para checar si falta algún campo obligatorio
  const isBlogIncomplete = !blogPost.title || !blogPost.summary || !blogPost.content || !blogPost.author || !blogPost.date || !blogPost.category || !blogPost.read_time || !blogPost.image;

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* Header de navegación */}
      <Header currentPage="blog" />

      {/* Contenido principal del blog */}
      {isBlogIncomplete && (
        <div className="container mx-auto px-4 py-2">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p>Este blog está incompleto. Faltan uno o más campos obligatorios. Por favor, edítalo para completarlo.</p>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Columna principal - contenido del blog */}
          <div className="lg:col-span-2">
            {/* Encabezado del artículo */}
            <div className="mb-8">
              <p className="text-gray-600 text-center mb-4 neutra-font">{blogPost.summary || "(Por llenar)"}</p>

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
                  {blogPost.date && `• ${blogPost.date}`} {blogPost.read_time && `• ${blogPost.read_time}`}
                </span>
                <span className="ml-auto flex items-center gap-2">
                  <span title="Me gusta">👍 {likeCount.likes}</span>
                  <span title="Favoritos">⭐ {likeCount.favorites}</span>
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
              {typeof blogPost.content === "string" ? (
                <p className="text-lg text-gray-700 mb-6 neutra-font leading-relaxed">
                  {blogPost.content}
                </p>
              ) : (
                <p className="text-lg text-gray-700 mb-6 neutra-font leading-relaxed">(Por llenar)</p>
              )}

              {/* Galería de imágenes adicionales (oculta si no hay imágenes extra) */}
              {Array.isArray(blogPost.images) && blogPost.images.length > 1 && (
                <div className="my-12">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {blogPost.images.slice(1, 3).map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <Image src={img} alt={`Imagen extra ${idx + 2}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {blogPost.images.slice(3).map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <Image src={img} alt={`Imagen extra ${idx + 4}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botones de interacción (ahora funcionales) */}
            {/* Elimina los botones de interacción (handleLike, handleFavorite) en el render principal */}
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
                          src={blog.images && blog.images[0] ? blog.images[0] : "/placeholder.svg"}
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
                      src={blog.images && blog.images[0] ? blog.images[0] : "/placeholder.svg"}
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
              No hay blogs relacionados disponibles
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
