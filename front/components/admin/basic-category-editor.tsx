"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ImageUploader from "@/components/admin/image-uploader"
import type { AdminBasicCategory } from "@/data/admin-data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function BasicCategoryEditor() {
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<AdminBasicCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<AdminBasicCategory | null>(null)
  const [formData, setFormData] = useState<AdminBasicCategory>({
    id: "",
    name: "",
    nameEs: "",
    nameEn: "",
    pricePerUnit: 0,
    image: "",
    maxQuantity: 5,
    minQuantity: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory) {
      // Actualizar categoría existente
      setCategories(categories.map(c => 
        c.id === selectedCategory.id ? { ...formData, id: selectedCategory.id } : c
      ))
    } else {
      // Crear nueva categoría
      setCategories([...categories, { ...formData, id: Date.now().toString() }])
    }
    handleCloseModal()
  }

  const handleEdit = (category: AdminBasicCategory) => {
    setSelectedCategory(category)
    setFormData(category)
    setIsOpen(true)
  }

  const handleDelete = (categoryId: string) => {
    setCategories(categories.filter(c => c.id !== categoryId))
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setSelectedCategory(null)
    setFormData({
      id: "",
      name: "",
      nameEs: "",
      nameEn: "",
      pricePerUnit: 0,
      image: "",
      maxQuantity: 5,
      minQuantity: 1,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerUnit" || name === "maxQuantity" || name === "minQuantity" ? Number(value) : value,
    }))
  }

  const handleImageChange = (file: File | null) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categorías Básicas</h2>
        <Button onClick={() => setIsOpen(true)}>Agregar Categoría</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(category => (
          <Card key={category.id} className="p-4">
            {category.image && (
              <img 
                src={category.image} 
                alt={category.nameEs} 
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h3 className="text-lg font-semibold">{category.nameEs}</h3>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold">${category.pricePerUnit}/unidad</span>
              <div className="space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEdit(category)}
                >
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Editar Categoría" : "Nueva Categoría"}
            </DialogTitle>
          </DialogHeader>

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

            <ImageUploader 
              value={formData.image} 
              onChange={handleImageChange} 
              label={`Imagen de ${formData.nameEs}`} 
            />

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseModal} className="flex-1 neutra-font bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">
                {selectedCategory ? "Guardar Cambios" : "Crear Categoría"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
