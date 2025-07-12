"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Plus, Trash2 } from "lucide-react"
import { type AdminProject, COMPANY_COLORS } from "@/data/admin-data"
import ImageUploader from "./image-uploader"

interface ProjectEditorProps {
  project?: AdminProject
  onSave: (project: AdminProject) => void
  onCancel: () => void
}

// Ajuste de tipos para el estado local del formulario
interface ProjectFormState extends Omit<AdminProject, 'image' | 'images'> {
  image: string | File;
  images: (string | File)[];
}

export default function ProjectEditor({ project, onSave, onCancel }: ProjectEditorProps) {
  // Estado del formulario - inicializa con datos del proyecto o valores por defecto
  const [formData, setFormData] = useState<ProjectFormState>(
    project
      ? { ...project, image: project.image, images: project.images || [] }
      : {
          id: 0,
          name: "",
          displayTitle: "",
          color: COMPANY_COLORS.PRIMARY_BLUE,
          image: "",
          utilization: "",
          services: "",
          year: new Date().getFullYear().toString(),
          category: "",
          type: "",
          size: "",
          location: "",
          status: "Planning",
          featured: false,
          description: "",
          features: [],
          images: [],
        }
  );

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  // Agregar nueva característica al proyecto
  const handleFeatureAdd = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }))
  }

  // Modificar una característica existente
  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.map((feature, i) => (i === index ? value : feature)) || [],
    }))
  }

  // Eliminar una característica
  const handleFeatureRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || [],
    }))
  }

  // En el ProjectEditor, cuando se selecciona una imagen, guardar el File en el estado
  // Para la imagen principal:
  const handleMainImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file || "" }));
  };
  // Para imágenes extra:
  const handleImageChange = (index: number, file: File | string | null) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.map((img, i) => (i === index ? (file || "") : img)) || [],
    }));
  };

  // Eliminar una imagen
  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }))
  }

  // Agregar nueva imagen adicional
  const handleImageAdd = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }));
  };

  // Enviar el formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Al guardar, pasamos el formData tal cual, el handler superior se encarga de procesar los File
    onSave(formData as any);
  };

  return (
    // Modal overlay que cubre toda la pantalla
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header del modal */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl neutra-font-bold text-gray-900">{project ? "Editar Proyecto" : "Nuevo Proyecto"}</h2>
          <Button variant="outline" onClick={onCancel} size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Formulario principal */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INFORMACIÓN BÁSICA - Nombre y título */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre del Proyecto *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: CENIT"
              />
              <p className="text-xs text-gray-500 mt-1">Este nombre aparece en las tarjetas de proyectos</p>
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Título de la Página</label>
              <input
                type="text"
                name="displayTitle"
                value={formData.displayTitle || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: CENIT - Residencia Moderna"
              />
              <p className="text-xs text-gray-500 mt-1">Título que aparece en la página de detalle (opcional)</p>
            </div>
          </div>

          {/* Color del proyecto */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Color</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              >
                {Object.entries(COMPANY_COLORS).map(([key, value]) => (
                  <option key={key} value={value}>
                    {key.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Utilización y servicios */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Utilización *</label>
              <input
                type="text"
                name="utilization"
                value={formData.utilization}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: Casa Privada"
              />
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Servicios *</label>
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: Diseño Arquitectónico"
              />
            </div>
          </div>

          {/* Año, categoría y tipo */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Año *</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="2024"
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
                placeholder="Ej: Residencial"
              />
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Tipo *</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: Casa Privada"
              />
            </div>
          </div>

          {/* Tamaño, ubicación y estado */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Tamaño *</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: 140m2"
              />
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Ubicación *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                placeholder="Ej: Madrid, España"
              />
            </div>
            <div>
              <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Estado</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* IMAGEN PRINCIPAL - Usa el componente ImageUploader */}
          <div>
            <ImageUploader
              value={formData.image}
              onChange={handleMainImageChange}
              label="Imagen Principal *"
            />
          </div>

          {/* DESCRIPCIÓN DEL PROYECTO */}
          <div>
            <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
              placeholder="Descripción detallada del proyecto..."
            />
          </div>

          {/* CARACTERÍSTICAS DEL PROYECTO */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm neutra-font-bold text-gray-700">Características</label>
              <Button type="button" onClick={handleFeatureAdd} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <div className="space-y-2">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 neutra-font"
                    placeholder="Característica del proyecto"
                  />
                  <Button
                    type="button"
                    onClick={() => handleFeatureRemove(index)}
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

          {/* IMÁGENES ADICIONALES - Grid adaptativo */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm neutra-font-bold text-gray-700">Imágenes Adicionales</label>
              <Button type="button" onClick={handleImageAdd} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Agregar
              </Button>
            </div>
            <p className="text-xs text-gray-500 mb-4">
              Las imágenes se mostrarán en un grid de 2 columnas que se adapta automáticamente
            </p>
            <div className="space-y-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm neutra-font-bold text-gray-700">Imagen {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => handleImageRemove(index)}
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <ImageUploader
                    value={image}
                    onChange={(value) => handleImageChange(index, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* PROYECTO DESTACADO - Checkbox para destacar en homepage */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="text-sm neutra-font-bold text-gray-700">Proyecto Destacado</label>
            <span className="text-xs text-gray-500">(aparecerá en la página principal)</span>
          </div>

          {/* BOTONES DE ACCIÓN */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 neutra-font">
              {project ? "Actualizar Proyecto" : "Crear Proyecto"}
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
