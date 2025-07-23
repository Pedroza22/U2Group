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

interface OptionFormState {
  name: string
  price: number
  image: string | File
  description: string
  category: string
  style: string
  area_m2: number
  area_ft2: number
  rooms: number
  bathrooms: number
  floors: number
  is_featured: boolean
  is_active: boolean
  // Campos adicionales para la vista de detalle
  width: number
  depth: number
  max_ridge_height: number
  garage_type: string
  garage_area: number
  garage_cars: number
  garage_entry: string
  ceiling_height_lower: number
  ceiling_height_first: number
  foundation_type: string
  porch_front_area: number
  porch_rear_area: number
  optional_lower_level: number
  [key: string]: any // Índice de tipo para permitir acceso dinámico
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
    category: "residential",
    style: "modern",
    area_m2: 0,
    area_ft2: 0,
    rooms: 1,
    bathrooms: 1,
    floors: 1,
    is_featured: false,
    is_active: true,
    // Campos adicionales para la vista de detalle
    width: 0,
    depth: 0,
    max_ridge_height: 0,
    garage_type: "",
    garage_area: 0,
    garage_cars: 0,
    garage_entry: "",
    ceiling_height_lower: 0,
    ceiling_height_first: 0,
    foundation_type: "",
    porch_front_area: 0,
    porch_rear_area: 0,
    optional_lower_level: 0
  })

  // Estado para productos/planos
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar productos desde la API
  const loadProducts = async () => {
    setIsLoading(true);
    try {
    const data = await getMarketplaceProducts();
      // Verificar que data sea un array
      if (Array.isArray(data)) {
    setProducts(data);
      } else {
        console.error('getMarketplaceProducts devolvió algo que no es un array:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProducts([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Crear producto
  const handleSaveProduct = async (formData: any) => {
    console.log('handleSaveProduct - formData a enviar:', formData);
    console.log('handleSaveProduct - editingOption:', editingOption);
    
    // Validar campos requeridos
    const requiredFields = ['name', 'description', 'category', 'style', 'price', 'area_m2'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.error('Campos faltantes:', missingFields);
      alert(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validar que los valores numéricos sean válidos
    const numericFields = ['price', 'area_m2', 'area_ft2', 'rooms', 'bathrooms', 'floors'];
    const invalidNumericFields = numericFields.filter(field => {
      const value = formData[field];
      return value !== undefined && value !== null && (isNaN(Number(value)) || Number(value) < 0);
    });
    
    if (invalidNumericFields.length > 0) {
      console.error('Campos numéricos inválidos:', invalidNumericFields);
      alert(`Campos numéricos inválidos: ${invalidNumericFields.join(', ')}`);
      return;
    }
    
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
    { name: "Área (m²)", key: "area_m2", type: "number" },
    { name: "Área (ft²)", key: "area_ft2", type: "number" },
    { name: "Habitaciones", key: "rooms", type: "number" },
    { name: "Baños", key: "bathrooms", type: "number" },
    { name: "Pisos", key: "floors", type: "number" },
    { name: "Precio (USD)", key: "price", type: "number" },
    { name: "Categoría", key: "category", type: "text" },
    { name: "Estilo", key: "style", type: "text" },
    { name: "Ancho (pies)", key: "width", type: "number" },
    { name: "Profundidad (pies)", key: "depth", type: "number" },
    { name: "Altura Máxima", key: "max_ridge_height", type: "number" },
    { name: "Tipo Garaje", key: "garage_type", type: "text" },
    { name: "Área Garaje", key: "garage_area", type: "number" },
    { name: "Carros Garaje", key: "garage_cars", type: "number" },
    { name: "Entrada Garaje", key: "garage_entry", type: "text" },
    { name: "Altura Techo Inferior", key: "ceiling_height_lower", type: "number" },
    { name: "Altura Techo Primer Nivel", key: "ceiling_height_first", type: "number" },
    { name: "Tipo Fundación", key: "foundation_type", type: "text" },
    { name: "Área Porche Frontal", key: "porch_front_area", type: "number" },
    { name: "Área Porche Trasero", key: "porch_rear_area", type: "number" },
    { name: "Nivel Inferior Opcional", key: "optional_lower_level", type: "number" },
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
        [name]: name === "price" || name === "area_m2" || name === "area_ft2" || name === "rooms" || name === "bathrooms" || name === "floors" || 
                name === "width" || name === "depth" || name === "max_ridge_height" || name === "garage_area" || name === "garage_cars" || 
                name === "ceiling_height_lower" || name === "ceiling_height_first" || name === "porch_front_area" || name === "porch_rear_area" || 
                name === "optional_lower_level" ? Number(value) : value
      }))
    }
  }

  const handleImageChange = (file: File | null) => {
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file  // Guardar el archivo real, no la URL
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
      category: "residential",
      style: "modern",
      area_m2: 0,
      area_ft2: 0,
      rooms: 1,
      bathrooms: 1,
      floors: 1,
      is_featured: false,
      is_active: true,
      // Campos adicionales para la vista de detalle
      width: 0,
      depth: 0,
      max_ridge_height: 0,
      garage_type: "",
      garage_area: 0,
      garage_cars: 0,
      garage_entry: "",
      ceiling_height_lower: 0,
      ceiling_height_first: 0,
      foundation_type: "",
      porch_front_area: 0,
      porch_rear_area: 0,
      optional_lower_level: 0
    })
    setEditingOption(null)
  }

  const handleEditOption = (category: AdminDesignCategory, option: AdminDesignOption) => {
    setSelectedCategory(category)
    setEditingOption(option)
    setFormData({
      name: option.name,
      price: option.price,
      image: (option as any).image || "",
      description: option.description || "",
      category: (option as any).category || "residential",
      style: (option as any).style || "modern",
      area_m2: (option as any).area_m2 || 0,
      area_ft2: (option as any).area_ft2 || 0,
      rooms: (option as any).rooms || 1,
      bathrooms: (option as any).bathrooms || 1,
      floors: (option as any).floors || 1,
      is_featured: (option as any).is_featured || false,
      is_active: (option as any).is_active !== undefined ? (option as any).is_active : true,
      // Campos adicionales para la vista de detalle
      width: (option as any).width || 0,
      depth: (option as any).depth || 0,
      max_ridge_height: (option as any).max_ridge_height || 0,
      garage_type: (option as any).garage_type || "",
      garage_area: (option as any).garage_area || 0,
      garage_cars: (option as any).garage_cars || 0,
      garage_entry: (option as any).garage_entry || "",
      ceiling_height_lower: (option as any).ceiling_height_lower || 0,
      ceiling_height_first: (option as any).ceiling_height_first || 0,
      foundation_type: (option as any).foundation_type || "",
      porch_front_area: (option as any).porch_front_area || 0,
      porch_rear_area: (option as any).porch_rear_area || 0,
      optional_lower_level: (option as any).optional_lower_level || 0
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
                Array.isArray(products) && products.map(option => (
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