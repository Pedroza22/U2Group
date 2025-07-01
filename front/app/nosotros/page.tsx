"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Palette,
  Leaf,
  Award,
  Lightbulb,
  Users,
  Search,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Facebook,
  Twitter,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"

export default function NosotrosPage() {
  const { t } = useLanguage()

  // Estado para controlar qué botón está activo (Our Mission / Our Vision)
  const [activeButton, setActiveButton] = useState("mission")

  // Estado para controlar el paso actual en "How We Do"
  const [currentStep, setCurrentStep] = useState(1)

  // Estado para controlar tooltips
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  // Datos de los valores con tooltips
  const values = [
    {
      icon: Palette,
      name: "Creativity",
      tooltip:
        "We embrace creativity in all its forms, pushing the boundaries of design to craft unique and inspiring spaces.",
    },
    {
      icon: Leaf,
      name: "Sustainability",
      tooltip: "We prioritize sustainable practices and eco-friendly solutions in every project we undertake.",
    },
    {
      icon: Award,
      name: "Quality",
      tooltip: "We maintain the highest standards of quality in every aspect of our work and deliverables.",
    },
    {
      icon: Lightbulb,
      name: "Innovation",
      tooltip: "We constantly seek innovative solutions and cutting-edge approaches to architectural challenges.",
    },
    {
      icon: Users,
      name: "Client Centric",
      tooltip: "Our clients are at the heart of everything we do, ensuring their vision becomes reality.",
    },
    {
      icon: Shield,
      name: "Integrity",
      tooltip: "We conduct our business with honesty, transparency, and ethical practices at all times.",
    },
    {
      icon: Users,
      name: "Collaboration",
      tooltip: "We believe in the power of teamwork and collaborative partnerships to achieve exceptional results.",
    },
    {
      icon: Search,
      name: "Attention to Detail",
      tooltip: "Every detail matters to us, from the initial concept to the final execution of your project.",
    },
    {
      icon: RotateCcw,
      name: "Flexibility",
      tooltip: "We adapt to changing needs and circumstances while maintaining our commitment to excellence.",
    },
  ]

  // Datos de los pasos del proceso
  const processSteps = [
    {
      id: 1,
      title: t("weListen") || "We listen",
      description: t("weListenText") || "No tomamos decisiones hasta que tu visión esté clara.",
      image: "",
    },
    {
      id: 2,
      title: "We create the concept",
      description:
        "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.",
      image: "",
    },
    {
      id: 3,
      title: "You visualize in 3D",
      description:
        "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.",
      image: "",
    },
    {
      id: 4,
      title: "We build it with you",
      description:
        "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.",
      image: "",
    },
  ]

  // Función para navegar entre pasos
  const nextStep = () => {
    setCurrentStep((prev) => (prev < processSteps.length ? prev + 1 : 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : processSteps.length))
  }

  // Scroll al top cuando se hace clic en "Start Now"
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* HEADER - Navegación principal */}
      <Header currentPage="nosotros" />

      {/* SECCIÓN PRINCIPAL - Hero de la página */}
      <section className="w-full py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl neutra-font-bold leading-tight mb-8 text-gray-900">
              Somos más que
              <br />
              arquitectos, somos
              <br />
              creadores de experiencias
            </h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-lg text-gray-700 mb-4 neutra-font">
                  Con más de 4 años de experiencia en la industria, hemos trabajado en diferentes climas, contextos y
                  desafíos siempre con el mismo objetivo: hacer que la arquitectura sea más simple, inteligente y
                  personal.
                </p>
              </div>
              <div>
                <p className="text-lg text-gray-700 neutra-font">
                  Ya sea que estés construyendo en las montañas, la ciudad o junto al mar, te ayudamos a dar vida a tu
                  visión donde quiera que estés.
                </p>
              </div>
            </div>

            {/* Botones Our Mission y Our Vision */}
            <div className="flex justify-center space-x-4 mb-16">
              <Button
                onClick={() => setActiveButton("mission")}
                className={`px-8 py-3 neutra-font ${
                  activeButton === "mission"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Our Mission
              </Button>
              <Button
                onClick={() => setActiveButton("vision")}
                className={`px-8 py-3 neutra-font ${
                  activeButton === "vision"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-transparent border border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Our Vision
              </Button>
            </div>

            {/* Texto que cambia según el botón activo */}
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed neutra-font">
                {activeButton === "mission"
                  ? "Creemos que la arquitectura no debe sentirse distante, intimidante o reservada para unos pocos. Debe sentirse como hogar desde el primer boceto hasta el último ladrillo. Por eso creamos espacios que son honestos, humanos y profundamente personales."
                  : "We aim to become a global reference for architecture that's thoughtful, sustainable, and deeply human inspiring people to build spaces that matter, not just structures that exist."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "What We Do" */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-58 md:text-7xl neutra-font-bold text-blue-600 mb-8">What We Do</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl neutra-font">
              Convertimos el diseño arquitectónico en un proceso claro y colaborativo, donde presupuesto, cronogramas y
              creatividad trabajan juntos.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="border border-gray-300 rounded-lg p-8">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">We Specialize</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  Eso significa que nos enfocamos 100% en lo creativo y en hacer que tu proyecto sea visualmente
                  impresionante, técnicamente preciso y listo para inspirar.
                </p>
              </div>
              <div className="border border-gray-300 rounded-lg p-8">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">Global Vision</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  Nuestros planos son detallados, profesionales y elaborados para cumplir con estándares
                  internacionales, listos para que tu arquitecto o ingeniero local los adapte a los códigos de tu
                  región.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="border border-gray-300 rounded-lg p-8">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">No Guesswork</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  Sabrás exactamente lo que obtienes: planos, secciones, renders, detalles organizados, pulidos y listos
                  para presentación.
                </p>
              </div>
              <div className="border border-gray-300 rounded-lg p-8">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">Real Team</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  Somos humanos, no bots. Puedes hablar con nosotros. Hacer preguntas. Obtener apoyo. Te guiaremos con
                  cuidado desde el primer día.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "HOW We Do" - Valores con tooltips más compactos */}
      <section className="w-full py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-12 relative">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div
                    key={index}
                    className="text-center relative"
                    onMouseEnter={() => setHoveredValue(value.name)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    <IconComponent className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <h3 className="text-sm neutra-font-bold text-gray-900">{value.name}</h3>

                    {/* Tooltip */}
                    {hoveredValue === value.name && (
                      <div className="absolute z-10 bg-gray-800 text-white p-3 rounded-lg shadow-lg max-w-xs text-sm neutra-font leading-relaxed -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                        {value.tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "HOW We Do" - Proceso con navegación */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl neutra-font-bold text-blue-600 mb-12 text-center">How We Do</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Imagen del paso actual */}
              <div className="relative">
                <Image
                  src={processSteps[currentStep - 1].image || "/placeholder.svg"}
                  alt={processSteps[currentStep - 1].title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full h-[400px]"
                />
              </div>

              {/* Contenido del paso actual */}
              <div>
                <div className="text-6xl neutra-font-bold text-gray-300 mb-4">{currentStep}.</div>
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-gray-900 mb-6">
                  {processSteps[currentStep - 1].title}
                </h3>
                <p className="text-lg text-gray-700 mb-8 neutra-font">{processSteps[currentStep - 1].description}</p>

                {/* Botones de navegación */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={prevStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  <Button
                    onClick={nextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 p-0"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>

                  {/* Botón Start Now solo en el último paso */}
                  {currentStep === 4 && (
                    <Link href="/disena" onClick={scrollToTop}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full neutra-font-bold ml-4">
                        START NOW
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "Meet the Founders" */}
      <section className="w-full py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Título */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl neutra-font-bold text-gray-900 mb-4">
                Meet the <span className="text-blue-600">Founders</span>
              </h2>
            </div>

            {/* Tarjetas de fundadores */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Sofía Solarte */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="mb-6">
                  <Image
                    src="https://www.tuproyectodevida.pe/wp-content/uploads/2021/04/Seis-se%C3%B1ales-1200x628.jpg"
                    alt="Sofía Solarte"
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-2xl neutra-font-bold text-gray-900 mb-2">Sofía Solarte</h3>
                  <p className="text-gray-600 neutra-font">Founder & Architect</p>
                </div>

                {/* Redes sociales */}
                <div className="flex justify-center gap-4">
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Facebook className="w-5 h-5 text-gray-600" />
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </Link>
                </div>
              </div>

              {/* Juan José Lima */}
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="mb-6">
                  <Image
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhQS6O5QhmebBvhCm_e-9bkhQDnG_SgiA8Sw8SITEzkgEl_R3qDvB7b-Gsr-3aVrFpVyZxY6hCbMHiS011mqT0DshZasVFMfBN6FqJ7kTT20W12ylkZekI8NIyiVuRev-lc9BoO7JJA11Nc834-kiHFlQgYQ2o-ynP0lf9dXoUSpryjz4fhyphenhyphenjSnt8fWTruo/s1600/arquitecto-tecnico-rol-funciones-responsabilidades.webpheight=120&width=120"
                    alt="Juan José Lima"
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-2xl neutra-font-bold text-gray-900 mb-2">Juan José Lima</h3>
                  <p className="text-gray-600 neutra-font">Co-Founder & Industrial Designer</p>
                </div>

                {/* Redes sociales */}
                <div className="flex justify-center gap-4">
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Facebook className="w-5 h-5 text-gray-600" />
                  </Link>
                  <Link href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
