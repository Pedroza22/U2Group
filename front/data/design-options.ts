// DATOS MODULARES PARA LA PÁGINA DE DISEÑO
// Mantiene compatibilidad con datos estáticos + sincronización con AdminDataManager

import { AdminDataManager } from "./admin-data"

export interface DesignOption {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

export interface DesignCategory {
  id: string
  name: string
  nameEs: string
  nameEn: string
  options: DesignOption[]
  allowMultiple?: boolean
  required?: boolean
}

export interface BasicCategory {
  id: string
  name: string
  nameEs: string
  nameEn: string
  pricePerUnit: number
  image?: string
  maxQuantity: number
  minQuantity: number
}

// CONFIGURACIÓN DE PRECIOS ESTÁTICOS - MANTENER COMO FALLBACK
export const DESIGN_PRICING = {
  // BASICS
  FLOORS: [
    { id: "1-floor", name: "1 Floor", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "2-floors", name: "2 Floors", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "3-floors", name: "3 Floors", price: 0, image: "/placeholder.svg?height=100&width=100" },
  ],
  ROOMS: [
    { id: "1-room", name: "1 Room", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "2-rooms", name: "2 Rooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "3-rooms", name: "3 Rooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "4-rooms", name: "4 Rooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "5-rooms", name: "5 Rooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
  ],
  BATHROOMS: [
    { id: "1-bath", name: "1 Bathroom", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "2-bath", name: "2 Bathrooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "3-bath", name: "3 Bathrooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "4-bath", name: "4 Bathrooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "5-bath", name: "5 Bathrooms", price: 0, image: "/placeholder.svg?height=100&width=100" },
  ],
  PARKING: [
    { id: "no-parking", name: "No Parking", price: 0, image: "/placeholder.svg?height=100&width=100" },
    { id: "1-parking", name: "1 Parking Space", price: 50, image: "/placeholder.svg?height=100&width=100" },
    { id: "2-parking", name: "2 Parking Spaces", price: 100, image: "/placeholder.svg?height=100&width=100" },
    { id: "3-parking", name: "3 Parking Spaces", price: 150, image: "/placeholder.svg?height=100&width=100" },
  ],

  // ADDITIONS
  ADDITIONS: [
    { id: "storage-room", name: "Storage Room", price: 100, image: "/placeholder.svg?height=100&width=100" },
    { id: "laundry-room", name: "Laundry Room", price: 150, image: "/placeholder.svg?height=100&width=100" },
    { id: "pool", name: "Pool", price: 500, image: "/placeholder.svg?height=100&width=100" },
    { id: "outdoor-kitchen", name: "Outdoor Kitchen", price: 300, image: "/placeholder.svg?height=100&width=100" },
    { id: "walking-closet", name: "Walking Closet", price: 200, image: "/placeholder.svg?height=100&width=100" },
    { id: "office", name: "Office", price: 250, image: "/placeholder.svg?height=100&width=100" },
  ],

  // FAMILY
  FAMILY: [
    {
      id: "children-play-area",
      name: "Children Play Area",
      price: 150,
      image: "/placeholder.svg?height=100&width=100",
    },
    { id: "baby-room", name: "Baby Room", price: 100, image: "/placeholder.svg?height=100&width=100" },
    { id: "space-for-pets", name: "Space for Pets", price: 75, image: "/placeholder.svg?height=100&width=100" },
  ],

  // SUSTAINABILITY
  SUSTAINABILITY: [
    { id: "vegetable-garden", name: "Vegetable Garden", price: 200, image: "/placeholder.svg?height=100&width=100" },
    { id: "green-roof", name: "Green Roof", price: 400, image: "/placeholder.svg?height=100&width=100" },
    { id: "green-wall", name: "Green Wall", price: 300, image: "/placeholder.svg?height=100&width=100" },
    { id: "panoramic-windows", name: "Panoramic Windows", price: 350, image: "/placeholder.svg?height=100&width=100" },
  ],

  // PRODUCTIVITY
  PRODUCTIVITY: [
    { id: "coworking", name: "Coworking Space", price: 300, image: "/placeholder.svg?height=100&width=100" },
    { id: "recording-studio", name: "Recording Studio", price: 500, image: "/placeholder.svg?height=100&width=100" },
    { id: "executive-office", name: "Executive Office", price: 400, image: "/placeholder.svg?height=100&width=100" },
  ],

  // HOBBIES
  HOBBIES: [
    { id: "closed-garage", name: "Closed Garage", price: 200, image: "/placeholder.svg?height=100&width=100" },
    { id: "game-room", name: "Game Room", price: 250, image: "/placeholder.svg?height=100&width=100" },
    { id: "car-wash-area", name: "Car Wash Area", price: 150, image: "/placeholder.svg?height=100&width=100" },
    { id: "space-for-bicycles", name: "Space for Bicycles", price: 50, image: "/placeholder.svg?height=100&width=100" },
    { id: "warehouse-tools", name: "Warehouse / Tools", price: 100, image: "/placeholder.svg?height=100&width=100" },
  ],

  // INTERIOR DESIGN
  INTERIOR_DESIGN: [
    { id: "basic-interior", name: "Basic Interior Design", price: 300, image: "/placeholder.svg?height=100&width=100" },
    {
      id: "premium-interior",
      name: "Premium Interior Design",
      price: 600,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "luxury-interior",
      name: "Luxury Interior Design",
      price: 1000,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],

  // S2 SYSTEMS
  S2_SYSTEMS: [
    { id: "solar-panels", name: "Solar Panels", price: 400, image: "/placeholder.svg?height=100&width=100" },
    { id: "home-automation", name: "Home Automation", price: 350, image: "/placeholder.svg?height=100&width=100" },
    { id: "energy-efficiency", name: "Energy Efficiency", price: 300, image: "/placeholder.svg?height=100&width=100" },
  ],
}

// CATEGORÍAS ESTÁTICAS - MANTENER COMO FALLBACK
const STATIC_DESIGN_CATEGORIES: DesignCategory[] = [
  {
    id: "basics",
    name: "Basics",
    nameEs: "Básicos",
    nameEn: "Basics",
    options: [
      ...DESIGN_PRICING.FLOORS,
      ...DESIGN_PRICING.ROOMS,
      ...DESIGN_PRICING.BATHROOMS,
      ...DESIGN_PRICING.PARKING,
    ],
    required: true,
  },
  {
    id: "additions",
    name: "Additions",
    nameEs: "Adiciones",
    nameEn: "Additions",
    options: DESIGN_PRICING.ADDITIONS,
    allowMultiple: true,
  },
  {
    id: "family",
    name: "Family",
    nameEs: "Familia",
    nameEn: "Family",
    options: DESIGN_PRICING.FAMILY,
    allowMultiple: true,
  },
  {
    id: "sustainability",
    name: "Sustainability",
    nameEs: "Sostenibilidad",
    nameEn: "Sustainability",
    options: DESIGN_PRICING.SUSTAINABILITY,
    allowMultiple: true,
  },
  {
    id: "productivity",
    name: "Productivity",
    nameEs: "Productividad",
    nameEn: "Productivity",
    options: DESIGN_PRICING.PRODUCTIVITY,
    allowMultiple: true,
  },
  {
    id: "hobbies",
    name: "Hobbies",
    nameEs: "Pasatiempos",
    nameEn: "Hobbies",
    options: DESIGN_PRICING.HOBBIES,
    allowMultiple: true,
  },
  {
    id: "interior-design",
    name: "Interior Design",
    nameEs: "Diseño Interior",
    nameEn: "Interior Design",
    options: DESIGN_PRICING.INTERIOR_DESIGN,
  },
  {
    id: "s2-systems",
    name: "S2 Systems",
    nameEs: "Sistemas S2",
    nameEn: "S2 Systems",
    options: DESIGN_PRICING.S2_SYSTEMS,
    allowMultiple: true,
  },
]

// FUNCIÓN PARA OBTENER CATEGORÍAS BÁSICAS
export const getBasicCategories = (): BasicCategory[] => {
  try {
    if (typeof window !== "undefined") {
      const adminCategories = AdminDataManager.getBasicCategories()
      if (adminCategories && adminCategories.length > 0) {
        return adminCategories.map((category) => ({
          id: category.id,
          name: category.name,
          nameEs: category.nameEs,
          nameEn: category.nameEn,
          pricePerUnit: category.pricePerUnit,
          image: category.image,
          maxQuantity: category.maxQuantity,
          minQuantity: category.minQuantity,
        }))
      }
    }
  } catch (error) {
    console.warn("Error loading admin basic categories, using static fallback:", error)
  }

  // Fallback a datos estáticos
  return [
    {
      id: "floors",
      name: "Floors",
      nameEs: "Pisos",
      nameEn: "Floors",
      pricePerUnit: 100,
      image: "/placeholder.svg?height=100&width=100",
      maxQuantity: 5,
      minQuantity: 1,
    },
    {
      id: "rooms",
      name: "Rooms",
      nameEs: "Habitaciones",
      nameEn: "Rooms",
      pricePerUnit: 50,
      image: "/placeholder.svg?height=100&width=100",
      maxQuantity: 8,
      minQuantity: 1,
    },
    {
      id: "bathrooms",
      name: "Bathrooms",
      nameEs: "Baños",
      nameEn: "Bathrooms",
      pricePerUnit: 75,
      image: "/placeholder.svg?height=100&width=100",
      maxQuantity: 6,
      minQuantity: 1,
    },
    {
      id: "parking",
      name: "Parking",
      nameEs: "Parqueaderos",
      nameEn: "Parking",
      pricePerUnit: 50,
      image: "/placeholder.svg?height=100&width=100",
      maxQuantity: 4,
      minQuantity: 0,
    },
  ]
}

// FUNCIÓN PARA OBTENER CATEGORÍAS (SIN BASICS)
export const getDesignCategories = (): DesignCategory[] => {
  try {
    if (typeof window !== "undefined") {
      const adminCategories = AdminDataManager.getDesignOptions()
      if (adminCategories && adminCategories.length > 0) {
        return adminCategories.map((category) => ({
          id: category.id,
          name: category.name,
          nameEs: category.nameEs,
          nameEn: category.nameEn,
          options: category.options.map((option) => ({
            id: option.id,
            name: option.name,
            price: option.price,
            image: option.image,
            description: option.description,
          })),
          allowMultiple: category.allowMultiple,
          required: category.required,
        }))
      }
    }
  } catch (error) {
    console.warn("Error loading admin design options, using static fallback:", error)
  }

  // Fallback a datos estáticos (sin basics)
  return STATIC_DESIGN_CATEGORIES.filter((cat) => cat.id !== "basics")
}

// FUNCIÓN PARA OBTENER OPCIONES POR CATEGORÍA
export const getOptionsByCategory = (categoryId: string): DesignOption[] => {
  const categories = getDesignCategories()
  const category = categories.find((c) => c.id === categoryId)
  return category?.options || []
}

// FUNCIÓN PARA OBTENER UNA OPCIÓN ESPECÍFICA
export const getOptionById = (categoryId: string, optionId: string): DesignOption | null => {
  const options = getOptionsByCategory(categoryId)
  return options.find((option) => option.id === optionId) || null
}

// MANTENER COMPATIBILIDAD CON EL CÓDIGO EXISTENTE
export const DESIGN_CATEGORIES: DesignCategory[] = getDesignCategories()

// PRECIO BASE
export const BASE_PRICE = 400

// FUNCIÓN PARA REFRESCAR DATOS (llamar cuando se actualicen desde admin)
export const refreshDesignCategories = (): DesignCategory[] => {
  return getDesignCategories()
}
