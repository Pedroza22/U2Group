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
    latestNews: "Últimas Noticias",
    readMore: "Leer Más",
    getStarted: "Comenzar",
    weDesignTheFuture: "Diseñamos el futuro",

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

    // DISEÑA PAGE
    designTitle: "Diseña tu Espacio",
    designSubtitle: "Crea el hogar de tus sueños con nuestro configurador",
    basics: "Básicos",
    additions: "Adiciones",
    family: "Familia",
    sustainability: "Sostenibilidad",
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
    blogTitle: "Últimas Noticias",
    blogSubtitle: "Mantente al día con las últimas tendencias en arquitectura y diseño",
    readPost: "Leer Artículo",
    Todos: "Todos",
    Tips: "Tips",
    News: "Noticias",
    Articles: "Artículos",

    // CONTACTO PAGE
    contactTitle: "Contacto",
    contactSubtitle: "Ponte en contacto con nosotros",
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
    weListen: "Escuchamos",
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
    latestNews: "Latest News",
    readMore: "Read More",
    getStarted: "Get Started",
    weDesignTheFuture: "We design the future",

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

    // DESIGN PAGE
    designTitle: "Design Your Space",
    designSubtitle: "Create your dream home with our configurator",
    basics: "Basics",
    additions: "Additions",
    family: "Family",
    sustainability: "Sustainability",
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
    blogTitle: "Latest News",
    blogSubtitle: "Stay up to date with the latest trends in architecture and design",
    readPost: "Read Article",
    Todos: "All",
    Tips: "Tips",
    News: "News",
    Articles: "Articles",

    // CONTACT PAGE
    contactTitle: "Contact",
    contactSubtitle: "Get in touch with us",
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
    weListen: "We Listen",
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
  },
}

// 🔄 MAPA DE TRADUCCIONES AUTOMÁTICAS COMPLETO - CON TODOS LOS TEXTOS DE LAS IMÁGENES
const autoTranslationMap = {
  es: {
    // ===== FOOTER COMPLETO =====
    Services: "Servicios",
    "Architectural Design": "Diseño Arquitectónico",
    Consultoria: "Consultoría",
    Company: "Empresa",
    "About Us": "Nosotros",
    Blog: "Blog",
    "Panel Admin": "Panel Admin",
    Contact: "Contacto",
    "info@u2group.com": "info@u2group.com",
    "+57 3043001791": "+57 3043001791",
    "Pasto, Colombia": "Pasto, Colombia",
    "Privacy Policies": "Políticas de Privacidad",
    "© 2025 U2 GROUP. All rights reserved.": "© 2025 U2 GROUP. Todos los derechos reservados.",
    "Follow us": "Síguenos",
    "Developed by: Jpedroza & Jaraagb Developers inc.": "Desarrollado por: Jpedroza & Jaraagb Developers inc.",

    // ===== NAVEGACIÓN =====
    Home: "Inicio",
    Projects: "Proyectos",
    "About Us": "Nosotros",
    Design: "Diseña",
    Blog: "Blog",
    Contact: "Contacto",

    // ===== VALORES DE LA EMPRESA =====
    Creativity: "Creatividad",
    Sustainability: "Sostenibilidad",
    Quality: "Calidad",
    Innovation: "Innovación",
    "Client Centric": "Centrado en el Cliente",
    Integrity: "Integridad",
    Collaboration: "Colaboración",
    "Attention to Detail": "Atención al Detalle",
    Flexibility: "Flexibilidad",

    // ===== PÁGINA NOSOTROS COMPLETA =====
    "We are more than architects, we are experience creators":
      "Somos más que arquitectos, somos creadores de experiencias",
    "With more than 4 years of experience in the industry, we have worked in different climates, contexts and challenges always with the same goal: to make architecture simpler, smarter and more personal.":
      "Con más de 4 años de experiencia en la industria, hemos trabajado en diferentes climas, contextos y desafíos siempre con el mismo objetivo: hacer que la arquitectura sea más simple, inteligente y personal.",
    "Whether you're building in the mountains, the city or by the sea, we help you bring your vision to life wherever you are.":
      "Ya sea que estés construyendo en las montañas, la ciudad o junto al mar, te ayudamos a dar vida a tu visión donde quiera que estés.",

    // MISIÓN Y VISIÓN
    "Our Mission": "Nuestra Misión",
    "Our Vision": "Nuestra Visión",
    "We believe that architecture should not feel distant, intimidating or reserved for a few. It should feel like home from the first sketch to the last brick. That's why we create spaces that are honest, human and deeply personal.":
      "Creemos que la arquitectura no debe sentirse distante, intimidante o reservada para unos pocos. Debe sentirse como hogar desde el primer boceto hasta el último ladrillo. Por eso creamos espacios que son honestos, humanos y profundamente personales.",
    "We aim to become a global reference for architecture that's thoughtful, sustainable, and deeply human inspiring people to build spaces that matter, not just structures that exist.":
      "Aspiramos a convertirnos en una referencia global para la arquitectura reflexiva, sostenible y profundamente humana, inspirando a las personas a construir espacios que importan, no solo estructuras que existen.",

    // QUÉ HACEMOS
    "What We Do": "Lo Que Hacemos",
    "We turn architectural design into a clear and collaborative process, where budget, schedules and creativity work together.":
      "Convertimos el diseño arquitectónico en un proceso claro y colaborativo, donde presupuesto, cronogramas y creatividad trabajan juntos.",
    "We Specialize": "Nos Especializamos",
    "That means we focus 100% on the creative and making your project visually stunning, technically precise and ready to inspire.":
      "Eso significa que nos enfocamos 100% en lo creativo y en hacer que tu proyecto sea visualmente impresionante, técnicamente preciso y listo para inspirar.",
    "Global Vision": "Visión Global",
    "Our plans are detailed, professional and crafted to meet international standards, ready for your local architect or engineer to adapt to your region's codes.":
      "Nuestros planos son detallados, profesionales y elaborados para cumplir con estándares internacionales, listos para que tu arquitecto o ingeniero local los adapte a los códigos de tu región.",
    "No Guesswork": "Sin Conjeturas",
    "You'll know exactly what you get: plans, sections, renders, details organized, polished and ready for presentation.":
      "Sabrás exactamente lo que obtienes: planos, secciones, renders, detalles organizados, pulidos y listos para presentación.",
    "Real Team": "Equipo Real",
    "We are humans, not bots. You can talk to us. Ask questions. Get support. We'll guide you carefully from day one.":
      "Somos humanos, no bots. Puedes hablar con nosotros. Hacer preguntas. Obtener apoyo. Te guiaremos con cuidado desde el primer día.",

    // CÓMO LO HACEMOS
    "How We Do": "Cómo Lo Hacemos",
    "We Listen": "Escuchamos",
    "We don't make decisions until your vision is clear": "No tomamos decisiones hasta que tu visión esté clara",
    "We create the concept": "Creamos el concepto",
    "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.":
      "Aquí es donde comienza la magia: combinamos función, estética y emoción en un concepto único. Cada detalle surge de tus necesidades reales. Sin plantillas, solo propósito.",
    "You visualize in 3D": "Visualizas en 3D",
    "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.":
      "Con nuestros renders hiperrealistas, caminarás y sentirás tu hogar antes de que se coloque un solo ladrillo. Así, tomas decisiones con claridad y confianza.",
    "We build it with you": "Lo construimos contigo",
    "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.":
      "Desde los planos hasta los acabados, eres parte de cada paso. Te guiamos, te mantenemos informado y caminamos contigo. Tu hogar no se construye solo, se construye contigo.",

    // FUNDADORES
    "Meet the Founders": "Conoce a los Fundadores",
    "Sofía Solarte": "Sofía Solarte",
    "Juan José Lima": "Juan José Lima",
    "Founder & Architect": "Fundadora y Arquitecta",
    "Co-Founder & Industrial Designer": "Co-Fundador y Diseñador Industrial",
    "START NOW": "COMENZAR AHORA",

    // ===== PÁGINA DE INICIO =====
    "We design the future": "Diseñamos el futuro",
    "At U2 Group, architecture is our canvas and creativity our most powerful tool. We are a creative studio that transforms bold ideas into built structures, blending contemporary design with visionary functionality.":
      "En U2 Group, la arquitectura es nuestro lienzo y la creatividad nuestra herramienta más poderosa. Somos un estudio creativo que transforma ideas audaces en estructuras construidas, combinando diseño contemporáneo con funcionalidad visionaria.",
    "We don't repeat formulas; we reinvent them. Every project begins with innovation, pushing the boundaries of conventional architecture to create spaces that are not just functional, but transformative and deeply personal.":
      "No repetimos fórmulas; las reinventamos. Cada proyecto comienza con innovación, empujando los límites de la arquitectura convencional para crear espacios que no solo son funcionales, sino transformadores y profundamente personales.",
    "U2 Group no solo diseña espacios.": "U2 Group no solo diseña espacios.",
    "los reimaginamos.": "los reimaginamos.",
    '"Let\'s go group good design, take time, build, cost."':
      '"Vamos grupo, buen diseño, toma tiempo, construir, costo."',

    // ===== PÁGINA PROYECTOS =====
    "Our Projects": "Nuestros Proyectos",
    "Explore our collection of unique architectural projects":
      "Explora nuestra colección de proyectos arquitectónicos únicos",
    "More Projects": "Más Proyectos",
    "Our Featured Projects": "Nuestros Destacados",
    "Have a project in mind?": "¿Tienes un proyecto en mente?",
    "Contact our team of experts": "Contacta con nuestro equipo de expertos",
    "Start Project": "Comenzar Proyecto",

    // ===== PÁGINA BLOG =====
    "Latest News": "Últimas Noticias",
    "Stay up to date with the latest trends in architecture and diseño.":
      "Mantente al día con las últimas tendencias en arquitectura y diseño.",
    All: "Todos",
    "Read Article": "Leer Artículo",

    // ===== PÁGINA DISEÑA =====
    Basics: "Básicos",
    Additions: "Adiciones",
    Family: "Family",
    Productivity: "Productividad",
    Hobbies: "Pasatiempos",
    "Interior Design": "Diseño Interior",
    "Sistemas S2": "S2 Systems",
    "Get Your Quote": "Obtén tu Cotización",
    "Choose the": "Elige los",
    Price: "Precio",
    "You are interested in": "Estás interesado en",
    "Diseño Arquitectónico": "Architectural Design",
    "DESIGN SUMMARY": "RESUMEN DE DISEÑO",
    "Project Code": "Código de Proyecto",
    "Design Cost": "Costo del Diseño",
    "Ready to start your project?": "¿Listo para comenzar tu proyecto?",
    Back: "Atrás",
    "Schedule a Consultation": "Agenda una Consulta",
    "Book a meeting with our team to discuss your project in detail":
      "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle",
    Next: "Siguiente",

    // ===== PÁGINA NOSOTROS - TEXTOS ESPECÍFICOS FALTANTES =====
    "How We Do": "Cómo Lo Hacemos",
    "We are more than architects, we are experience creators":
      "Somos más que arquitectos, somos creadores de experiencias",

    // FUNDADORES ESPECÍFICOS
    "Sofía Solarte": "Sofía Solarte",
    "Juan José Lima": "Juan José Lima",
    "Fundadora y Arquitecta": "Founder & Architect",
    "Co-Fundador y Diseñador Industrial": "Co-Founder & Industrial Designer",

    // PROCESO PASO A PASO - TEXTOS EXACTOS
    "We create the concept": "Creamos el concepto",
    "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.":
      "Aquí es donde comienza la magia: combinamos función, estética y emoción en un concepto único. Cada detalle surge de tus necesidades reales. Sin plantillas, solo propósito.",

    "You visualize in 3D": "Visualizas en 3D",
    "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.":
      "Con nuestros renders hiperrealistas, caminarás y sentirás tu hogar antes de que se coloque un solo ladrillo. Así, tomas decisiones con claridad y confianza.",

    "We build it with you": "Lo construimos contigo",
    "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.":
      "Desde los planos hasta los acabados, eres parte de cada paso. Te guiamos, te mantenemos informado y caminamos contigo. Tu hogar no se construye solo, se construye contigo.",

    "START NOW": "COMENZAR AHORA",
  },
  en: {
    // ===== FOOTER COMPLETO =====
    Servicios: "Services",
    "Diseño Arquitectónico": "Architectural Design",
    Consultoría: "Consultoria",
    Empresa: "Company",
    Nosotros: "About Us",
    Blog: "Blog",
    "Panel Admin": "Panel Admin",
    Contacto: "Contact",
    "info@u2group.com": "info@u2group.com",
    "+57 3043001791": "+57 3043001791",
    "Pasto, Colombia": "Pasto, Colombia",
    "Políticas de Privacidad": "Privacy Policies",
    "© 2025 U2 GROUP. Todos los derechos reservados.": "© 2025 U2 GROUP. All rights reserved.",
    Síguenos: "Follow us",
    "Desarrollado por: Jpedroza & Jaraagb Developers inc.": "Developed by: Jpedroza & Jaraagb Developers inc.",

    // ===== NAVEGACIÓN =====
    Inicio: "Home",
    Proyectos: "Projects",
    Nosotros: "About Us",
    Diseña: "Design",
    Blog: "Blog",
    Contacto: "Contact",

    // ===== VALORES DE LA EMPRESA =====
    Creatividad: "Creativity",
    Sostenibilidad: "Sustainability",
    Calidad: "Quality",
    Innovación: "Innovation",
    "Centrado en el Cliente": "Client Centric",
    Integridad: "Integrity",
    Colaboración: "Collaboration",
    "Atención al Detalle": "Attention to Detail",
    Flexibilidad: "Flexibility",

    // ===== PÁGINA NOSOTROS COMPLETA =====
    "Somos más que arquitectos, somos creadores de experiencias":
      "We are more than architects, we are experience creators",
    "Con más de 4 años de experiencia en la industria, hemos trabajado en diferentes climas, contextos y desafíos siempre con el mismo objetivo: hacer que la arquitectura sea más simple, inteligente y personal.":
      "With more than 4 years of experience in the industry, we have worked in different climates, contexts and challenges always with the same goal: to make architecture simpler, smarter and more personal.",
    "Ya sea que estés construyendo en las montañas, la ciudad o junto al mar, te ayudamos a dar vida a tu visión donde quiera que estés.":
      "Whether you're building in the mountains, the city or by the sea, we help you bring your vision to life wherever you are.",

    // MISIÓN Y VISIÓN
    "Nuestra Misión": "Our Mission",
    "Nuestra Visión": "Our Vision",
    "Creemos que la arquitectura no debe sentirse distante, intimidante o reservada para unos pocos. Debe sentirse como hogar desde el primer boceto hasta el último ladrillo. Por eso creamos espacios que son honestos, humanos y profundamente personales.":
      "We believe that architecture should not feel distant, intimidating or reserved for a few. It should feel like home from the first sketch to the last brick. That's why we create spaces that are honest, human and deeply personal.",
    "Aspiramos a convertirnos en una referencia global para la arquitectura reflexiva, sostenible y profundamente humana, inspirando a las personas a construir espacios que importan, no solo estructuras que existen.":
      "We aim to become a global reference for architecture that's thoughtful, sustainable and deeply human inspiring people to build spaces that matter, not just structures that exist.",

    // QUÉ HACEMOS
    "Lo Que Hacemos": "What We Do",
    "Convertimos el diseño arquitectónico en un proceso claro y colaborativo, donde presupuesto, cronogramas y creatividad trabajan juntos.":
      "We turn architectural design into a clear and collaborative process, where budget, schedules and creativity work together.",
    "Nos Especializamos": "We Specialize",
    "Eso significa que nos enfocamos 100% en lo creativo y en hacer que tu proyecto sea visualmente impresionante, técnicamente preciso y listo para inspirar.":
      "That means we focus 100% on the creative and making your project visually stunning, technically precise and ready to inspire.",
    "Visión Global": "Global Vision",
    "Nuestros planos son detallados, profesionales y elaborados para cumplir con estándares internacionales, listos para que tu arquitecto o ingeniero local los adapte a los códigos de tu región.":
      "Our plans are detailed, professional and crafted to meet international standards, ready for your local architect or engineer to adapt to your region's codes.",
    "Sin Conjeturas": "No Guesswork",
    "Sabrás exactamente lo que obtienes: planos, secciones, renders, detalles organizados, pulidos y listos para presentación.":
      "You'll know exactly what you get: plans, sections, renders, details organized, polished and ready for presentation.",
    "Equipo Real": "Real Team",
    "Somos humanos, no bots. Puedes hablar con nosotros. Hacer preguntas. Obtener apoyo. Te guiaremos con cuidado desde el primer día.":
      "We are humans, not bots. You can talk to us. Ask questions. Get support. We'll guide you carefully from day one.",

    // CÓMO LO HACEMOS
    "Cómo Lo Hacemos": "How We Do",
    Escuchamos: "We Listen",
    "No tomamos decisiones hasta que tu visión esté clara": "We don't make decisions until your vision is clear",
    "Creamos el concepto": "We create the concept",
    "Aquí es donde comienza la magia: combinamos función, estética y emoción en un concepto único. Cada detalle surge de tus necesidades reales. Sin plantillas, solo propósito.":
      "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.",
    "Visualizas en 3D": "You visualize in 3D",
    "Con nuestros renders hiperrealistas, caminarás y sentirás tu hogar antes de que se coloque un solo ladrillo. Así, tomas decisiones con claridad y confianza.":
      "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.",
    "Lo construimos contigo": "We build it with you",
    "Desde los planos hasta los acabados, eres parte de cada paso. Te guiamos, te mantenemos informado y caminamos contigo. Tu hogar no se construye solo, se construye contigo.":
      "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.",

    // FUNDADORES
    "Conoce a los Fundadores": "Meet the Founders",
    "Sofía Solarte": "Sofía Solarte",
    "Juan José Lima": "Juan José Lima",
    "Fundadora y Arquitecta": "Founder & Architect",
    "Co-Fundador y Diseñador Industrial": "Co-Founder & Industrial Designer",
    "COMENZAR AHORA": "START NOW",

    // ===== PÁGINA DE INICIO =====
    "Diseñamos el futuro": "We design the future",
    "En U2 Group, la arquitectura es nuestro lienzo y la creatividad nuestra herramienta más poderosa. Somos un estudio creativo que transforma ideas audaces en estructuras construidas, combinando diseño contemporáneo con funcionalidad visionaria.":
      "At U2 Group, architecture is our canvas and creativity our most powerful tool. We are a creative studio that transforms bold ideas into built structures, blending contemporary design with visionary functionality.",
    "No repetimos fórmulas; las reinventamos. Cada proyecto comienza con innovación, empujando los límites de la arquitectura convencional para crear espacios que no solo son funcionales, sino transformadores y profundamente personales.":
      "We don't repeat formulas; we reinvent them. Every project begins with innovation, pushing the boundaries of conventional architecture to create spaces that are not just functional, but transformative and deeply personal.",
    "U2 Group no solo diseña espacios.": "U2 Group doesn't just design spaces.",
    "los reimaginamos.": "we reimagine them.",
    '"Vamos grupo, buen diseño, toma tiempo, construir, costo."':
      '"Let\'s go group good design, take time, build, cost."',

    // ===== PÁGINA PROYECTOS =====
    "Nuestros Proyectos": "Our Projects",
    "Explora nuestra colección de proyectos arquitectónicos únicos":
      "Explore our collection of unique architectural projects",
    "Más Proyectos": "More Projects",
    "Nuestros Destacados": "Our Featured Projects",
    "¿Tienes un proyecto en mente?": "Have a project in mind?",
    "Contacta con nuestro equipo de expertos": "Contact our team of experts",
    "Comenzar Proyecto": "Start Project",

    // ===== PÁGINA BLOG =====
    "Últimas Noticias": "Latest News",
    "Mantente al día con las últimas tendencias en arquitectura y diseño.":
      "Stay up to date with the latest trends in architecture and design.",
    Todos: "All",
    "Leer Artículo": "Read Article",

    // ===== PÁGINA DISEÑA =====
    Básicos: "Basics",
    Additions: "Additions",
    Family: "Family",
    Productividad: "Productivity",
    Hobbies: "Hobbies",
    "Diseño Interior": "Interior Design",
    "Sistemas S2": "S2 Systems",
    "Obtén tu Cotización": "Get Your Quote",
    "Elige los": "Choose the",
    Price: "Precio",
    "Estás interesado en": "You are interested in",
    "Diseño Arquitectónico": "Architectural Design",
    "RESUMEN DE DISEÑO": "DESIGN SUMMARY",
    "Código de Proyecto": "Project Code",
    "Costo del Diseño": "Design Cost",
    "¿Listo para comenzar tu proyecto?": "Ready to start your project?",
    Atrás: "Back",
    "Agenda una Consulta": "Schedule a Consultation",
    "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle":
      "Book a meeting with our team to discuss your project in detail",
    Siguiente: "Next",

    // ===== PÁGINA NOSOTROS - TEXTOS ESPECÍFICOS FALTANTES =====
    "How We Do": "Cómo Lo Hacemos",
    "We are more than architects, we are experience creators":
      "Somos más que arquitectos, somos creadores de experiencias",

    // FUNDADORES ESPECÍFICOS
    "Sofía Solarte": "Sofía Solarte",
    "Juan José Lima": "Juan José Lima",
    "Fundadora y Arquitecta": "Founder & Architect",
    "Co-Fundador y Diseñador Industrial": "Co-Founder & Industrial Designer",

    // PROCESO PASO A PASO - TEXTOS EXACTOS
    "Creamos el concepto": "We create the concept",
    "Aquí es donde comienza la magia: combinamos función, estética y emoción en un concepto único. Cada detalle surge de tus necesidades reales. Sin plantillas, solo propósito.":
      "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.",

    "You visualize in 3D": "You visualize in 3D",
    "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.":
      "Con nuestros renders hiperrealistas, caminarás y sentirás tu hogar antes de que se coloque un solo ladrillo. Así, tomas decisiones con claridad y confianza.",

    "We build it with you": "We build it with you",
    "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.":
      "Desde los planos hasta los acabados, eres parte de cada paso. Te guiamos, te mantenemos informado y caminamos contigo. Tu hogar no se construye solo, se construye contigo.",

    "COMENZAR AHORA": "START NOW",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("u2-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // 🔄 FUNCIÓN DE TRADUCCIÓN AUTOMÁTICA MEJORADA Y CORREGIDA
  const applyAutoTranslations = () => {
    if (typeof window === "undefined") return

    const currentTranslations = autoTranslationMap[language]

    console.log(`🌐 Aplicando traducciones para idioma: ${language}`)

    // Buscar todos los elementos de texto en la página
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Filtrar nodos que están dentro de scripts, styles, etc.
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT

          const tagName = parent.tagName.toLowerCase()
          if (["script", "style", "noscript"].includes(tagName)) {
            return NodeFilter.FILTER_REJECT
          }

          return NodeFilter.FILTER_ACCEPT
        },
      },
      false,
    )

    const textNodes: Text[] = []
    let node: Text | null

    // Recopilar todos los nodos de texto
    while ((node = walker.nextNode() as Text)) {
      if (node.nodeValue && node.nodeValue.trim()) {
        textNodes.push(node)
      }
    }

    let translationsApplied = 0

    // Aplicar traducciones
    textNodes.forEach((textNode) => {
      const originalText = textNode.nodeValue?.trim()
      if (originalText && currentTranslations[originalText]) {
        textNode.nodeValue = currentTranslations[originalText]
        translationsApplied++
        console.log(`✅ Traducido: "${originalText}" → "${currentTranslations[originalText]}"`)
      }
    })

    console.log(`🎯 Total traducciones aplicadas: ${translationsApplied}`)
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("u2-language", lang)

    // Aplicar traducciones automáticas después de cambiar idioma
    setTimeout(() => {
      applyAutoTranslations()
    }, 100)
  }

  // Aplicar traducciones cuando cambie el idioma
  useEffect(() => {
    applyAutoTranslations()
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

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
