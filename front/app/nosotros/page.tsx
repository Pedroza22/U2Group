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
  const { t, language } = useLanguage()

  // Estado para controlar qué botón está activo (Our Mission / Our Vision)
  const [activeButton, setActiveButton] = useState("mission")

  // Estado para controlar el paso actual en "How We Do"
  const [currentStep, setCurrentStep] = useState(1)

  // Estado para controlar tooltips
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  // Valores con tooltips internacionalizados
  const values = [
    { icon: Palette, name: t("creativity"), tooltip: t("creativityTooltip") },
    { icon: Leaf, name: t("sustainability"), tooltip: t("sustainabilityTooltip") },
    { icon: Award, name: t("quality"), tooltip: t("qualityTooltip") },
    { icon: Lightbulb, name: t("innovation"), tooltip: t("innovationTooltip") },
    { icon: Users, name: t("clientCentric"), tooltip: t("clientCentricTooltip") },
    { icon: Shield, name: t("integrity"), tooltip: t("integrityTooltip") },
    { icon: Users, name: t("collaboration"), tooltip: t("collaborationTooltip") },
    { icon: Search, name: t("attentionToDetail"), tooltip: t("attentionToDetailTooltip") },
    { icon: RotateCcw, name: t("flexibility"), tooltip: t("flexibilityTooltip") },
  ]

  // Datos de los pasos del proceso - USAR TRADUCCIONES DINÁMICAS
  const processSteps = [
    {
      id: 1,
      title: t("weListen") || "We listen",
      description: t("weListenDescription") || "No tomamos decisiones hasta que tu visión esté clara.",
      image: "/animacion4.jpg",
    },
    {
      id: 2,
      title: t("weCreateConcept") || "We create the concept",
      description:
        t("weCreateConceptDescription") ||
        "This is where the magic begins: we blend function, aesthetics, and emotion into a unique concept. Every detail comes from your real needs. No templates only purpose.",
      image: "/animacion3.png",
    },
    {
      id: 3,
      title: t("youVisualize3D") || "You visualize in 3D",
      description:
        t("youVisualize3DDescription") ||
        "With our hyper-realistic renders, you'll walk through and feel your home before a single brick is laid. That way, you make decisions with clarity and confidence.",
      image: "/animacion2.jpeg",
    },
    {
      id: 4,
      title: t("weBuildWithYou") || "We build it with you",
      description:
        t("weBuildWithYouDescription") ||
        "From plans to finishes, you're part of every step. We guide you, keep you informed, and walk with you. Your home isn't built alone it's built with you.",
      image: "/animacion1.png",
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
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl neutra-font-black leading-tight mb-8 text-blue-700 drop-shadow-md text-center">
              {t("heroTitle")}
            </h1>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <p className="text-xl text-gray-700 mb-4 neutra-font text-center md:text-left">
                  {t("heroDescription1")}
                </p>
              </div>
              <div>
                <p className="text-xl text-gray-700 neutra-font text-center md:text-left">
                  {t("heroDescription2")}
                </p>
              </div>
            </div>
            {/* Botones Our Mission y Our Vision con fondo diferenciado */}
            <div className="flex justify-center space-x-4 mb-0">
              <Button
                onClick={() => setActiveButton("mission")}
                className={`px-8 py-3 neutra-font text-lg shadow-lg transition-all duration-200 ${activeButton === "mission" ? "bg-blue-600 hover:bg-blue-700 text-white scale-105" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
              >
                {t("mission")}
              </Button>
              <Button
                onClick={() => setActiveButton("vision")}
                className={`px-8 py-3 neutra-font text-lg shadow-lg transition-all duration-200 ${activeButton === "vision" ? "bg-blue-600 hover:bg-blue-700 text-white scale-105" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"}`}
              >
                {t("vision")}
              </Button>
            </div>
            {/* Fondo especial para misión/visión */}
            <div className="w-full flex justify-center mt-8">
              <div className="rounded-2xl shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-100 px-10 py-10 max-w-3xl mx-auto">
                <p className="text-xl text-blue-900 leading-relaxed neutra-font text-center">
                  {activeButton === "mission" ? t("missionDescription") : t("visionDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SEPARADOR */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />

      {/* SECCIÓN "What We Do" */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-58 md:text-7xl neutra-font-black text-blue-600 mb-8 text-center drop-shadow-md">{t("whatWeDo")}</h2>
            <p className="text-2xl text-gray-700 mb-12 max-w-4xl mx-auto neutra-font text-center">{t("whatWeDoDescription")}</p>
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="border-2 border-blue-100 rounded-2xl p-12 bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">{t("weSpecialize")}</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  {t("weSpecializeDescription")}
                </p>
              </div>
              <div className="border-2 border-blue-100 rounded-2xl p-12 bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">{t("globalVision")}</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  {t("globalVisionDescription")}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="border-2 border-blue-100 rounded-2xl p-12 bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">{t("noGuesswork")}</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  {t("noGuessworkDescription")}
                </p>
              </div>
              <div className="border-2 border-blue-100 rounded-2xl p-12 bg-white shadow-xl hover:shadow-2xl transition-shadow">
                <h3 className="text-4xl md:text-5xl neutra-font-bold text-blue-600 mb-6">{t("realTeam")}</h3>
                <p className="text-lg text-gray-700 neutra-font">
                  {t("realTeamDescription")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SEPARADOR */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />

      {/* SECCIÓN "HOW We Do" - Valores con tooltips más compactos */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-b from-blue-50 via-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12 relative">
              {values.map((value, index) => {
                const IconComponent = value.icon
                return (
                  <div
                    key={index}
                    className="text-center relative bg-white rounded-xl shadow-lg p-8 border border-blue-100 hover:shadow-2xl transition-shadow"
                    onMouseEnter={() => setHoveredValue(value.name)}
                    onMouseLeave={() => setHoveredValue(null)}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg neutra-font-bold text-blue-700 mb-2">{value.name}</h3>
                    {/* Tooltip */}
                    {hoveredValue === value.name && (
                      <div className="absolute z-10 bg-blue-700 text-white p-3 rounded-lg shadow-lg max-w-xs text-sm neutra-font leading-relaxed -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full">
                        {value.tooltip}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-700"></div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      {/* SEPARADOR */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />

      {/* SECCIÓN "HOW We Do" - Proceso con navegación */}
      <section className="w-full py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-7xl neutra-font-black text-blue-600 mb-12 text-center drop-shadow-md">
              {t("howWeDo")}
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Imagen del paso actual */}
              <div className="relative">
                <Image
                  src={processSteps[currentStep - 1].image || "/animacion1.png"}
                  alt={processSteps[currentStep - 1].title}
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-[400px] border-2 border-blue-100 shadow-lg"
                />
              </div>
              {/* Contenido del paso actual */}
              <div>
                <h3 className="text-4xl neutra-font-bold text-blue-600 mb-6">
                  {processSteps[currentStep - 1].title}
                </h3>
                <p className="text-lg text-gray-700 neutra-font mb-8">
                  {processSteps[currentStep - 1].description}
                </p>
                <div className="flex items-center justify-between">
                  {/* Navegación con botones circulares */}
                  <div className="flex items-center gap-6">
                    <button
                    onClick={prevStep}
                      className="w-12 h-12 rounded-full bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg group"
                      aria-label="Previous step"
                    >
                      <ChevronLeft className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
                    </button>
                    <span className="text-blue-600 neutra-font-bold">
                      {currentStep} / {processSteps.length}
                    </span>
                    <button
                      onClick={nextStep}
                      className="w-12 h-12 rounded-full bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg group"
                      aria-label="Next step"
                  >
                      <ChevronRight className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  </div>
                  {/* Botón "Start Now" solo en el último paso */}
                  {currentStep === processSteps.length && (
                    <Link href="/disena">
                  <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full neutra-font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        {t("startProject")}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SEPARADOR */}
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />

      {/* SECCIÓN "Meet the Founders" */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50 via-white to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Título */}
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-7xl neutra-font-black text-gray-900 mb-4 drop-shadow-md">
                {t("meetTheFounders")} <span className="text-blue-600">{t("founders")}</span>
              </h2>
            </div>
            {/* Tarjetas de fundadores */}
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Sofía Solarte */}
              <div className="bg-white rounded-2xl p-10 shadow-2xl text-center border-2 border-blue-100 hover:shadow-blue-200 transition-shadow">
                <div className="mb-6">
                  <Image
                    src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
                    alt="Sofía Solarte"
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                  />
                  <h3 className="text-2xl neutra-font-bold text-blue-700 mb-2">Sofía Solarte</h3>
                  <p className="text-gray-600 neutra-font">{t("coFounderArchitect")}</p>
                </div>
                {/* Redes sociales */}
                <div className="flex justify-center gap-4">
                  <Link href="https://www.linkedin.com/in/sofia-solarte-cabrera-0143b4157/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </Link>
                  <Link href="https://www.instagram.com/sosolarte?igsh=MXhtZmFsamlnOXRxMQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Juan José Lima */}
              <div className="bg-white rounded-2xl p-10 shadow-2xl text-center border-2 border-blue-100 hover:shadow-blue-200 transition-shadow">
                <div className="mb-6">
                  <Image
                    src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=CollarSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light"
                    alt="Juan José Lima"
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                  />
                  <h3 className="text-2xl neutra-font-bold text-blue-700 mb-2">Juan José Lima</h3>
                  <p className="text-gray-600 neutra-font">{t("coFounderIndustrialDesigner")}</p>
                </div>
                {/* Redes sociales */}
                <div className="flex justify-center gap-4">
                  <Link href="https://www.linkedin.com/in/juanjose-lima/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </Link>
                  <Link href="https://www.instagram.com/limao9?igsh=eXB3dHU4cGdxcHRp" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 2C5.68 4 4 5.68 4 7.75v8.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-8.5C20 5.68 18.32 4 16.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-.25a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
                    </svg>
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
