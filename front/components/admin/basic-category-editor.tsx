"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUploader from "@/components/admin/image-uploader"
import type { AdminBasicCategory } from "@/data/admin-data"

interface BasicCategoryEditorProps {
  category?: AdminBasicCategory
  onSave: (category: AdminBasicCategory) => void
  onCancel: () => void
}

export default function BasicCategoryEditor({ category, onSave, onCancel }: BasicCategoryEditorProps) {
  const [formData, setFormData] = useState<AdminBasicCategory>({
    id: category?.id || "",
    name: category?.name || "",
    nameEs: category?.nameEs || "",
    nameEn: category?.nameEn || "",
    pricePerUnit: category?.pricePerUnit || 0,
    image: category?.image || "",
    maxQuantity: category?.maxQuantity || 5,
    minQuantity: category?.minQuantity || 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerUnit" || name === "maxQuantity" || name === "minQuantity" ? Number(value) : value,
    }))
  }

  const handleImageChange = (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900 mb-6">Editar Categoría Básica: {formData.nameEs}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre en Español</label>
                <input
                  type="text"
                  name="nameEs"
                  value={formData.nameEs}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="Ej: Pisos"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre en Inglés</label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="Ej: Floors"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Precio por Unidad (USD)</label>
                <input
                  type="number"
                  name="pricePerUnit"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Cantidad Mínima</label>
                <input
                  type="number"
                  name="minQuantity"
                  value={formData.minQuantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Cantidad Máxima</label>
                <input
                  type="number"
                  name="maxQuantity"
                  value={formData.maxQuantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                  placeholder="5"
                />
              </div>
            </div>

            {/* COMPONENTE DE SUBIDA DE IMÁGENES */}
            <ImageUploader value={formData.image} onChange={handleImageChange} label={`Imagen de ${formData.nameEs}`} />

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1 neutra-font bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}
