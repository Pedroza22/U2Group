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
  }
  featured: boolean
}

// PALETA DE COLORES DE LA EMPRESA - SOLO AZULES
export const COMPANY_COLORS = {
  PRIMARY_BLUE: "#3B82F6", // Azul principal
  DARK_BLUE: "#1E40AF", // Azul oscuro
  LIGHT_BLUE: "#60A5FA", // Azul claro
  NAVY_BLUE: "#1E3A8A", // Azul marino
  SKY_BLUE: "#0EA5E9", // Azul cielo
}

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
  {
    id: 2,
    name: "DUARTE",
    displayTitle: "DUARTE - Villa Contemporánea",
    color: COMPANY_COLORS.DARK_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Casa Privada",
    services: "Diseño Arquitectónico",
    year: "2024",
    category: "Residencial",
    type: "Villa",
    size: "220m2",
    location: "Barcelona, España",
    status: "In Progress",
    featured: false,
    description: "DUARTE es una villa moderna que combina elegancia y funcionalidad en el corazón de Barcelona.",
    features: [
      "Diseño contemporáneo con líneas limpias",
      "Espacios amplios y luminosos",
      "Integración con jardín privado",
      "Materiales de alta calidad",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 3,
    name: "EDEN",
    displayTitle: "EDEN - Oficinas Corporativas",
    color: COMPANY_COLORS.LIGHT_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Oficina",
    services: "Diseño Arquitectónico",
    year: "2024",
    category: "Corporativo",
    type: "Oficina",
    size: "350m2",
    location: "Valencia, España",
    status: "Completed",
    featured: true,
    description:
      "EDEN redefine el concepto de espacio de trabajo moderno con un enfoque en la productividad y bienestar.",
    features: [
      "Espacios de trabajo colaborativo",
      "Iluminación natural optimizada",
      "Zonas de descanso integradas",
      "Tecnología avanzada incorporada",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 4,
    name: "ETERNA",
    displayTitle: "ETERNA - Hotel Boutique",
    color: COMPANY_COLORS.NAVY_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Hotel",
    services: "Diseño Interior",
    year: "2023",
    category: "Hospitalidad",
    type: "Hotel",
    size: "1200m2",
    location: "Sevilla, España",
    status: "Completed",
    featured: false,
    description: "ETERNA ofrece una experiencia hotelera única que combina lujo y comodidad en el centro de Sevilla.",
    features: ["50 habitaciones de lujo", "Spa y centro de bienestar", "Restaurante gourmet", "Espacios para eventos"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 5,
    name: "HAVEN 45",
    displayTitle: "HAVEN 45 - Centro Deportivo",
    color: COMPANY_COLORS.SKY_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Centro Deportivo",
    services: "Diseño Arquitectónico",
    year: "2023",
    category: "Deportivo",
    type: "Complejo Deportivo",
    size: "800m2",
    location: "Bilbao, España",
    status: "Completed",
    featured: false,
    description: "HAVEN 45 es un complejo deportivo de vanguardia que promueve el bienestar y la actividad física.",
    features: ["Gimnasio completamente equipado", "Piscina olímpica", "Canchas multideportivas", "Áreas de relajación"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 6,
    name: "HOME 94",
    displayTitle: "HOME 94 - Museo Cultural",
    color: COMPANY_COLORS.PRIMARY_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Museo",
    services: "Diseño Arquitectónico",
    year: "2024",
    category: "Cultural",
    type: "Museo",
    size: "600m2",
    location: "Granada, España",
    status: "In Progress",
    featured: true,
    description: "HOME 94 es un museo contemporáneo que celebra el arte y la cultura andaluza.",
    features: [
      "Salas de exposición flexibles",
      "Auditorio para eventos",
      "Biblioteca especializada",
      "Cafetería con terraza",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 7,
    name: "AURUM",
    displayTitle: "AURUM - Villa Mediterránea",
    color: COMPANY_COLORS.DARK_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Casa Privada",
    services: "Diseño de Casa Privada",
    year: "2025",
    category: "Residencial",
    type: "Villa",
    size: "180m2",
    location: "Málaga, España",
    status: "Planning",
    featured: false,
    description: "AURUM es una villa de lujo que combina el estilo mediterráneo con toques modernos.",
    features: ["Vistas panorámicas al mar", "Piscina infinita", "Jardín mediterráneo", "Bodega privada"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 8,
    name: "ZENITH",
    displayTitle: "ZENITH - Apartamento Urbano",
    color: COMPANY_COLORS.LIGHT_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Apartamento",
    services: "Diseño Interior",
    year: "2024",
    category: "Residencial",
    type: "Apartamento",
    size: "95m2",
    location: "Zaragoza, España",
    status: "Completed",
    featured: false,
    description: "ZENITH maximiza el espacio en un apartamento urbano con un diseño inteligente y funcional.",
    features: [
      "Distribución optimizada",
      "Mobiliario integrado",
      "Colores neutros y cálidos",
      "Balcón con vistas urbanas",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 9,
    name: "NOVA",
    displayTitle: "NOVA - Restaurante Gourmet",
    color: COMPANY_COLORS.NAVY_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Restaurante",
    services: "Diseño Interior",
    year: "2023",
    category: "Comercial",
    type: "Restaurante",
    size: "150m2",
    location: "San Sebastián, España",
    status: "Completed",
    featured: false,
    description: "NOVA ofrece una experiencia gastronómica única en un ambiente elegante y acogedor.",
    features: ["Cocina abierta al comedor", "Bar de vinos especializado", "Terraza exterior", "Iluminación ambiental"],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: 10,
    name: "LUMINA",
    displayTitle: "LUMINA - Biblioteca Pública",
    color: COMPANY_COLORS.SKY_BLUE,
    image: "/placeholder.svg?height=400&width=600",
    utilization: "Biblioteca",
    services: "Diseño Arquitectónico",
    year: "2024",
    category: "Público",
    type: "Biblioteca",
    size: "450m2",
    location: "Salamanca, España",
    status: "In Progress",
    featured: true,
    description: "LUMINA es una biblioteca moderna que fomenta el aprendizaje y la investigación.",
    features: [
      "Salas de lectura silenciosa",
      "Espacios de trabajo colaborativo",
      "Archivo digital avanzado",
      "Área infantil especializada",
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
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
  {
    id: 2,
    category: "Architecture",
    date: "Nov 28, 2023",
    readTime: "5 Min Read",
    title: "Sustainable Architecture: Building for the Future",
    excerpt: "Exploring eco-friendly design principles that benefit both environment and inhabitants.",
    content: {
      intro: "Sustainable architecture is no longer a trend—it's a necessity for our planet's future.",
      mainText:
        "Learn how to incorporate green building practices, renewable energy systems, and sustainable materials into your next project.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "María González",
      title: "Sustainable Architecture Specialist",
      bio: "María specializes in eco-friendly design solutions and has led over 30 sustainable building projects.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: true,
  },
  {
    id: 3,
    category: "Interior Design",
    date: "Nov 20, 2023",
    readTime: "6 Min Read",
    title: "Maximizing Small Spaces: Smart Design Solutions",
    excerpt: "Transform cramped areas into functional, beautiful living spaces with these expert tips.",
    content: {
      intro: "Small spaces don't have to feel cramped or cluttered when designed thoughtfully.",
      mainText:
        "Discover innovative storage solutions, multi-functional furniture, and visual tricks that make any space feel larger and more inviting.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Carlos Ruiz",
      title: "Interior Design Expert",
      bio: "Carlos has transformed hundreds of small spaces into functional, stylish homes throughout Spain.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: true,
  },
  {
    id: 4,
    category: "Trends",
    date: "Nov 15, 2023",
    readTime: "4 Min Read",
    title: "2024 Architecture Trends: What's Coming Next",
    excerpt: "Stay ahead of the curve with the latest architectural trends shaping the industry.",
    content: {
      intro:
        "The architectural landscape is constantly evolving, driven by technology, sustainability, and changing lifestyles.",
      mainText: "Explore the key trends that will define architectural design in 2024 and beyond.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Ana Martín",
      title: "Architecture Trend Analyst",
      bio: "Ana researches and analyzes emerging trends in architecture and design for leading publications.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: true,
  },
  {
    id: 5,
    category: "Technology",
    date: "Nov 10, 2023",
    readTime: "8 Min Read",
    title: "Smart Homes: Integrating Technology in Modern Design",
    excerpt: "How to seamlessly blend cutting-edge technology with beautiful architectural design.",
    content: {
      intro: "Smart home technology is revolutionizing how we interact with our living spaces.",
      mainText:
        "Learn how to integrate automation, IoT devices, and smart systems without compromising aesthetic appeal.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "David López",
      title: "Smart Home Integration Specialist",
      bio: "David specializes in integrating advanced technology systems into residential and commercial spaces.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 6,
    category: "Materials",
    date: "Nov 5, 2023",
    readTime: "6 Min Read",
    title: "Choosing the Right Materials for Your Project",
    excerpt: "A comprehensive guide to selecting materials that balance aesthetics, durability, and budget.",
    content: {
      intro: "Material selection can make or break your architectural project.",
      mainText:
        "Understand the properties, costs, and applications of different building materials to make informed decisions.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Elena Fernández",
      title: "Materials Engineer",
      bio: "Elena has extensive experience in material science and sustainable building practices.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 7,
    category: "Lighting",
    date: "Oct 30, 2023",
    readTime: "5 Min Read",
    title: "The Art of Architectural Lighting Design",
    excerpt: "Master the principles of lighting to enhance mood, functionality, and visual appeal.",
    content: {
      intro: "Lighting is often called the soul of architecture—it can transform any space dramatically.",
      mainText:
        "Explore different lighting techniques, from natural light optimization to artificial lighting strategies.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Roberto Silva",
      title: "Lighting Design Consultant",
      bio: "Roberto creates stunning lighting solutions for residential and commercial projects worldwide.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 8,
    category: "Renovation",
    date: "Oct 25, 2023",
    readTime: "7 Min Read",
    title: "Historic Building Renovation: Preserving the Past",
    excerpt: "Balancing historical preservation with modern functionality in renovation projects.",
    content: {
      intro: "Renovating historic buildings requires a delicate balance between preservation and modernization.",
      mainText: "Learn the best practices for maintaining architectural heritage while adding contemporary amenities.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Isabel Torres",
      title: "Historic Preservation Architect",
      bio: "Isabel specializes in the restoration and adaptive reuse of historic buildings throughout Europe.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 9,
    category: "Landscape",
    date: "Oct 20, 2023",
    readTime: "6 Min Read",
    title: "Integrating Landscape with Architecture",
    excerpt: "Creating seamless connections between built environments and natural landscapes.",
    content: {
      intro: "The relationship between architecture and landscape is fundamental to creating harmonious spaces.",
      mainText: "Discover how to design buildings that complement and enhance their natural surroundings.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Miguel Herrera",
      title: "Landscape Architect",
      bio: "Miguel creates integrated landscape and architectural solutions that celebrate the natural environment.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 10,
    category: "Commercial",
    date: "Oct 15, 2023",
    readTime: "8 Min Read",
    title: "Designing Productive Office Spaces",
    excerpt: "How modern office design impacts employee productivity and well-being.",
    content: {
      intro: "The modern workplace is evolving, and so must our approach to office design.",
      mainText:
        "Explore strategies for creating work environments that boost productivity, creativity, and employee satisfaction.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Patricia Vega",
      title: "Workplace Design Specialist",
      bio: "Patricia designs innovative office spaces for leading companies across Spain and Europe.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 11,
    category: "Residential",
    date: "Oct 10, 2023",
    readTime: "5 Min Read",
    title: "Creating Multi-Generational Homes",
    excerpt: "Design solutions for families spanning multiple generations living together.",
    content: {
      intro: "Multi-generational living is becoming increasingly popular, requiring thoughtful design solutions.",
      mainText: "Learn how to create homes that provide privacy and independence while fostering family connection.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Fernando Castro",
      title: "Residential Design Expert",
      bio: "Fernando specializes in creating flexible living spaces that adapt to changing family needs.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 12,
    category: "Urban Planning",
    date: "Oct 5, 2023",
    readTime: "9 Min Read",
    title: "Sustainable Urban Development Strategies",
    excerpt: "Building cities that are environmentally responsible and socially equitable.",
    content: {
      intro: "Urban planning plays a crucial role in creating sustainable, livable cities for the future.",
      mainText:
        "Explore innovative approaches to urban development that prioritize sustainability and community well-being.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Lucía Morales",
      title: "Urban Planning Consultant",
      bio: "Lucía works with municipalities to develop sustainable urban development strategies.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 13,
    category: "Color Theory",
    date: "Sep 30, 2023",
    readTime: "4 Min Read",
    title: "Psychology of Color in Architecture",
    excerpt: "How color choices influence mood, perception, and behavior in built environments.",
    content: {
      intro: "Color is a powerful tool in architecture that affects how people feel and behave in spaces.",
      mainText:
        "Understand the psychological impact of different colors and how to use them effectively in your designs.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Sofía Jiménez",
      title: "Color Psychology Expert",
      bio: "Sofía studies the relationship between color and human psychology in architectural contexts.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 14,
    category: "Accessibility",
    date: "Sep 25, 2023",
    readTime: "7 Min Read",
    title: "Universal Design: Architecture for Everyone",
    excerpt: "Creating inclusive spaces that are accessible and usable by people of all abilities.",
    content: {
      intro:
        "Universal design principles ensure that buildings are accessible to everyone, regardless of age or ability.",
      mainText:
        "Learn how to incorporate accessibility features that enhance usability for all users without compromising aesthetics.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Andrés Ramírez",
      title: "Accessibility Design Consultant",
      bio: "Andrés advocates for inclusive design and helps architects create barrier-free environments.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 15,
    category: "Budget",
    date: "Sep 20, 2023",
    readTime: "6 Min Read",
    title: "Cost-Effective Design Strategies",
    excerpt: "Achieving beautiful architecture on a budget without compromising quality.",
    content: {
      intro: "Great design doesn't always require a massive budget—it requires smart planning and creative solutions.",
      mainText:
        "Discover strategies for maximizing design impact while minimizing costs through material choices, space planning, and construction methods.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Javier Mendoza",
      title: "Cost Management Specialist",
      bio: "Javier helps clients achieve their design goals while staying within budget constraints.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 16,
    category: "Climate",
    date: "Sep 15, 2023",
    readTime: "8 Min Read",
    title: "Climate-Responsive Architecture",
    excerpt: "Designing buildings that respond intelligently to local climate conditions.",
    content: {
      intro:
        "Climate-responsive design creates comfortable, energy-efficient buildings that work with nature rather than against it.",
      mainText:
        "Explore passive design strategies, natural ventilation, and solar orientation techniques for different climate zones.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Carmen Delgado",
      title: "Climate Design Specialist",
      bio: "Carmen designs buildings that respond intelligently to local climate conditions and environmental factors.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 17,
    category: "Innovation",
    date: "Sep 10, 2023",
    readTime: "5 Min Read",
    title: "3D Printing in Architecture: The Future is Now",
    excerpt: "How 3D printing technology is revolutionizing construction and design possibilities.",
    content: {
      intro:
        "3D printing is transforming architecture by enabling new forms, reducing waste, and accelerating construction.",
      mainText:
        "Discover current applications of 3D printing in construction and its potential to reshape the building industry.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Diego Vargas",
      title: "Construction Technology Expert",
      bio: "Diego researches and implements innovative construction technologies including 3D printing and robotics.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 18,
    category: "Wellness",
    date: "Sep 5, 2023",
    readTime: "6 Min Read",
    title: "Biophilic Design: Bringing Nature Indoors",
    excerpt: "The health and wellness benefits of incorporating natural elements in architectural design.",
    content: {
      intro:
        "Biophilic design recognizes our innate connection to nature and incorporates natural elements into built environments.",
      mainText:
        "Learn how plants, natural light, water features, and organic materials can improve occupant health and well-being.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Natalia Romero",
      title: "Wellness Design Consultant",
      bio: "Natalia specializes in creating healthy, nature-inspired environments that promote human well-being.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 19,
    category: "Heritage",
    date: "Aug 30, 2023",
    readTime: "7 Min Read",
    title: "Modern Additions to Historic Buildings",
    excerpt: "Successfully integrating contemporary architecture with historical structures.",
    content: {
      intro:
        "Adding modern elements to historic buildings requires sensitivity, creativity, and deep understanding of architectural heritage.",
      mainText:
        "Explore successful examples of contemporary additions that enhance rather than detract from historic architecture.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Alejandro Peña",
      title: "Heritage Architecture Specialist",
      bio: "Alejandro specializes in the sensitive integration of modern architecture with historic buildings.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
  {
    id: 20,
    category: "Future",
    date: "Aug 25, 2023",
    readTime: "9 Min Read",
    title: "Architecture in 2050: Predictions and Possibilities",
    excerpt: "Exploring how architecture might evolve to meet future challenges and opportunities.",
    content: {
      intro:
        "The architecture of 2050 will be shaped by climate change, technological advancement, and evolving social needs.",
      mainText:
        "Examine emerging trends and technologies that will define the future of architectural design and construction.",
    },
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    author: {
      name: "Raquel Ortega",
      title: "Future Architecture Researcher",
      bio: "Raquel studies emerging trends and technologies that will shape the future of architecture and urban design.",
      image: "/placeholder.svg?height=200&width=200",
    },
    featured: false,
  },
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
