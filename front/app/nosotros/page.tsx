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
      image: "", // Placeholder image
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
            <h2 className="text-5xl md:text-7xl neutra-font-bold text-blue-600 mb-8">What We Do</h2>
            <p className="text-xl text-gray-700 mb-12 max-w-4xl neutra-font">
              Convertimos el diseño arquitectónico en un proceso claro y colaborativo, donde presupuesto, cronogramas y
              creatividad trabajan juntos.
            </p>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">We Specialize</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  Eso significa que nos enfocamos 100% en lo creativo y en hacer que tu proyecto sea visualmente
                  impresionante, técnicamente preciso y listo para inspirar.
                </p>
              </div>
              <div>
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

      {/* SECCIÓN "HOW We Do" - Valores */}
      <section className="w-full py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl neutra-font-bold text-blue-600 mb-12 text-center">How We Do</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <Palette className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Creativity</h3>
              </div>
              <div className="text-center">
                <Leaf className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Sustainability</h3>
              </div>
              <div className="text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Quality</h3>
              </div>
              <div className="text-center">
                <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Innovation</h3>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Client Centric</h3>
              </div>
              <div className="text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Integrity</h3>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Collaboration</h3>
              </div>
              <div className="text-center">
                <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Attention to Detail</h3>
              </div>
              <div className="text-center">
                <RotateCcw className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl neutra-font-bold text-gray-900 mb-2">Flexibility</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN "HOW We Do" - Proceso con navegación */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
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

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
