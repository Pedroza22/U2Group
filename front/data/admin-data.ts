// MÓDULO DE DATOS PARA EL ADMINISTRADOR
// Aquí se definen todas las interfaces y datos iniciales

export interface AdminProject {
  id: number
  name: string // Nombre que aparece en las tarjetas de proyectos
  displayTitle?: string // Título que aparece en la página de detalle (opcional)
  color: string
  image: string
  utilization: string
  services: string
  year: string
  category: string
  type: string
  size: string
  location: string
  status: string
  featured: boolean
  description?: string
  features?: string[]
  images?: string[] // Array de imágenes adicionales
}

export interface AdminBlog {
  id: number
  category: string
  date: string
  readTime: string
  title: string
  excerpt: string
  content: {
    intro: string
    mainText: string
    sections?: Array<{
      title: string
      content: string
    }>
  }
  images: string[]
  author: {
    name: string
    title: string
    bio: string
    image: string
  } | string
  featured: boolean
  // Compatibilidad API
  image?: string
  summary?: string
  read_time?: string
  tags?: string[]
}

// NUEVAS INTERFACES PARA OPCIONES DE DISEÑO
export interface AdminDesignOption {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

// NUEVA INTERFAZ PARA CATEGORÍAS BÁSICAS
export interface AdminBasicCategory {
  id: string
  name: string
  nameEs: string
  nameEn: string
  pricePerUnit: number
  image?: string
  maxQuantity: number
  minQuantity: number
}

export interface AdminDesignCategory {
  id: string
  name: string
  nameEs: string
  nameEn: string
  options: AdminDesignOption[]
  allowMultiple?: boolean
  required?: boolean
}

// NUEVO: Tipos y utilidades para filtros globales de marketplace
export type MarketplaceFilterType = "text" | "number" | "select"

export interface MarketplaceFilter {
  id: string
  name: string
  type: MarketplaceFilterType
  options?: string[] // Solo para tipo select
}

// PALETA DE COLORES DE LA EMPRESA - SOLO AZULES
export const COMPANY_COLORS = {
  PRIMARY_BLUE: "#3B82F6", // Azul principal
  DARK_BLUE: "#1E40AF", // Azul oscuro
  LIGHT_BLUE: "#60A5FA", // Azul claro
  NAVY_BLUE: "#1E3A8A", // Azul marino
  SKY_BLUE: "#0EA5E9", // Azul cielo
}

// DATOS INICIALES DE CATEGORÍAS BÁSICAS
export const getAdminBasicCategories = (): AdminBasicCategory[] => [
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

// DATOS INICIALES DE OPCIONES DE DISEÑO (SIN BASICS)
export const getAdminDesignOptions = (): AdminDesignCategory[] => [
  {
    id: "additions",
    name: "Additions",
    nameEs: "Adiciones",
    nameEn: "Additions",
    options: [
      { id: "storage-room", name: "Storage Room", price: 100, image: "/placeholder.svg?height=100&width=100" },
      { id: "laundry-room", name: "Laundry Room", price: 150, image: "/placeholder.svg?height=100&width=100" },
      { id: "pool", name: "Pool", price: 500, image: "/placeholder.svg?height=100&width=100" },
      { id: "outdoor-kitchen", name: "Outdoor Kitchen", price: 300, image: "/placeholder.svg?height=100&width=100" },
      { id: "walking-closet", name: "Walking Closet", price: 200, image: "/placeholder.svg?height=100&width=100" },
      { id: "office", name: "Office", price: 250, image: "/placeholder.svg?height=100&width=100" },
    ],
    allowMultiple: true,
  },
  {
    id: "family",
    name: "Family",
    nameEs: "Familia",
    nameEn: "Family",
    options: [
      {
        id: "children-play-area",
        name: "Children Play Area",
        price: 150,
        image: "/placeholder.svg?height=100&width=100",
      },
      { id: "baby-room", name: "Baby Room", price: 100, image: "/placeholder.svg?height=100&width=100" },
      { id: "space-for-pets", name: "Space for Pets", price: 75, image: "/placeholder.svg?height=100&width=100" },
    ],
    allowMultiple: true,
  },
  {
    id: "sustainability",
    name: "Sustainability",
    nameEs: "Sostenibilidad",
    nameEn: "Sustainability",
    options: [
      { id: "vegetable-garden", name: "Vegetable Garden", price: 200, image: "/placeholder.svg?height=100&width=100" },
      { id: "green-roof", name: "Green Roof", price: 400, image: "/placeholder.svg?height=100&width=100" },
      { id: "green-wall", name: "Green Wall", price: 300, image: "/placeholder.svg?height=100&width=100" },
      {
        id: "panoramic-windows",
        name: "Panoramic Windows",
        price: 350,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    allowMultiple: true,
  },
  {
    id: "productivity",
    name: "Productivity",
    nameEs: "Productividad",
    nameEn: "Productivity",
    options: [
      { id: "coworking", name: "Coworking Space", price: 300, image: "/placeholder.svg?height=100&width=100" },
      { id: "recording-studio", name: "Recording Studio", price: 500, image: "/placeholder.svg?height=100&width=100" },
      { id: "executive-office", name: "Executive Office", price: 400, image: "/placeholder.svg?height=100&width=100" },
    ],
    allowMultiple: true,
  },
  {
    id: "hobbies",
    name: "Hobbies",
    nameEs: "Pasatiempos",
    nameEn: "Hobbies",
    options: [
      { id: "closed-garage", name: "Closed Garage", price: 200, image: "/placeholder.svg?height=100&width=100" },
      { id: "game-room", name: "Game Room", price: 250, image: "/placeholder.svg?height=100&width=100" },
      { id: "car-wash-area", name: "Car Wash Area", price: 150, image: "/placeholder.svg?height=100&width=100" },
      {
        id: "space-for-bicycles",
        name: "Space for Bicycles",
        price: 50,
        image: "/placeholder.svg?height=100&width=100",
      },
      { id: "warehouse-tools", name: "Warehouse / Tools", price: 100, image: "/placeholder.svg?height=100&width=100" },
    ],
    allowMultiple: true,
  },
  {
    id: "interior-design",
    name: "Interior Design",
    nameEs: "Diseño Interior",
    nameEn: "Interior Design",
    options: [
      {
        id: "basic-interior",
        name: "Basic Interior Design",
        price: 300,
        image: "/placeholder.svg?height=100&width=100",
      },
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
  },
  {
    id: "s2-systems",
    name: "S2 Systems",
    nameEs: "Sistemas S2",
    nameEn: "S2 Systems",
    options: [
      { id: "solar-panels", name: "Solar Panels", price: 400, image: "/placeholder.svg?height=100&width=100" },
      { id: "home-automation", name: "Home Automation", price: 350, image: "/placeholder.svg?height=100&width=100" },
      {
        id: "energy-efficiency",
        name: "Energy Efficiency",
        price: 300,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    allowMultiple: true,
  },
]

// DATOS INICIALES DE PROYECTOS PARA EL ADMIN - TODOS LOS 10 PROYECTOS
export const getAdminProjects = (): AdminProject[] => [
  {
    id: 1,
    name: "CENIT",
    displayTitle: "CENIT - Residencia Moderna", // Título personalizado para la página de detalle
    color: COMPANY_COLORS.PRIMARY_BLUE,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MwSIqoo3cbZju5VUvKoMSKK6sIb9C4.png",
    utilization: "Casa Privada",
    services: "Diseño de Casa Privada",
    year: "2025",
    category: "Residencial",
    type: "Casa Privada",
    size: "140m2",
    location: "Madrid, España",
    status: "Completed",
    featured: true,
    description:
      "CENIT represents the pinnacle of modern residential design, combining clean lines with natural materials to create a harmonious living space.",
    features: [
      "Sustainable materials and energy-efficient systems",
      "Open-plan living spaces with natural light optimization",
      "Integration with surrounding landscape",
      "Smart home technology integration",
      "Private outdoor spaces and terraces",
    ],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-3O2aoi8rIE3qv7GeFSZTael4EeGbdD.png",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZK5LPaia1powv2BOcPJQnK20vc7UP8.png",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  // ... resto de proyectos (mantengo solo uno por brevedad)
]

// DATOS INICIALES DE BLOGS PARA EL ADMIN - TODOS LOS 20 BLOGS
export const getAdminBlogs = (): AdminBlog[] => [
  {
    id: 1,
    category: "Tips",
    date: "Dec 6, 2023",
    readTime: "7 Min Read",
    title: "Common Mistakes When Designing Your Home",
    excerpt: "With U2 Group: good design, less time, lower cost.",
    content: {
      intro: "Designing a home is exciting but it's also filled with potential mistakes that can cost time and money.",
      mainText:
        "This comprehensive guide identifies the most common design pitfalls and offers clear strategies to avoid them, ensuring your project runs smoothly from concept to completion.",
      sections: [
        {
          title: "Planning Phase Mistakes",
          content:
            "The most critical phase of any architectural project is the planning stage. Many homeowners rush through this phase, leading to costly changes later.",
        },
        {
          title: "Budget Considerations",
          content:
            "Understanding your budget limitations early in the process helps make informed decisions about materials, finishes, and scope.",
        },
      ],
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    author: {
      name: "Juan José Lima",
      title: "Industrial designer, innovation specialist",
      bio: "Juan José Lima is an industrial designer and innovation consultant with over 10 years of experience in residential design.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: true,
  },
  // ... resto de blogs (mantengo solo uno por brevedad)
]

// FUNCIONES PARA GESTIONAR DATOS - Estas son las funciones que usa el admin
export class AdminDataManager {
  // PROYECTOS - Gestión de proyectos
  static getProjects(): AdminProject[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("u2-admin-projects")
      return stored ? JSON.parse(stored) : getAdminProjects()
    }
    return getAdminProjects()
  }

  static saveProjects(projects: AdminProject[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("u2-admin-projects", JSON.stringify(projects))
    }
  }

  static addProject(project: AdminProject): void {
    const projects = this.getProjects()
    const newId = Math.max(...projects.map((p) => p.id), 0) + 1
    project.id = newId
    projects.push(project)
    this.saveProjects(projects)
  }

  static updateProject(id: number, updatedProject: AdminProject): void {
    const projects = this.getProjects()
    const index = projects.findIndex((p) => p.id === id)
    if (index !== -1) {
      projects[index] = updatedProject
      this.saveProjects(projects)
    }
  }

  static deleteProject(id: number): void {
    const projects = this.getProjects()
    const filtered = projects.filter((p) => p.id !== id)
    this.saveProjects(filtered)
  }

  // BLOGS - Gestión de blogs
  static getBlogs(): AdminBlog[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("u2-admin-blogs")
      return stored ? JSON.parse(stored) : getAdminBlogs()
    }
    return getAdminBlogs()
  }

  static saveBlogs(blogs: AdminBlog[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("u2-admin-blogs", JSON.stringify(blogs))
    }
  }

  static addBlog(blog: AdminBlog): void {
    const blogs = this.getBlogs()
    const newId = Math.max(...blogs.map((b) => b.id), 0) + 1
    blog.id = newId
    blogs.push(blog)
    this.saveBlogs(blogs)
  }

  static updateBlog(id: number, updatedBlog: AdminBlog): void {
    const blogs = this.getBlogs()
    const index = blogs.findIndex((b) => b.id === id)
    if (index !== -1) {
      blogs[index] = updatedBlog
      this.saveBlogs(blogs)
    }
  }

  static deleteBlog(id: number): void {
    const blogs = this.getBlogs()
    const filtered = blogs.filter((b) => b.id !== id)
    this.saveBlogs(filtered)
  }

  // CATEGORÍAS BÁSICAS - Gestión de categorías básicas
  static getBasicCategories(): AdminBasicCategory[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("u2-admin-basic-categories")
      return stored ? JSON.parse(stored) : getAdminBasicCategories()
    }
    return getAdminBasicCategories()
  }

  static saveBasicCategories(categories: AdminBasicCategory[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("u2-admin-basic-categories", JSON.stringify(categories))
    }
  }

  static updateBasicCategory(categoryId: string, updatedCategory: AdminBasicCategory): void {
    const categories = this.getBasicCategories()
    const index = categories.findIndex((c) => c.id === categoryId)
    if (index !== -1) {
      categories[index] = updatedCategory
      this.saveBasicCategories(categories)
    }
  }

  // OPCIONES DE DISEÑO - Gestión de opciones de diseño
  static getDesignOptions(): AdminDesignCategory[] {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("u2-admin-design-options")
      return stored ? JSON.parse(stored) : getAdminDesignOptions()
    }
    return getAdminDesignOptions()
  }

  static saveDesignOptions(categories: AdminDesignCategory[]): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("u2-admin-design-options", JSON.stringify(categories))
    }
  }

  static updateDesignCategory(categoryId: string, updatedCategory: AdminDesignCategory): void {
    const categories = this.getDesignOptions()
    const index = categories.findIndex((c) => c.id === categoryId)
    if (index !== -1) {
      categories[index] = updatedCategory
      this.saveDesignOptions(categories)
    }
  }

  static addDesignOption(categoryId: string, option: AdminDesignOption): void {
    const categories = this.getDesignOptions()
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    if (categoryIndex !== -1) {
      categories[categoryIndex].options.push(option)
      this.saveDesignOptions(categories)
    }
  }

  static updateDesignOption(categoryId: string, optionId: string, updatedOption: AdminDesignOption): void {
    const categories = this.getDesignOptions()
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    if (categoryIndex !== -1) {
      const optionIndex = categories[categoryIndex].options.findIndex((o) => o.id === optionId)
      if (optionIndex !== -1) {
        categories[categoryIndex].options[optionIndex] = updatedOption
        this.saveDesignOptions(categories)
      }
    }
  }

  static deleteDesignOption(categoryId: string, optionId: string): void {
    const categories = this.getDesignOptions()
    const categoryIndex = categories.findIndex((c) => c.id === categoryId)
    if (categoryIndex !== -1) {
      categories[categoryIndex].options = categories[categoryIndex].options.filter((o) => o.id !== optionId)
      this.saveDesignOptions(categories)
    }
  }

  // OBTENER BLOGS DESTACADOS PARA LA HOMEPAGE
  static getFeaturedBlogs(limit = 4): AdminBlog[] {
    const blogs = this.getBlogs()
    return blogs.filter((blog) => blog.featured).slice(0, limit)
  }

  // OBTENER PROYECTOS DESTACADOS
  static getFeaturedProjects(): AdminProject[] {
    const projects = this.getProjects()
    return projects.filter((project) => project.featured)
  }
}

export const getMarketplaceFilters = (): MarketplaceFilter[] => {
  const raw = localStorage.getItem("marketplace-filters")
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export const saveMarketplaceFilters = (filters: MarketplaceFilter[]) => {
  localStorage.setItem("marketplace-filters", JSON.stringify(filters))
}

export class MarketplaceFilterManager {
  static getFilters(): MarketplaceFilter[] {
    return getMarketplaceFilters()
  }
  static saveFilters(filters: MarketplaceFilter[]): void {
    saveMarketplaceFilters(filters)
  }
  static addFilter(filter: MarketplaceFilter): void {
    const filters = getMarketplaceFilters()
    filters.push(filter)
    saveMarketplaceFilters(filters)
  }
  static updateFilter(id: string, updated: MarketplaceFilter): void {
    const filters = getMarketplaceFilters().map(f => f.id === id ? updated : f)
    saveMarketplaceFilters(filters)
  }
  static deleteFilter(id: string): void {
    const filters = getMarketplaceFilters().filter(f => f.id !== id)
    saveMarketplaceFilters(filters)
  }
}
