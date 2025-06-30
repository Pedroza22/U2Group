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
import { DESIGN_CATEGORIES, BASE_PRICE, type DesignOption } from "@/data/design-options"

export default function DisenaPage() {
  const { t } = useLanguage()

  // Scroll al inicio cuando se carga la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Estado para la navegación entre pestañas
  const [activeTab, setActiveTab] = useState("basics")
  const [selectedOptions, setSelectedOptions] = useState<Record<string, DesignOption[]>>({})
  const [showQuote, setShowQuote] = useState(false)

  // Función para manejar selección de opciones de diseño
  const handleOptionSelect = (categoryId: string, option: DesignOption) => {
    const category = DESIGN_CATEGORIES.find((c) => c.id === categoryId)
    if (!category) return

    setSelectedOptions((prev) => {
      const current = prev[categoryId] || []

      if (category.allowMultiple) {
        // Permitir múltiples selecciones para esta categoría
        const exists = current.find((o) => o.id === option.id)
        if (exists) {
          return { ...prev, [categoryId]: current.filter((o) => o.id !== option.id) }
        } else {
          return { ...prev, [categoryId]: [...current, option] }
        }
      } else {
        // Solo una selección permitida
        return { ...prev, [categoryId]: [option] }
      }
    })
  }

  // Calcular precio total del diseño
  const calculateTotal = () => {
    let total = BASE_PRICE
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

  // Pantalla de cotización final - SIN cuadros blancos
  if (showQuote || activeTab === "get-quote") {
    return (
      <div className="min-h-screen bg-gray-50 neutra-font">
        <Header currentPage="disena" />

        {/* Navegación de pestañas */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 py-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (tab.id === "get-quote") setShowQuote(true)
                    else setShowQuote(false)
                  }}
                  className={`px-4 py-2 rounded-lg text-sm neutra-font transition-colors ${
                    activeTab === tab.id || (showQuote && tab.id === "get-quote")
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido de la cotización - Layout de dos columnas SIN cuadros blancos */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* LADO IZQUIERDO - Resumen del proyecto */}
            <div className="lg:col-span-1">
              <div className="text-center">
                {/* Imagen del proyecto */}
                <div className="mb-8">
                  <Image
                    src="/placeholder.svg?height=300&width=600"
                    alt="House Design"
                    width={600}
                    height={300}
                    className="w-full rounded-lg object-cover"
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
                    const category = DESIGN_CATEGORIES.find((c) => c.id === categoryId)
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
                    <span className="neutra-font-bold text-blue-600">{t("basics") || "Basics"}</span>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white neutra-font">
                      {t("contactUs") || "Contáctanos"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/*Espacio para calendario Cal.app */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl neutra-font-bold text-blue-600 mb-4">
                  {t("scheduleConsultation") || "Agenda una Consulta"}
                </h3>
                <p className="text-gray-600 neutra-font mb-6">
                  {t("bookMeeting") || "Reserva una reunión con nuestro equipo para discutir tu proyecto en detalle."}
                </p>

                {/* Placeholder para Cal*/}
                <div className="bg-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <p className="text-gray-500 neutra-font">
                      {t("calendarPlaceholder") || ""}
                    </p>
                    <p className="text-sm text-gray-400 neutra-font mt-2">Cal.app integration coming soon</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white neutra-font bg-transparent mt-6"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Cita (Próximamente)
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  // Pantalla principal de configuración
  const currentCategory = DESIGN_CATEGORIES.find((c) => c.id === activeTab)

  return (
    <div className="min-h-screen bg-gray-50 neutra-font">
      <Header currentPage="disena" />

      {/* Navegación de pestañas */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  if (tab.id === "get-quote") setShowQuote(true)
                }}
                className={`px-4 py-2 rounded-lg text-sm neutra-font transition-colors ${
                  activeTab === tab.id ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Imagen principal del diseño */}
          <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Modern House Design"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Panel de configuración lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-8">
              <div className="mb-6">
                <h2 className="text-2xl neutra-font-bold text-blue-600 mb-4">
                  {t("chooseThe") || "Choose the"} {currentCategory?.name}
                </h2>

                {/* Opciones de la categoría actual */}
                {currentCategory && (
                  <div className="space-y-4">
                    {/* Categoría especial "basics" con opciones agrupadas */}
                    {activeTab === "basics" ? (
                      <>
                        {/* Selector de pisos */}
                        <div className="mb-6">
                          <h3 className="text-lg neutra-font-bold text-gray-900 mb-3 flex items-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Floors"
                              width={40}
                              height={40}
                              className="mr-3 rounded"
                            />
                            {t("floors") || "Floors"}
                          </h3>
                          <div className="flex gap-2">
                            {[1, 2, 3].map((num) => (
                              <button
                                key={`${num}-floor`}
                                onClick={() =>
                                  handleOptionSelect("basics", {
                                    id: `${num}-floor`,
                                    name: `${num} Floor${num > 1 ? "s" : ""}`,
                                    price: 0,
                                  })
                                }
                                className={`px-4 py-2 rounded-lg border-2 transition-colors neutra-font ${
                                  isOptionSelected("basics", `${num}-floor`)
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 neutra-font">{t("price") || "Precio"}: $0</p>
                        </div>

                        {/* Selector de habitaciones */}
                        <div className="mb-6">
                          <h3 className="text-lg neutra-font-bold text-gray-900 mb-3 flex items-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Rooms"
                              width={40}
                              height={40}
                              className="mr-3 rounded"
                            />
                            {t("rooms") || "Rooms"}
                          </h3>
                          <div className="flex gap-2 flex-wrap">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={`${num}-room`}
                                onClick={() =>
                                  handleOptionSelect("basics", {
                                    id: `${num}-room`,
                                    name: `${num} Room${num > 1 ? "s" : ""}`,
                                    price: 0,
                                  })
                                }
                                className={`px-4 py-2 rounded-lg border-2 transition-colors neutra-font ${
                                  isOptionSelected("basics", `${num}-room`)
                                    ? "border-blue-600 bg-blue-50 text-blue-600"
                                    : "border-gray-300 hover:border-gray-400"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          <p className="text-sm text-gray-500 mt-1 neutra-font">{t("price") || "Precio"}: $0</p>
                        </div>

                        {/* Selector de baños */}
                        <div className="mb-6">
                          <h3 className="text-lg neutra-font-bold text-gray-900 mb-3 flex items-center">
                            <Image
                              src="/placeholder.svg?height=40&width=40"
                              alt="Bath Rooms"
                              width={40}
                              height={40}
                              className="mr-3 rounded"
                            />
                            {t("bathrooms") || "Bath Rooms"}
                          </h3>
                          <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={`${num}-bath`}
                                onClick={() =>
                                  handleOptionSelect("basics", {
                                    id: `${num}-bath`,
                                    name: `${num} Bathroom${num > 1 ? "s" : ""}`,
                                    price: 0,
                                  })
                                }
                                className={`px-3 py-2 rounded-lg border-2 transition-colors neutra-font text-sm ${
                                  isOptionSelected("basics", `${num}-bath`)
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Otras categorías con opciones estándar */
                      <div className="grid gap-4">
                        {currentCategory.options.map((option) => (
                          <Card
                            key={option.id}
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                              isOptionSelected(currentCategory.id, option.id)
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleOptionSelect(currentCategory.id, option)}
                          >
                            <div className="flex items-center gap-3">
                              {option.image && (
                                <Image
                                  src={option.image || "/placeholder.svg"}
                                  alt={option.name}
                                  width={50}
                                  height={50}
                                  className="rounded"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="neutra-font-bold text-gray-900">{option.name}</h4>
                                <p className="text-sm text-blue-600 neutra-font">${option.price} USD</p>
                              </div>
                              {/* Checkmark para opciones seleccionadas */}
                              {isOptionSelected(currentCategory.id, option.id) && (
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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

              {/* Panel de precio total */}
              <div className="border-t pt-6">
                <div className="text-center mb-4">
                  <p className="text-lg neutra-font-bold text-gray-700">{t("designCost")}</p>
                  <div className="text-4xl neutra-font-black text-blue-600">
                    ${calculateTotal()} <span className="text-lg neutra-font">USD</span>
                  </div>
                </div>

                {/* Botón para obtener cotización */}
                <Button
                  onClick={() => setShowQuote(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 neutra-font-bold"
                >
                  {t("getYourQuote")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Botón siguiente */}
                <Button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-3 neutra-font-bold">
                  {t("next")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
