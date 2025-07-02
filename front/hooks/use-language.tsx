"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Contexto para manejar el idioma de la aplicación
const LanguageContext = createContext<{
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}>({
  language: "es",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Traducciones completas - aquí están todos los textos de la app
const translations = {
  es: {
    // Navegación principal
    inicio: "Inicio",
    proyectos: "Proyectos",
    nosotros: "Nosotros",
    disena: "Diseña",
    blog: "Blog",
    contacto: "Contacto",

    // Selector de idioma - AGREGAR ESTAS LÍNEAS
    spanish: "Español",
    english: "English",

    // Hero section - textos principales de la página de inicio
    heroDescription: "U2 Group es una incubadora de ideas arquitectónicas que desafían el status quo.",
    heroText:
      "Transformamos espacios en experiencias únicas que reflejan tu visión y estilo de vida, combinando innovación, funcionalidad y diseño excepcional.",

    // Calculadora de precios - NUEVAS TRADUCCIONES AGREGADAS
    calculatorMainTitle: "Convierte cada metro cuadrado en",
    calculatorMainHighlight: "algo extraordinario.",
    calculatorStartText: "Comienza a construir el espacio de tus sueños desde",
    calculatorWithText: "con U2 Group.",
    calculatorPerM2: "USD por m²",
    calculatorLearnMore: "Aprende más sobre",
    calculatorHowWeCalculate: "cómo calculamos tu proyecto",
    calculatorDesignButton: "Diseña conmigo",

    // Calculadora - textos adicionales
    calculatorTitle: "Calcula el costo de tu proyecto",
    calculatorTitleHighlight: "Obtén una estimación instantánea",
    calculatorDescription:
      "Descubre cuánto puede costar tu proyecto arquitectónico con nuestra calculadora inteligente.",
    calculateNow: "Calcular Ahora",

    // Sección de proyectos
    projectsTitle: "Nuestros Proyectos",
    projectsSubtitle: "Descubre cómo transformamos ideas en realidades arquitectónicas excepcionales.",
    projectsDescription: "Ver Todos los Proyectos",
    moreProjects: "Más Proyectos",
    ourfeatured: "Nuestros Destacados",
    viewProject: "Ver Proyecto",

    // Sección de blog
    blogTitle: "Últimas Noticias",
    blogSubtitle: "Mantente al día con las últimas tendencias en arquitectura y diseño.",
    readPost: "Leer Artículo",
    readAllBlogs: "Ver Todos los Artículos",

    // CTA final
    haveProject: "¿Tienes un proyecto en mente?",
    contactTeam: "Nuestro equipo está listo para ayudarte a hacerlo realidad.",
    startProject: "Comenzar Proyecto",

    // Página nosotros
    aboutTitle: "Somos más que",
    aboutSubtitle: "arquitectos, somos",
    aboutText1: "creadores de experiencias",
    aboutText2:
      "Con más de 4 años de experiencia en la industria, hemos trabajado en diferentes climas, contextos y desafíos siempre con el mismo objetivo: hacer que la arquitectura sea más simple, inteligente y personal.",
    ourMission: "Nuestra Misión",
    ourVision: "Nuestra Visión",
    ourMissionText:
      "Creemos que la arquitectura no debe sentirse distante, intimidante o reservada para unos pocos. Debe sentirse como hogar desde el primer boceto hasta el último ladrillo. Por eso creamos espacios que son honestos, humanos y profundamente personales.",
    ourVisionText:
      "Aspiramos a convertirnos en una referencia global para la arquitectura reflexiva, sostenible y profundamente humana, inspirando a las personas a construir espacios que importan, no solo estructuras que existen.",
    whatWeDo: "Qué Hacemos",
    weSpecialize: "Nos Especializamos",
    globalVision: "Visión Global",
    noGuesswork: "Sin Conjeturas",
    realTeam: "Equipo Real",
    howWeDo: "Cómo lo Hacemos",
    creativity: "Creatividad",
    sustainability: "Sostenibilidad",
    quality: "Calidad",
    innovation: "Innovación",
    clientCentric: "Centrado en el Cliente",
    integrity: "Integridad",
    collaboration: "Colaboración",
    attentionToDetail: "Atención al Detalle",
    flexibility: "Flexibilidad",
    weListen: "Escuchamos",
    weListenText: "No tomamos decisiones hasta que tu visión esté clara.",

    // Página de contacto
    contactUs: "Contáctanos",
    contactSubtitle: "Estamos aquí para ayudarte a convertir tu visión en realidad. Cuéntanos sobre tu proyecto.",
    getInTouch: "Ponte en Contacto",
    email: "Email",
    phone: "Teléfono",
    office: "Oficina",
    whyChooseUs: "¿Por qué elegirnos?",
    reason1: "Más de 4 años de experiencia",
    reason2: "Diseños personalizados y únicos",
    reason3: "Equipo profesional y dedicado",
    reason4: "Respuesta en 24 horas",

    // Formulario de contacto
    contactInformation: "Información de Contacto",
    fillForm: "Completa este formulario y nuestro equipo te contactará en 24 horas para discutir tu proyecto.",
    firstName: "Nombre",
    lastName: "Apellido",
    emailAddress: "Correo Electrónico",
    phoneNumber: "Número de Teléfono",
    projectLocation: "Ubicación del Proyecto",
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

    // Detalles del proyecto
    utilization: "Utilización",
    services: "Servicios",
    year: "Año",
    category: "Categoría",
    type: "Tipo",
    size: "Tamaño",

    // Página de diseño
    designTitle: "Diseña tu Espacio",
    designSubtitle: "Crea el proyecto de tus sueños con nuestras herramientas de diseño personalizadas.",
    basics: "Básicos",
    additions: "Adiciones",
    family: "Familia",
    sustainability: "Sostenibilidad",
    productivity: "Productividad",
    hobbies: "Pasatiempos",
    interiorDesign: "Diseño Interior",
    s2Systems: "Sistemas S2",
    getYourQuote: "Obtén tu Cotización",
    chooseThe: "Elige los",
    floors: "Pisos",
    rooms: "Habitaciones",
    bathrooms: "Baños",
    price: "Precio",
    designCost: "Costo del Diseño",
    next: "Siguiente",
    back: "Atrás",
    interestedIn: "Estás interesado en",
    architecturalDesign: "Diseño Arquitectónico",
    designSummary: "Resumen de Diseño",
    projectCode: "Código de Proyecto",
    readyToStart: "¿Listo para comenzar tu proyecto?",
    scheduleConsultation: "Agenda una Consulta",
    bookMeeting: "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle.",
    calendarPlaceholder: "Aquí irá el calendario de Cal.app",
    scheduleCall: "Agenda una Llamada",
    callDescription: "Programa una consulta gratuita con nuestro equipo de expertos.",
    getQuote: "Obtener Cotización",
    quoteDescription: "Recibe una cotización personalizada para tu proyecto arquitectónico.",

    // Footer
    subscribeNewsletter: "Suscríbete al Newsletter",
    menu: "Menú",
    submit: "Enviar",
    privacyPolicy: "Política de Privacidad",
    terms: "Términos y Condiciones",
  },
  en: {
    // Main navigation
    inicio: "Home",
    proyectos: "Projects",
    nosotros: "About Us",
    disena: "Design",
    blog: "Blog",
    contacto: "Contact",

    // Language selector - AGREGAR ESTAS LÍNEAS
    spanish: "Español",
    english: "English",

    // Hero section
    heroDescription: "U2 Group is an incubator of architectural ideas that challenge the status quo.",
    heroText:
      "We transform spaces into unique experiences that reflect your vision and lifestyle, combining innovation, functionality and exceptional design.",

    // Price calculator - NUEVAS TRADUCCIONES AGREGADAS
    calculatorMainTitle: "Turn every square meter into",
    calculatorMainHighlight: "something extraordinary.",
    calculatorStartText: "Start building your dream space starting from",
    calculatorWithText: "with U2 Group.",
    calculatorPerM2: "USD per m²",
    calculatorLearnMore: "Learn more about",
    calculatorHowWeCalculate: "how we calculate your project",
    calculatorDesignButton: "Design with me",

    // Price calculator
    calculatorTitle: "Calculate your project cost",
    calculatorTitleHighlight: "Get an instant estimate",
    calculatorDescription: "Discover how much your architectural project might cost with our smart calculator.",
    calculateNow: "Calculate Now",

    // Projects section
    projectsTitle: "Our Projects",
    projectsSubtitle: "Discover how we transform ideas into exceptional architectural realities.",
    projectsDescription: "View All Projects",
    moreProjects: "More Projects",
    ourfeatured: "Our Featured Projects",
    viewProject: "View Project",

    // Blog section
    blogTitle: "Latest News",
    blogSubtitle: "Stay up to date with the latest trends in architecture and design.",
    readPost: "Read Article",
    readAllBlogs: "View All Articles",

    // Final CTA
    haveProject: "Have a project in mind?",
    contactTeam: "Our team is ready to help you make it a reality.",
    startProject: "Start Project",

    // About page
    aboutTitle: "We are more than",
    aboutSubtitle: "architects, we are",
    aboutText1: "experience creators",
    aboutText2:
      "With over 4 years of experience in the industry, we have worked in different climates, contexts and challenges always with the same goal: to make architecture simpler, smarter and more personal.",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    ourMissionText:
      "We believe that architecture should not feel distant, intimidating or reserved for a few. It should feel like home from the first sketch to the last brick. That's why we create spaces that are honest, human and deeply personal.",
    ourVisionText:
      "We aim to become a global reference for architecture that's thoughtful, sustainable, and deeply human inspiring people to build spaces that matter, not just structures that exist.",
    whatWeDo: "What We Do",
    weSpecialize: "We Specialize",
    globalVision: "Global Vision",
    noGuesswork: "No Guesswork",
    realTeam: "Real Team",
    howWeDo: "How We Do",
    creativity: "Creativity",
    sustainability: "Sustainability",
    quality: "Quality",
    innovation: "Innovation",
    clientCentric: "Client Centric",
    integrity: "Integrity",
    collaboration: "Collaboration",
    attentionToDetail: "Attention to Detail",
    flexibility: "Flexibility",
    weListen: "We listen",
    weListenText: "We don't make decisions until your vision is clear.",

    // Contact page
    contactUs: "Contact Us",
    contactSubtitle: "We're here to help you turn your vision into reality. Tell us about your project.",
    getInTouch: "Get in Touch",
    email: "Email",
    phone: "Phone",
    office: "Office",
    whyChooseUs: "Why choose us?",
    reason1: "Over 4 years of experience",
    reason2: "Custom and unique designs",
    reason3: "Professional and dedicated team",
    reason4: "24-hour response",

    // Contact form
    contactInformation: "Contact Information",
    fillForm: "Fill out this form and our team will contact you within 24 hours to discuss your project.",
    firstName: "First Name",
    lastName: "Last Name",
    emailAddress: "Email Address",
    phoneNumber: "Phone Number",
    projectLocation: "Project Location",
    projectTimeline: "Project Timeline",
    selectTimeline: "Select timeline",
    asap: "As soon as possible",
    within3Months: "Within 3 months",
    within6Months: "Within 6 months",
    within1Year: "Within 1 year",
    justPlanning: "Just planning",
    additionalComments: "Additional Comments",
    commentsPlaceholder: "Tell us more about your project...",
    sendMessage: "Send Message",
    submitForm: "By submitting this form, you agree to our Terms of Service and Privacy Policy.",

    // Project details
    utilization: "Utilization",
    services: "Services",
    year: "Year",
    category: "Category",
    type: "Type",
    size: "Size",

    // Design page
    designTitle: "Design Your Space",
    designSubtitle: "Create your dream project with our personalized design tools.",
    basics: "Basics",
    additions: "Additions",
    family: "Family",
    sustainability: "Sustainability",
    productivity: "Productivity",
    hobbies: "Hobbies",
    interiorDesign: "Interior Design",
    s2Systems: "S2 Systems",
    getYourQuote: "Get Your Quote",
    chooseThe: "Choose the",
    floors: "Floors",
    rooms: "Rooms",
    bathrooms: "Bathrooms",
    price: "Price",
    designCost: "Design Cost",
    next: "Next",
    back: "Back",
    interestedIn: "You are interested in",
    architecturalDesign: "Architectural Design",
    designSummary: "Design Summary",
    projectCode: "Project Code",
    readyToStart: "Ready to start your project?",
    scheduleConsultation: "Schedule a Consultation",
    bookMeeting: "Book a meeting with our team to discuss your project in detail.",
    calendarPlaceholder: "Cal.app calendar will go here",
    scheduleCall: "Schedule a Call",
    callDescription: "Schedule a free consultation with our team of experts.",
    getQuote: "Get Quote",
    quoteDescription: "Receive a personalized quote for your architectural project.",

    // Footer
    subscribeNewsletter: "Subscribe to Newsletter",
    menu: "Menu",
    submit: "Submit",
    privacyPolicy: "Privacy Policy",
    terms: "Terms and Conditions",
  },
}

// Proveedor del contexto de idioma
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("es") // Idioma por defecto español

  // Cargar idioma guardado al inicializar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("u2-language")
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Guardar idioma cuando cambie
  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("u2-language", lang)
  }

  // Función para obtener traducciones
  const t = (key: string): string => {
    const translation = translations[language as keyof typeof translations]?.[key as keyof typeof translation]
    return translation || key // Si no encuentra la traducción, devuelve la clave
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook para usar el contexto de idioma
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
