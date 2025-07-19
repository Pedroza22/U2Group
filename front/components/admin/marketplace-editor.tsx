"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ImageUploader from "./image-uploader"
import { type AdminDesignOption, type AdminDesignCategory } from "@/data/admin-data"
import { MarketplaceFilterManager, type MarketplaceFilter, type MarketplaceFilterType } from "@/data/admin-data"
import { getMarketplaceProducts, createMarketplaceProduct, updateMarketplaceProduct, deleteMarketplaceProduct } from "@/lib/api-marketplace";

interface MarketplaceEditorProps {
  categories: AdminDesignCategory[]
  onSave: (categories: AdminDesignCategory[]) => void
}

interface OptionFormState extends Omit<AdminDesignOption, 'id'> {
  id?: string
  sqft?: number
  bedrooms?: number
  bathrooms?: number
  stories?: number
  garage?: number
  isExclusive?: boolean
  architecturalStyle?: string
}

export default function MarketplaceEditor({ categories, onSave }: MarketplaceEditorProps) {
  const [selectedCategory, setSelectedCategory] = useState<AdminDesignCategory | null>(null)
  const [editingOption, setEditingOption] = useState<AdminDesignOption | null>(null)
  const [showOptionEditor, setShowOptionEditor] = useState(false)
  const [formData, setFormData] = useState<OptionFormState>({
    name: "",
    price: 0,
    image: "",
    description: "",
    sqft: 0,
    bedrooms: 1,
    bathrooms: 1,
    stories: 1,
    garage: 1,
    isExclusive: false,
    architecturalStyle: ""
  })

  // Estado para productos/planos
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos desde la API
  const loadProducts = async () => {
    setIsLoading(true);
    const data = await getMarketplaceProducts();
    setProducts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Crear producto
  const handleSaveProduct = async (formData: any) => {
    if (editingOption) {
      await updateMarketplaceProduct(editingOption.id, formData);
    } else {
      await createMarketplaceProduct(formData);
    }
    setShowOptionEditor(false);
    setEditingOption(null);
    await loadProducts();
  };

  // Eliminar producto
  const handleDeleteProduct = async (id: number) => {
    if (confirm("¿Seguro que quieres eliminar este producto/plano?")) {
      await deleteMarketplaceProduct(id);
      await loadProducts();
    }
  };

  // Definir los filtros fijos
  const fixedFilters = [
    { name: "Área (m²)", key: "area", type: "number" },
    { name: "Habitaciones", key: "bedrooms", type: "number" },
    { name: "Baños", key: "bathrooms", type: "number" },
    { name: "Garaje", key: "garage", type: "number" },
    { name: "Precio (USD)", key: "price", type: "number" },
    { name: "Estilo arquitectónico", key: "architecturalStyle", type: "text" },
  ];

  // Manejadores para el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === "price" || name === "sqft" || name === "bedrooms" || name === "bathrooms" || name === "stories" || name === "garage" ? Number(value) : value
      }))
    }
  }

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Aquí deberías manejar la subida de la imagen y obtener la URL
      // Por ahora usamos una URL temporal
      setFormData(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory) return

    const newCategories = [...categories]
    const categoryIndex = newCategories.findIndex(c => c.id === selectedCategory.id)

    if (categoryIndex === -1) return

    if (editingOption) {
      // Editar opción existente
      const optionIndex = newCategories[categoryIndex].options.findIndex(o => o.id === editingOption.id)
      if (optionIndex !== -1) {
        newCategories[categoryIndex].options[optionIndex] = {
          ...formData,
          id: editingOption.id
        } as AdminDesignOption
      }
    } else {
      // Agregar nueva opción
      newCategories[categoryIndex].options.push({
        ...formData,
        id: Date.now().toString() // Generamos un ID temporal
      } as AdminDesignOption)
    }

    onSave(newCategories)
    setShowOptionEditor(false)
    resetForm()
  }

  const handleDeleteOption = (categoryId: string, optionId: string) => {
    const newCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          options: category.options.filter(option => option.id !== optionId)
        }
      }
      return category
    })
    onSave(newCategories)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      image: "",
      description: "",
      sqft: 0,
      bedrooms: 1,
      bathrooms: 1,
      stories: 1,
      garage: 1,
      isExclusive: false,
      architecturalStyle: ""
    })
    setEditingOption(null)
  }

  const handleEditOption = (category: AdminDesignCategory, option: AdminDesignOption) => {
    setSelectedCategory(category)
    setEditingOption(option)
    setFormData({
      name: option.name,
      price: option.price,
      image: option.image || "",
      description: option.description || "",
      sqft: (option as any).sqft || 0,
      bedrooms: (option as any).bedrooms || 1,
      bathrooms: (option as any).bathrooms || 1,
      stories: (option as any).stories || 1,
      garage: (option as any).garage || 1,
      isExclusive: (option as any).isExclusive || false,
      architecturalStyle: (option as any).architecturalStyle || ""
    })
    setShowOptionEditor(true)
  }

  const handleAddOption = (category: AdminDesignCategory) => {
    setSelectedCategory(category)
    resetForm()
    setShowOptionEditor(true)
  }

  return (
    <div className="space-y-6">
      {/* Lista general de productos/planos */}
      <div className="bg-white border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-blue-900">Productos/Planos</h2>
          <Button onClick={() => handleAddOption({ id: "general", name: "General", nameEs: "General", nameEn: "General", options: [] })} size="sm">+ Agregar plano</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">Imagen</th>
                <th className="px-3 py-2 text-left">Descripción</th>
                {fixedFilters.map(f => (
                  <th key={f.key} className="px-3 py-2 text-left">{f.name}</th>
                ))}
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={10} className="text-center text-gray-400 py-4">Cargando...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={10} className="text-center text-gray-400 py-4">No hay productos/planos registrados</td></tr>
              ) : (
                products.map(option => (
                  <tr key={option.id} className="border-b">
                    <td className="px-3 py-2">{option.name}</td>
                    <td className="px-3 py-2">{option.image ? <img src={option.image} alt={option.name} className="w-16 h-12 object-cover rounded" /> : "-"}</td>
                    <td className="px-3 py-2">{option.description || "-"}</td>
                    {fixedFilters.map(f => (
                      <td key={f.key} className="px-3 py-2">{option[f.key] || "-"}</td>
                    ))}
                    <td className="px-3 py-2 flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditOption({ id: "general", name: "General", nameEs: "General", nameEn: "General", options: [] }, option)}>Editar</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(option.id)}>Eliminar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal de edición/creación de producto/plano */}
      {showOptionEditor && (
        <Dialog open={showOptionEditor} onOpenChange={setShowOptionEditor}>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingOption ? "Editar plano" : "Nuevo plano"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={e => { e.preventDefault(); handleSaveProduct(formData); }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Nombre del plano</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Precio (USD)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required min="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm neutra-font-bold text-gray-700 mb-2">Descripción</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={3} />
              </div>
              <div>
                <ImageUploader value={formData.image} onChange={handleImageChange} label="Imagen principal del plano" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fixedFilters.map(f => (
                  <div key={f.key}>
                    <label className="block text-sm neutra-font-bold text-gray-700 mb-2">{f.name}</label>
                    <input
                      type={f.type}
                      name={f.key}
                      value={formData[f.key] || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required={f.key !== "architecturalStyle"}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowOptionEditor(false)} className="flex-1 neutra-font bg-transparent">Cancelar</Button>
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 neutra-font">{editingOption ? "Actualizar" : "Crear"} plano</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 