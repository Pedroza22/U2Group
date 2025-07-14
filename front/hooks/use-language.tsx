"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 🌐 TODAS LAS TRADUCCIONES EN UN SOLO LUGAR
const translations = {
  es: {
    // NAVEGACIÓN
    inicio: "Inicio",
    proyectos: "Proyectos",
    nosotros: "Nosotros",
    disena: "Diseña",
    blog: "Blog",
    contacto: "Contacto",
    spanish: "Español",
    english: "Inglés",

    // HOME PAGE
    homeTitle: "Arquitectura del Futuro",
    homeSubtitle: "Diseñamos espacios que inspiran y transforman vidas",
    startProject: "Comenzar Proyecto",
    viewProjects: "Ver Proyectos",
    learnMore: "Conocer Más",
    ourServices: "Nuestros Servicios",
    whyChooseUs: "¿Por qué elegirnos?",
    featuredProjects: "Proyectos Destacados",
    latestNews: "Blogs",
    readMore: "Leer Más",
    getStarted: "Comenzar",
    weDesignTheFuture: "Diseñamos el futuro",
    homeDescription1: "En U2 Group, la arquitectura es nuestro lienzo y la creatividad nuestra herramienta más poderosa. Somos un estudio creativo que transforma ideas audaces en estructuras construidas, combinando diseño contemporáneo con funcionalidad visionaria.",
    homeDescription2: "No repetimos fórmulas; las reinventamos. Cada proyecto comienza con innovación, empujando los límites de la arquitectura convencional para crear espacios que no solo son funcionales, sino transformadores y profundamente personales.",
    homeSlogan1: "U2 Group no solo diseña espacios.",
    homeSlogan2: "Los reimaginamos.",
    homeQuote: '"Vamos grupo, buen diseño, toma tiempo, construir, costo."',
    homeHeroTitle: "U2 Group es una incubadora de ideas arquitectónicas que desafían el status quo.",
    homeHeroDescription: "Transformamos espacios en experiencias únicas que reflejan tu visión y estilo de vida, combinando innovación, funcionalidad y diseño excepcional.",
    projectsSectionTitle: "Proyectos de U2 Group",
    projectsSectionDescription: "Descubre cómo transformamos ideas en realidades arquitectónicas excepcionales.",
    viewAllProjects: "Ver Todos los Proyectos",

    // PROYECTOS PAGE
    projectsTitle: "Nuestros Proyectos",
    projectsSubtitle: "Explora nuestra colección de proyectos arquitectónicos únicos",
    moreProjects: "Más Proyectos",
    "Nuestros Destacados": "Nuestros Destacados",
    haveProject: "¿Tienes un proyecto en mente?",
    contactTeam: "Contacta con nuestro equipo de expertos",

    // NOSOTROS PAGE
    aboutTitle: "Sobre Nosotros",
    aboutSubtitle: "Conoce al equipo detrás de los diseños",
    ourMission: "Nuestra Misión",
    ourVision: "Nuestra Visión",
    ourTeam: "Nuestro Equipo",
    weListen: "Escuchamos",
    weListenText: "No tomamos decisiones hasta que tu visión esté clara",
    "What We Do": "Lo Que Hacemos",
    "How We Do": "Cómo Lo Hacemos",
    "Meet the Founders": "Conoce a los Fundadores",
    "We Specialize": "Nos Especializamos",
    "Global Vision": "Visión Global",
    "No Guesswork": "Sin Conjeturas",
    "Real Team": "Equipo Real",
    mission: "Misión",
    vision: "Visión",
    missionDescription: "Creemos que la arquitectura no debe sentirse distante, intimidante o reservada para unos pocos. Debe sentirse como hogar desde el primer boceto hasta el último ladrillo. Por eso creamos espacios que son honestos, humanos y profundamente personales.",
    visionDescription: "Aspiramos a convertirnos en una referencia global para la arquitectura reflexiva, sostenible y profundamente humana, inspirando a las personas a construir espacios que importan, no solo estructuras que existen.",
    whatWeDo: "Qué Hacemos",
    whatWeDoDescription: "Convertimos el diseño arquitectónico en un proceso claro y colaborativo, donde presupuesto, cronogramas y creatividad trabajan juntos.",
    weSpecialize: "Nos Especializamos",
    weSpecializeDescription: "Eso significa que nos enfocamos 100% en lo creativo y en hacer que tu proyecto sea visualmente impresionante, técnicamente preciso y listo para inspirar.",
    globalVision: "Visión Global",
    globalVisionDescription: "Nuestros planos son detallados, profesionales y elaborados para cumplir con estándares internacionales, listos para que tu arquitecto o ingeniero local los adapte a los códigos de tu región.",
    noGuesswork: "Sin Conjeturas",
    noGuessworkDescription: "Sabrás exactamente lo que obtienes: planos, secciones, renders, detalles organizados, pulidos y listos para presentación.",
    realTeam: "Equipo Real",
    realTeamDescription: "Somos humanos, no bots. Puedes hablar con nosotros. Hacer preguntas. Obtener apoyo. Te guiaremos con cuidado desde el primer día.",
    howWeDo: "Cómo Lo Hacemos",
    meetTheFounders: "Conoce a los",
    founders: "Fundadores",
    coFounderArchitect: "Co-Fundadora y Arquitecta",
    coFounderIndustrialDesigner: "Co-Fundador y Diseñador Industrial",
    creativity: "Creatividad",
    creativityTooltip: "Abrazamos la creatividad en todas sus formas, superando los límites del diseño para crear espacios únicos e inspiradores.",
    sustainability: "Sostenibilidad",
    sustainabilityTooltip: "Priorizamos prácticas sostenibles y soluciones ecológicas en cada proyecto que realizamos.",
    quality: "Calidad",
    qualityTooltip: "Mantenemos los más altos estándares de calidad en cada aspecto de nuestro trabajo y entregables.",
    innovation: "Innovación",
    innovationTooltip: "Buscamos constantemente soluciones innovadoras y enfoques de vanguardia para los desafíos arquitectónicos.",
    clientCentric: "Centrado en el Cliente",
    clientCentricTooltip: "Nuestros clientes están en el centro de todo lo que hacemos, asegurando que su visión se haga realidad.",
    integrity: "Integridad",
    integrityTooltip: "Actuamos con honestidad, transparencia y ética en todo momento.",
    collaboration: "Colaboración",
    collaborationTooltip: "Creemos en el poder del trabajo en equipo y las alianzas colaborativas para lograr resultados excepcionales.",
    attentionToDetail: "Atención al Detalle",
    attentionToDetailTooltip: "Cada detalle importa, desde el concepto inicial hasta la ejecución final de tu proyecto.",
    flexibility: "Flexibilidad",
    flexibilityTooltip: "Nos adaptamos a las necesidades y circunstancias cambiantes manteniendo nuestro compromiso con la excelencia.",

    // DISEÑA PAGE
    designTitle: "Diseña tu Espacio",
    designSubtitle: "Crea el hogar de tus sueños con nuestro configurador",
    basics: "Básicos",
    additions: "Adiciones",
    family: "Familia",
    productivity: "Productividad",
    hobbies: "Pasatiempos",
    interiorDesign: "Diseño Interior",
    s2Systems: "Sistemas S2",
    getYourQuote: "Obtén tu Cotización",
    designCost: "Costo del Diseño",
    next: "Siguiente",
    back: "Atrás",
    chooseThe: "Elige los",
    price: "Precio",
    interestedIn: "Estás interesado en",
    architecturalDesign: "Diseño Arquitectónico",
    designSummary: "RESUMEN DE DISEÑO",
    projectCode: "Código de Proyecto",
    readyToStart: "¿Listo para comenzar tu proyecto?",
    contactUs: "Contáctanos",
    scheduleConsultation: "Agenda una Consulta",
    bookMeeting: "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle",

    // BLOG PAGE
    blogTitle: "Blogs",
    blogSubtitle: "Mantente al día con las últimas tendencias en arquitectura y diseño",
    readPost: "Leer Artículo",
    all: "Todos",
    tips: "Tips",
    news: "Blogs",
    articles: "Artículos",
    interiorDesignCategory: "Diseño Interior",
    sustainabilityCategory: "Sostenibilidad",
    corporateCategory: "Corporativo",
    residentialCategory: "Residencial",
    viewAllArticles: "Ver Todos los Artículos",

    // CONTACTO PAGE
    contactTitle: "Contáctanos",
    contactSubtitle: "Estamos aquí para ayudarte a convertir tu visión en realidad. Cuéntanos sobre tu proyecto.",
    getInTouch: "Ponte en Contacto",
    office: "Oficina",
    moreThan4Years: "Más de 4 años de experiencia",
    customDesigns: "Diseños personalizados y únicos",
    professionalTeam: "Equipo profesional y dedicado",
    response24h: "Respuesta en 24 horas",
    contactInfo: "Información de Contacto",
    fillForm: "Completa este formulario y nuestro equipo te contactará en 24 horas para discutir tu proyecto.",
    firstName: "Nombre",
    lastName: "Apellido",
    firstNamePlaceholder: "Juan",
    lastNamePlaceholder: "Pérez",
    emailAddress: "Correo Electrónico",
    emailPlaceholder: "juan@ejemplo.com",
    phoneNumber: "Número de Teléfono",
    phonePlaceholder: "+57 300 1234567",
    projectLocation: "Ubicación del Proyecto",
    projectLocationPlaceholder: "Ciudad, País",
    projectTimeline: "Cronograma del Proyecto",
    selectTimeline: "Seleccionar cronograma",
    asap: "Lo antes posible",
    within3Months: "Dentro de 3 meses",
    within6Months: "Dentro de 6 meses",
    within1Year: "Dentro de 1 año",
    justPlanning: "Solo planeando",
    additionalComments: "Comentarios Adicionales",
    commentsPlaceholder: "Cuéntanos más sobre tu proyecto...",
    sendMessage: "Enviar Mensaje",
    submitForm: "Al enviar este formulario, aceptas nuestros Términos de Servicio y Política de Privacidad.",
    name: "Nombre",
    email: "Email",
    message: "Mensaje",
    send: "Enviar",
    phone: "Teléfono",
    address: "Dirección",
    followUs: "Síguenos",

    // FOOTER
    services: "Servicios",
    company: "Empresa",
    contact: "Contacto",
    allRightsReserved: "Todos los derechos reservados",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",

    // CATEGORÍAS BÁSICAS
    floors: "Pisos",
    rooms: "Habitaciones",
    bathrooms: "Baños",
    parking: "Parqueaderos",

    // GENERAL
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    view: "Ver",
    close: "Cerrar",
    open: "Abrir",
    yes: "Sí",
    no: "No",

    // NOSOTROS PAGE - TÍTULOS Y DESCRIPCIONES
    heroTitle: "Somos más que arquitectos, somos creadores de experiencias",
    weListenDescription: "No tomamos decisiones hasta que tu visión esté clara.",
    weCreateConcept: "Creamos el concepto",
    weCreateConceptDescription:
      "Aquí es donde comienza la magia: combinamos función, estética y emoción en un concepto único. Cada detalle surge de tus necesidades reales. Sin plantillas, solo propósito.",
    youVisualize3D: "Visualizas en 3D",
    youVisualize3DDescription:
      "Con nuestros renders hiperrealistas, caminarás y sentirás tu hogar antes de que se coloque un solo ladrillo. Así, tomas decisiones con claridad y confianza.",
    weBuildWithYou: "Lo construimos contigo",
    weBuildWithYouDescription:
      "Desde los planos hasta los acabados, eres parte de cada paso. Te guiamos, te mantenemos informado y caminamos contigo. Tu hogar no se construye solo, se construye contigo.",
    startNow: "COMENZAR AHORA",
    turnEverySquareMeter: "Convierte cada metro cuadrado en",
    somethingExtraordinary: "algo extraordinario.",
    startBuildingYourDreamSpaceStartingFrom: "Comienza a construir el espacio de tus sueños desde",
    withU2Group: "con U2 Group.",
    usdPerM2: "USD por m²",
    designWithMe: "Diseña conmigo",
    aboutUs: "Nosotros",
    adminPanel: "Panel Admin",
    developedBy: "Desarrollado por: Jpedroza & Jaraagb Developers inc.",
    // CALCULADORA DE PRECIOS
    calculatorTitle1: "Convierte cada metro cuadrado en",
    calculatorTitle2: "algo extraordinario.",
    calculatorSubtitle1: "Comienza a construir el espacio de tus sueños desde",
    calculatorSubtitle2: "con U2 Group.",
    calculatorPerM2: "por m²",
    calculatorButton: "Diseña conmigo",
    // NOTICIAS/BLOG
    newsTitle: "Blogs",
    newsSubtitle: "Mantente al día con las últimas tendencias en arquitectura y diseño.",
    readArticle: "Leer Artículo",
    // Las categorías ya existen: interiorDesignCategory, sustainabilityCategory, corporateCategory, residentialCategory
    // Botón de ver todos los artículos ya existe: viewAllArticles
    consulting: "Consultoría",
  },
  en: {
    // NAVIGATION
    inicio: "Home",
    proyectos: "Projects",
    nosotros: "About Us",
    disena: "Design",
    blog: "Blog",
    contacto: "Contact",
    spanish: "Español",
    english: "English",

    // HOME PAGE
    homeTitle: "Architecture of the Future",
    homeSubtitle: "We design spaces that inspire and transform lives",
    startProject: "Start Project",
    viewProjects: "View Projects",
    learnMore: "Learn More",
    ourServices: "Our Services",
    whyChooseUs: "Why Choose Us?",
    featuredProjects: "Featured Projects",
    latestNews: "Blogs",
    readMore: "Read More",
    getStarted: "Get Started",
    weDesignTheFuture: "We design the future",
    homeDescription1: "At U2 Group, architecture is our canvas and creativity our most powerful tool. We are a creative studio that transforms bold ideas into built structures, blending contemporary design with visionary functionality.",
    homeDescription2: "We don't repeat formulas; we reinvent them. Every project begins with innovation, pushing the boundaries of conventional architecture to create spaces that are not just functional, but transformative and deeply personal.",
    homeSlogan1: "U2 Group doesn't just design spaces.",
    homeSlogan2: "We reimagine them.",
    homeQuote: '"Let\'s go group good design, take time, build, cost."',
    homeHeroTitle: "U2 Group is an incubator of architectural ideas that challenge the status quo.",
    homeHeroDescription: "We transform spaces into unique experiences that reflect your vision and lifestyle, combining innovation, functionality, and exceptional design.",
    projectsSectionTitle: "U2 Group Projects",
    projectsSectionDescription: "Discover how we turn ideas into exceptional architectural realities.",
    viewAllProjects: "View All Projects",

    // PROJECTS PAGE
    projectsTitle: "Our Projects",
    projectsSubtitle: "Explore our collection of unique architectural projects",
    moreProjects: "More Projects",
    "Nuestros Destacados": "Our Featured Projects",
    haveProject: "Have a project in mind?",
    contactTeam: "Contact our team of experts",

    // ABOUT PAGE
    aboutTitle: "About Us",
    aboutSubtitle: "Meet the team behind the designs",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    ourTeam: "Our Team",
    weListen: "We Listen",
    weListenText: "We don't make decisions until your vision is clear",
    "What We Do": "What We Do",
    "How We Do": "How We Do",
    "Meet the Founders": "Meet the Founders",
    "We Specialize": "We Specialize",
    "Global Vision": "Global Vision",
    "No Guesswork": "No Guesswork",
    "Real Team": "Real Team",
    mission: "Mission",
    vision: "Vision",
    missionDescription: "We believe that architecture should not feel distant, intimidating or reserved for a few. It should feel like home from the first sketch to the last brick. That's why we create spaces that are honest, human and deeply personal.",
    visionDescription: "We aim to become a global reference for architecture that's thoughtful, sustainable, and deeply human inspiring people to build spaces that matter, not just structures that exist.",
    whatWeDo: "What We Do",
    whatWeDoDescription: "We turn architectural design into a clear and collaborative process, where budget, schedules and creativity work together.",
    weSpecialize: "We Specialize",
    weSpecializeDescription: "That means we focus 100% on the creative and making your project visually stunning, technically precise and ready to inspire.",
    globalVision: "Global Vision",
    globalVisionDescription: "Our plans are detailed, professional and crafted to meet international standards, ready for your local architect or engineer to adapt to your region's codes.",
    noGuesswork: "No Guesswork",
    noGuessworkDescription: "You'll know exactly what you get: plans, sections, renders, details organized, polished and ready for presentation.",
    realTeam: "Real Team",
    realTeamDescription: "We are humans, not bots. You can talk to us. Ask questions. Get support. We'll guide you carefully from day one.",
    howWeDo: "How We Do",
    meetTheFounders: "Meet the",
    founders: "Founders",
    coFounderArchitect: "Co-Founder & Architect",
    coFounderIndustrialDesigner: "Co-Founder & Industrial Designer",
    creativity: "Creativity",
    creativityTooltip: "We embrace creativity in all its forms, pushing the boundaries of design to craft unique and inspiring spaces.",
    sustainability: "Sustainability",
    sustainabilityTooltip: "We prioritize sustainable practices and eco-friendly solutions in every project we undertake.",
    quality: "Quality",
    qualityTooltip: "We maintain the highest standards of quality in every aspect of our work and deliverables.",
    innovation: "Innovation",
    innovationTooltip: "We constantly seek innovative solutions and cutting-edge approaches to architectural challenges.",
    clientCentric: "Client Centric",
    clientCentricTooltip: "Our clients are at the heart of everything we do, ensuring their vision becomes reality.",
    integrity: "Integrity",
    integrityTooltip: "We conduct our business with honesty, transparency, and ethical practices at all times.",
    collaboration: "Collaboration",
    collaborationTooltip: "We believe in the power of teamwork and collaborative partnerships to achieve exceptional results.",
    attentionToDetail: "Attention to Detail",
    attentionToDetailTooltip: "Every detail matters to us, from the initial concept to the final execution of your project.",
    flexibility: "Flexibility",
    flexibilityTooltip: "We adapt to changing needs and circumstances while maintaining our commitment to excellence.",

    // DESIGN PAGE
    designTitle: "Design Your Space",
    designSubtitle: "Create your dream home with our configurator",
    basics: "Basics",
    additions: "Additions",
    family: "Family",
    productivity: "Productivity",
    hobbies: "Hobbies",
    interiorDesign: "Interior Design",
    s2Systems: "S2 Systems",
    getYourQuote: "Get Your Quote",
    designCost: "Design Cost",
    next: "Next",
    back: "Back",
    chooseThe: "Choose the",
    price: "Price",
    interestedIn: "You are interested in",
    architecturalDesign: "Architectural Design",
    designSummary: "DESIGN SUMMARY",
    projectCode: "Project Code",
    readyToStart: "Ready to start your project?",
    contactUs: "Contact Us",
    scheduleConsultation: "Schedule a Consultation",
    bookMeeting: "Book a meeting with our team to discuss your project in detail",

    // BLOG PAGE
    blogTitle: "Blogs",
    blogSubtitle: "Stay up to date with the latest trends in architecture and design",
    readPost: "Read Article",
    all: "All",
    tips: "Tips",
    news: "Blogs",
    articles: "Articles",
    interiorDesignCategory: "Interior Design",
    sustainabilityCategory: "Sustainability",
    corporateCategory: "Corporate",
    residentialCategory: "Residential",
    viewAllArticles: "View All Articles",

    // CONTACT PAGE
    contactTitle: "Contact Us",
    contactSubtitle: "We are here to help you turn your vision into reality. Tell us about your project.",
    getInTouch: "Get in Touch",
    office: "Office",
    moreThan4Years: "More than 4 years of experience",
    customDesigns: "Custom and unique designs",
    professionalTeam: "Professional and dedicated team",
    response24h: "Response within 24 hours",
    contactInfo: "Contact Information",
    fillForm: "Fill out this form and our team will contact you within 24 hours to discuss your project.",
    firstName: "First Name",
    lastName: "Last Name",
    firstNamePlaceholder: "John",
    lastNamePlaceholder: "Doe",
    emailAddress: "Email Address",
    emailPlaceholder: "john@example.com",
    phoneNumber: "Phone Number",
    phonePlaceholder: "+1 (555) 123-4567",
    projectLocation: "Project Location",
    projectLocationPlaceholder: "City, Country",
    projectTimeline: "Project Timeline",
    selectTimeline: "Select timeline",
    asap: "As soon as possible",
    within3Months: "Within 3 Months",
    within6Months: "Within 6 Months",
    within1Year: "Within 1 Year",
    justPlanning: "Just Planning",
    additionalComments: "Additional Comments",
    commentsPlaceholder: "Tell us more about your project...",
    sendMessage: "Send Message",
    submitForm: "By submitting this form, you agree to our Terms of Service and Privacy Policy.",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    phone: "Phone",
    address: "Address",
    followUs: "Follow Us",

    // FOOTER
    services: "Services",
    company: "Company",
    contact: "Contact",
    allRightsReserved: "All rights reserved",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // BASIC CATEGORIES
    floors: "Floors",
    rooms: "Rooms",
    bathrooms: "Bathrooms",
    parking: "Parking",

    // GENERAL
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    close: "Close",
    open: "Open",
    yes: "Yes",
    no: "No",

    // ABOUT PAGE - TITLES AND DESCRIPTIONS
    heroTitle: "We are more than architects, we are experience creators",
    weListenDescription: "We don't make decisions until your vision is clear.",
    weCreateConcept: "We create the concept",
    weCreateConceptDescription:
      "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.",
    youVisualize3D: "You visualize in 3D",
    youVisualize3DDescription:
      "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.",
    weBuildWithYou: "We build it with you",
    weBuildWithYouDescription:
      "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.",
    startNow: "START NOW",
    turnEverySquareMeter: "Turn every square meter into",
    somethingExtraordinary: "something extraordinary.",
    startBuildingYourDreamSpaceStartingFrom: "Start building your dream space starting from",
    withU2Group: "with U2 Group.",
    usdPerM2: "USD per m²",
    designWithMe: "Design with me",
    aboutUs: "About Us",
    adminPanel: "Admin Panel",
    developedBy: "Developed by: Jpedroza & Jaraagb Developers inc.",
    // CALCULADORA DE PRECIOS
    calculatorTitle1: "Turn every square meter into",
    calculatorTitle2: "something extraordinary.",
    calculatorSubtitle1: "Start building your dream space starting from",
    calculatorSubtitle2: "with U2 Group.",
    calculatorPerM2: "per m²",
    calculatorButton: "Design with me",
    // NOTICIAS/BLOG
    newsTitle: "Blogs",
    newsSubtitle: "Stay up to date with the latest trends in architecture and design.",
    readArticle: "Read Article",
    // Las categorías y viewAllArticles ya existen
    consulting: "Consulting",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Inicializar idioma desde localStorage si existe, si no, usar 'es'
  function getInitialLanguage(): Language {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("u2-language") as Language | null
      if (saved === "es" || saved === "en") return saved
    }
    return "es"
  }

  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  // Estado para saber si ya se montó y evitar parpadeo
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cuando cambia el idioma, guardarlo en localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("u2-language", lang)
  }

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key
  }

  // Evitar renderizar hijos hasta que esté montado (para evitar parpadeo de idioma)
  if (!mounted) return null

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
