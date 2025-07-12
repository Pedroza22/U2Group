"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { getDesignCategories, getBasicCategories, BASE_PRICE, type DesignOption } from "@/data/design-options"
import { CalEmbed } from "@/components/cal-embed"

export default function DisenaPage() {
  const { t, language } = useLanguage()

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Estado para la navegación entre pestañas
  const [activeTab, setActiveTab] = useState("basics")
  const [selectedOptions, setSelectedOptions] = useState<Record<string, DesignOption[]>>({})
  const [showQuote, setShowQuote] = useState(false)
  const [currentMainImage, setCurrentMainImage] = useState<string>("/images/u2-logo.png")

  // Obtener categorías dinámicamente
  const [designCategories, setDesignCategories] = useState(getDesignCategories())
  const [basicCategories, setBasicCategories] = useState(getBasicCategories())
  const [selectedBasics, setSelectedBasics] = useState<Record<string, number>>({
    floors: 1,
    rooms: 1,
    bathrooms: 1,
    parking: 0,
  })

  // Refrescar categorías cuando se monta el componente
  useEffect(() => {
    setDesignCategories(getDesignCategories())
    setBasicCategories(getBasicCategories())
  }, [])

  // Función para manejar selección de opciones de diseño
  const handleOptionSelect = (categoryId: string, option: DesignOption) => {
    const category = designCategories.find((c) => c.id === categoryId)
    if (!category) return

    setSelectedOptions((prev) => {
      const current = prev[categoryId] || []

      if (category.allowMultiple) {
        const exists = current.find((o) => o.id === option.id)
        if (exists) {
          const newOptions = { ...prev, [categoryId]: current.filter((o) => o.id !== option.id) }
          updateMainImage(newOptions)
          return newOptions
        } else {
          const newOptions = { ...prev, [categoryId]: [...current, option] }
          updateMainImage(newOptions)
          return newOptions
        }
      } else {
        const newOptions = { ...prev, [categoryId]: [option] }
        updateMainImage(newOptions)
        return newOptions
      }
    })
  }

  // Función para manejar selección de categorías básicas
  const handleBasicSelect = (categoryId: string, quantity: number) => {
    setSelectedBasics((prev) => ({
      ...prev,
      [categoryId]: quantity,
    }))

    const category = basicCategories.find((c) => c.id === categoryId)
    if (category && category.image && quantity > 0) {
      setCurrentMainImage(category.image)
    }
  }

  // Función para actualizar la imagen principal según las selecciones
  const updateMainImage = (options: Record<string, DesignOption[]>) => {
    let latestImageOption: DesignOption | null = null

    const priorityCategories = [
      "additions",
      "family",
      "hobbies",
      "sustainability",
      "productivity",
      "interior-design",
      "s2-systems",
    ]

    for (const categoryId of priorityCategories) {
      const categoryOptions = options[categoryId] || []
      if (categoryOptions.length > 0) {
        const lastOption = categoryOptions[categoryOptions.length - 1]
        if (lastOption.image && lastOption.image !== "/placeholder.svg?height=100&width=100") {
          latestImageOption = lastOption
          break
        }
      }
    }

    if (latestImageOption && latestImageOption.image) {
      setCurrentMainImage(latestImageOption.image)
    } else {
      setCurrentMainImage("/images/u2-logo.png")
    }
  }

  // Calcular precio total del diseño
  const calculateTotal = () => {
    let total = BASE_PRICE

    basicCategories.forEach((category) => {
      const quantity = selectedBasics[category.id] || 0
      total += quantity * category.pricePerUnit
    })

    Object.values(selectedOptions).forEach((options) => {
      options.forEach((option) => {
        total += option.price
      })
    })
    return total
  }

  // Obtener opciones seleccionadas para una categoría específica
  const getSelectedForCategory = (categoryId: string) => {
    return selectedOptions[categoryId] || []
  }

  // Verificar si una opción específica está seleccionada
  const isOptionSelected = (categoryId: string, optionId: string) => {
    const selected = getSelectedForCategory(categoryId)
    return selected.some((option) => option.id === optionId)
  }

  // Pestañas de navegación con traducciones
  const tabs = [
    { id: "basics", name: t("basics") || "Basics" },
    { id: "additions", name: t("additions") || "Additions" },
    { id: "family", name: t("family") || "Family" },
    { id: "sustainability", name: t("sustainability") || "Sustainability" },
    { id: "productivity", name: t("productivity") || "Productivity" },
    { id: "hobbies", name: t("hobbies") || "Hobbies" },
    { id: "interior-design", name: t("interiorDesign") || "Interior Design" },
    { id: "s2-systems", name: t("s2Systems") || "S2 Systems" },
    { id: "get-quote", name: t("getYourQuote") || "Get Your Quote" },
  ]

  // Pantalla de cotización final con Cal.com integrado
  if (showQuote || activeTab === "get-quote") {
    return (
      <div className="min-h-screen bg-white neutra-font">
        <Header currentPage="disena" />
        <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("getYourQuote")}</h1>
              <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("readyToStart")}</p>
            </div>
          </div>
        </section>
        <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
        {/* Contenido de la cotización con Cal.com */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* LADO IZQUIERDO - Resumen del proyecto */}
            <div className="lg:col-span-1">
              <div className="text-center">
                {/* Imagen del proyecto */}
                <div className="mb-8">
                  <Image
                    src={currentMainImage || "/placeholder.svg"}
                    alt="House Design"
                    width={600}
                    height={300}
                    className="w-full rounded-2xl object-cover border-2 border-blue-100 shadow-lg"
                  />
                </div>
                {/* Información del proyecto */}
                <div className="mb-6">
                  <h2 className="text-2xl neutra-font-bold text-blue-600 mb-2">
                    {t("interestedIn") || "Estás interesado en"}
                  </h2>
                  <p className="text-xl neutra-font-bold text-gray-900">{t("architecturalDesign")}</p>
                </div>
                {/* Código del proyecto */}
                <div className="mb-6">
                  <h3 className="text-lg neutra-font-bold text-gray-900 mb-2">
                    {t("designSummary") || "RESUMEN DE DISEÑO"}
                  </h3>
                  <p className="text-blue-600 neutra-font">
                    {t("projectCode") || "Código de Proyecto"}: <span className="neutra-font-bold">U2-84806G</span>
                  </p>
                </div>
                {/* Desglose de costos por categoría */}
                <div className="space-y-4 mb-8 text-left">
                  {Object.entries(selectedOptions).map(([categoryId, options]) => {
                    if (options.length === 0) return null
                    const category = designCategories.find((c) => c.id === categoryId)
                    const categoryTotal = options.reduce((sum, opt) => sum + opt.price, 0)
                    return (
                      <div key={categoryId} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="neutra-font-bold text-blue-600 capitalize">{category?.name}</h4>
                          <span className="neutra-font-bold">${categoryTotal}</span>
                        </div>
                        {options.map((option) => (
                          <div key={option.id} className="flex justify-between text-sm text-gray-600 ml-4">
                            <span className="neutra-font">{option.name}</span>
                            <span className="neutra-font">${option.price}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })}
                  {/* Precio base */}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="neutra-font-bold text-blue-600">{t("basics") || "Básicos"}</span>
                    <span className="neutra-font">${BASE_PRICE}</span>
                  </div>
                </div>
                {/* Precio total */}
                <div className="text-center mb-8">
                  <div className="text-4xl neutra-font-black text-blue-600 mb-4">
                    ${calculateTotal()} <span className="text-lg neutra-font">USD</span>
                  </div>
                  <p className="text-gray-600 neutra-font mb-6">
                    {t("readyToStart") || "¿Listo para comenzar tu proyecto?"}
                  </p>
                </div>
                {/* Botones de navegación */}
                <div className="flex gap-4">
                  <Button onClick={() => setShowQuote(false)} variant="outline" className="flex-1 neutra-font">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("back")}
                  </Button>
                  <Link href="/contacto" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white neutra-font-black shadow-xl text-lg">
                      {t("contactUs") || "Contáctanos"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* LADO DERECHO - Calendario Cal.com */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl neutra-font-bold text-blue-600 mb-4">
                  {t("scheduleConsultation") || "Agenda una Consulta"}
                </h3>
                <p className="text-gray-600 neutra-font mb-6">
                  {t("bookMeeting") || "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle."}
                </p>
              </div>
              {/* Integración de Cal.com */}
              <div className="bg-white rounded-2xl shadow-lg p-4 min-h-[500px] border-2 border-blue-100">
                <CalEmbed
                  calLink="jara-u2group-lrzdfm/consulta-arquitectura?overlayCalendar=true"
                  showDemo={false}
                  config={{
                    theme: "light",
                    hideEventTypeDetails: false,
                    layout: "month_view",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Pantalla principal de configuración
  const currentCategory = designCategories.find((c) => c.id === activeTab)

  return (
    <div className="min-h-screen bg-white neutra-font">
      <Header currentPage="disena" />
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("designTitle")}</h1>
            <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("designSubtitle")}</p>
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      {/* Navegación de pestañas */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id === "get-quote") setShowQuote(true)
                }}
                className={`px-4 py-2 rounded-lg text-lg neutra-font transition-colors shadow-md mx-1 mb-2 ${
                  activeTab === tab.id ? "bg-blue-600 text-white scale-105" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Imagen principal del diseño - DINÁMICA */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 bg-white border-2 border-blue-100 shadow-lg">
              <Image
                src={currentMainImage || "/placeholder.svg"}
                alt="Design Preview"
                fill
                className="object-contain transition-all duration-500"
                priority
              />
              {/* Indicador de imagen activa */}
              <div className="absolute bottom-4 left-4 bg-blue-700 bg-opacity-80 text-white px-3 py-1 rounded-full text-sm neutra-font">
                {currentMainImage === "/images/u2-logo.png" ? "Vista por defecto" : "Vista personalizada"}
              </div>
            </div>
          </div>
          {/* Panel de configuración lateral con altura fija y scroll */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-8 flex flex-col border-2 border-blue-100" style={{ height: "555px" }}>
              {/* Header del panel */}
              <div className="p-4 border-b flex-shrink-0">
                <h2 className="text-xl neutra-font-bold text-blue-600">
                  {t("chooseThe") || "Elige los"} {language === "es" ? currentCategory?.nameEs : currentCategory?.nameEn}
                </h2>
              </div>
              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto p-4">
                {currentCategory && (
                  <div className="space-y-4">
                    {/* Categoría especial "basics" con opciones agrupadas */}
                    {activeTab === "basics" ? (
                      <>
                        {basicCategories.map((category) => (
                          <div key={category.id} className="mb-6">
                            <h3 className="text-sm neutra-font-bold text-gray-900 mb-3 flex items-center">
                              {category.image && (
                                <Image
                                  src={category.image || "/placeholder.svg"}
                                  alt={category.nameEs}
                                  width={30}
                                  height={30}
                                  className="mr-2 rounded"
                                />
                              )}
                              {category.nameEs}
                            </h3>
                            <div className="grid grid-cols-5 gap-2">
                              {Array.from({ length: category.maxQuantity - category.minQuantity + 1 }, (_, i) => {
                                const quantity = category.minQuantity + i
                                return (
                                  <button
                                    key={quantity}
                                    onClick={() => handleBasicSelect(category.id, quantity)}
                                    className={`px-2 py-2 rounded-lg border-2 transition-colors neutra-font text-sm ${
                                      selectedBasics[category.id] === quantity
                                        ? "border-blue-600 bg-blue-50 text-blue-600"
                                        : "border-gray-300 hover:border-gray-400"
                                    }`}
                                  >
                                    {quantity}
                                  </button>
                                )
                              })}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 neutra-font">
                              {t("price") || "Precio"}: ${category.pricePerUnit} USD por unidad
                            </p>
                          </div>
                        ))}
                      </>
                    ) : (
                      /* Otras categorías con opciones estándar */
                      <div className="space-y-3">
                        {currentCategory.options.map((option) => (
                          <Card
                            key={option.id}
                            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                              isOptionSelected(currentCategory.id, option.id)
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleOptionSelect(currentCategory.id, option)}
                          >
                            <div className="flex items-center gap-3">
                              {/* Imagen */}
                              {option.image && (
                                <Image
                                  src={option.image || "/placeholder.svg"}
                                  alt={language === "es" && option.nameEs ? option.nameEs : option.nameEn || option.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="neutra-font-bold text-gray-900 text-sm">{language === "es" && option.nameEs ? option.nameEs : option.nameEn || option.name}</h4>
                                <p className="text-xs text-blue-600 neutra-font">${option.price} USD</p>
                              </div>
                              {/* Checkmark para opciones seleccionadas */}
                              {isOptionSelected(currentCategory.id, option.id) && (
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* Panel de precio total - FIJO en la parte inferior */}
              <div className="border-t p-4 bg-white rounded-b-lg flex-shrink-0">
                <div className="text-center mb-4">
                  <p className="text-sm neutra-font-bold text-gray-700">{t("designCost") || "Costo del Diseño"}</p>
                  <div className="text-2xl neutra-font-black text-blue-600">
                    ${calculateTotal()} <span className="text-sm neutra-font">USD</span>
                  </div>
                </div>
                {/* Botones de acción */}
                <div className="space-y-2">
                  <Button
                    onClick={() => setShowQuote(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 neutra-font-black text-sm shadow-xl"
                  >
                    {t("getYourQuote") || "Obtén tu Cotización"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 neutra-font-bold text-sm">
                    {t("next") || "Siguiente"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
