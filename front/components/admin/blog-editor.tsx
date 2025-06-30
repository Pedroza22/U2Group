"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Plus, Trash2 } from "lucide-react"
import type { AdminBlog } from "@/data/admin-data"
import ImageUploader from "./image-uploader"

interface BlogEditorProps {
  blog?: AdminBlog
  onSave: (blog: AdminBlog) => void
  onCancel: () => void
}

export default function BlogEditor({ blog, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState<AdminBlog>(
    blog || {
      id: 0,
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
      tags: [],
      featured: false,
      readTime: "5 min",
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleTagAdd = () => {
    setFormData((prev) => ({
      ...prev,
      tags: [...(prev.tags || []), ""],
    }))
  }

  const handleTagChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.map((tag, i) => (i === index ? value : tag)) || [],
    }))
  }

  const handleTagRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((_, i) => i !== index) || [],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900">{blog ? "Editar Blog" : "Nuevo Blog"}</h2>
          <Button variant="outline" onClick={onCancel} size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

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
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Categoría *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Tiempo de Lectura</label>
              <input
                type="text"
                name="readTime"
                value={formData.readTime}
                onChange={handleInputChange}
                placeholder="5 min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              />
            </div>
          </div>

          {/* IMAGEN PRINCIPAL */}
          <div>
            <ImageUploader
              value={formData.image}
              onChange={(value) => setFormData((prev) => ({ ...prev, image: value }))}
              label="Imagen Principal *"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          {/* EXCERPT */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Resumen *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              placeholder="Breve descripción del artículo..."
            />
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
