"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Plus, Trash2 } from "lucide-react"
import type { AdminBlog } from "@/data/admin-data"
import ImageUploader from "./image-uploader"
import { BLOG_CATEGORIES } from "@/data/blog-categories";

interface BlogEditorProps {
  blog?: AdminBlog
  onSave: (blog: AdminBlog) => void
  onCancel: () => void
}

// Cambia la definición de BlogFormState para reflejar los nombres reales del backend:
interface BlogFormState {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string | File;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  read_time: string;
}

export default function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<BlogFormState>(
    blog
      ? {
          id: blog.id,
          title: blog.title,
          summary: blog.summary || blog.excerpt || "",
          content: typeof blog.content === "string" ? blog.content : blog.content?.mainText || "",
          image: (blog as any).image || "",
          author: typeof blog.author === "string" ? blog.author : blog.author?.name || "",
          date: blog.date,
          category: blog.category,
          tags: Array.isArray((blog as any).tags) ? (blog as any).tags : [],
          featured: blog.featured,
          read_time: blog.read_time || blog.readTime || "",
        }
      : {
          id: 0,
          title: "",
          summary: "",
          content: "",
          image: "",
          author: "",
          date: new Date().toISOString().split("T")[0],
          category: "",
          tags: [],
          featured: false,
          read_time: "",
        }
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string>("");
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title) newErrors.title = "El título es obligatorio";
    if (!formData.summary) newErrors.summary = "El resumen es obligatorio";
    if (!formData.content) newErrors.content = "El contenido es obligatorio";
    if (!formData.author) newErrors.author = "El autor es obligatorio";
    if (!formData.date) newErrors.date = "La fecha es obligatoria";
    if (!formData.category) newErrors.category = "La categoría es obligatoria";
    if (!formData.read_time) newErrors.read_time = "El tiempo de lectura es obligatorio";
    if (!formData.image) newErrors.image = "La imagen principal es obligatoria";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "category" && value === "custom") {
      setShowCustomCategory(true);
      setFormData((prev) => ({ ...prev, category: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleTagAdd = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), ""],
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.map((tag, i) => (i === index ? value : tag)) || [],
    }));
  };

  const handleTagRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;
    try {
      await onSave(formData as any);
    } catch (err: any) {
      setApiError(err?.response?.data?.detail || "Error al guardar el blog. Verifica los campos.");
    }
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file || "" }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900">{blog ? "Editar Blog" : "Nuevo Blog"}</h2>
          <Button variant="outline" onClick={onCancel} size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
        {apiError && <div className="text-red-600 mb-4">{apiError}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INFORMACIÓN BÁSICA */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Título del Blog *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
              {errors.title && <div className="text-red-600 text-xs mt-1">{errors.title}</div>}
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Autor *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
              {errors.author && <div className="text-red-600 text-xs mt-1">{errors.author}</div>}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Fecha *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
              {errors.date && <div className="text-red-600 text-xs mt-1">{errors.date}</div>}
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Categoría *</label>
              {!showCustomCategory ? (
                <>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font mb-2"
                  >
                    <option value="">Selecciona una categoría</option>
                    {BLOG_CATEGORIES.filter((cat, idx, arr) => arr.indexOf(cat) === idx).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value="custom">Otra categoría...</option>
                  </select>
                </>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Escribe una nueva categoría"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowCustomCategory(false);
                      setFormData(prev => ({ ...prev, category: "" }));
                    }}
                  >
                    Volver a categorías predefinidas
                  </Button>
                </div>
              )}
              {errors.category && <div className="text-red-600 text-xs mt-1">{errors.category}</div>}
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Tiempo de Lectura *</label>
              <input
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleInputChange}
                required
                placeholder="5 min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
              {errors.read_time && <div className="text-red-600 text-xs mt-1">{errors.read_time}</div>}
            </div>
          </div>
          {/* IMAGEN PRINCIPAL */}
          <div>
            <ImageUploader
              value={formData.image}
              onChange={handleImageChange}
              label="Imagen Principal *"
            />
            {errors.image && <div className="text-red-600 text-xs mt-1">{errors.image}</div>}
          </div>
          {/* RESUMEN */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Resumen *</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              placeholder="Breve descripción del artículo..."
            />
            {errors.summary && <div className="text-red-600 text-xs mt-1">{errors.summary}</div>}
          </div>
          {/* CONTENIDO */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Contenido *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              placeholder="Contenido completo del artículo..."
            />
            {errors.content && <div className="text-red-600 text-xs mt-1">{errors.content}</div>}
          </div>
          {/* TAGS */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm neutra-font-bold text-gray-700">Tags</label>
              <Button type="button" onClick={handleTagAdd} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.tags?.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    placeholder="Tag del artículo"
                  />
                  <Button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    size="sm"
                    variant="outline"
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {/* BLOG DESTACADO */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm neutra-font-bold text-gray-700">Blog Destacado</label>
          </div>
          {/* BOTONES */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 neutra-font">
              {blog ? "Actualizar Blog" : "Crear Blog"}
            </Button>
            <Button type="button" onClick={onCancel} variant="outline" className="neutra-font bg-transparent">
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
