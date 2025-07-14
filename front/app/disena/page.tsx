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
import axios from "axios"
import { useRouter } from "next/navigation"

// Tipos para los datos de la API
interface Category {
  id: number;
  name: string;
  emoji?: string;
}
interface Service {
  id: number;
  category_id: number;
  name_en: string;
  name_es: string;
  price_min_usd: number | null;
  area_max_m2: number | null;
  max_units: number | null;
  notes?: string;
  image?: string;
}
interface ConfigItem {
  key: string;
  value: string;
}

// Mapeo de áreas máximas y máximos permitidos por servicio (extraído de README_U2Group.md)
const SERVICE_AREA_MAX: Record<string, number | undefined> = {
  // Espacios básicos
  "Large room": 18,
  "Medium room": 14,
  "Small room": 10,
  "Large full bathroom": 16,
  "Medium full bathroom": 14,
  "Small full bathroom": 6,
  "Large social bathroom (half bath)": 6,
  "Small social bathroom (half bath)": 2,
  "Floor": undefined,
  "Attic": undefined,
  "Basement": undefined,
  "Parking": 14,
  "Laundry and storage room": 8,
  // Funcionalidad del hogar
  "Multifunctional garage": 40,
  "Walking closet": 10,
  "Accessible room for the elderly": 14,
  "Space for pets": 6,
  // Trabajo & Creatividad
  "Personal office or hybrid coworking": 16,
  "Executive or board room": 20,
  "Recording studio / podcast": 16,
  "Creative craft workshop": 18,
  "Mini warehouse / e-commerce logistics": 10,
  "Convertible flexible space": 12,
  // Bienestar & Salud
  "Home gym": 20,
  "Sauna or steam bath": 6,
  "Meditation / yoga / mindfulness": 10,
  "Library or reading room": 14,
  "Sensory / therapeutic room": 14,
  // Naturaleza & Sustentabilidad
  "Indoor garden / green wall": undefined,
  "Green roof or living terrace": undefined,
  "Urban vegetable garden (outdoor/indoor)": undefined,
  "Rainwater harvesting system": undefined,
  "Outdoor multifunctional space (gardening)": undefined,
  "Composting": 12,
  "Drying": 12,
  "Greenhouse": 12,
  "Solar panels + backup": undefined,
  // Entretenimiento & Social
  "Game room / indoor cinema": 20,
  "Integrated bar or cellar": 8,
  "BBQ + outdoor kitchen + covered dining room": 26,
  "Firepit + chill zone": 12,
  "Social rooftop with veranda": undefined,
  "Projector or outdoor cinema": 18,
  "Outdoor playground": 20,
  "Swimming pool": 18,
};
const SERVICE_MAX_UNITS: Record<string, number | undefined> = {
  "Large room": 5,
  "Large full bathroom": 5,
  "Large social bathroom (half bath)": 3,
  "Parking": 5,
  "Laundry and storage room": 2,
  // ... puedes agregar más si lo deseas ...
};

export default function DisenaPage() {
  const { t, language } = useLanguage()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
  const router = useRouter();

  // Estado para datos dinámicos
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [config, setConfig] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Estado para selección
  const [activeTab, setActiveTab] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<Record<number, any[]>>({})
  const [showQuote, setShowQuote] = useState(false)
  const [currentMainImage, setCurrentMainImage] = useState<string>("/images/u2-logo.png")
  // Estado para el área total
  const [areaTotal, setAreaTotal] = useState<number>(0)
  // Estado para mostrar alerta de área insuficiente al intentar cotizar
  const [showAreaAlert, setShowAreaAlert] = useState(false)
  // Estado para mostrar alerta de área excedida al intentar cotizar
  const [showAreaExceededAlert, setShowAreaExceededAlert] = useState(false)

  // Cargar datos desde la API
  useEffect(() => {
    setLoading(true)
    Promise.all([
      axios.get(`${API_URL}/categorias/`),
      axios.get(`${API_URL}/servicios/`),
      axios.get(`${API_URL}/configuracion/`)
    ])
      .then(([catRes, servRes, confRes]) => {
        setCategories(catRes.data as Category[])
        setServices(servRes.data as Service[])
        setConfig(confRes.data as ConfigItem[])
        setActiveTab((catRes.data as Category[])[0]?.id?.toString() || "")
      })
      .catch((err) => {
        setError("Error al cargar datos de diseño")
      })
      .finally(() => setLoading(false))
  }, [])

  // Función para manejar selección de servicios
  const handleOptionSelect = (categoryId: number, service: any) => {
    setSelectedOptions((prev) => {
      const current = prev[categoryId] || []
      const exists = current.find((o: any) => o.id === service.id)
      let newOptions
        if (exists) {
        newOptions = { ...prev, [categoryId]: current.filter((o: any) => o.id !== service.id) }
      } else {
        newOptions = { ...prev, [categoryId]: [...current, service] }
      }
      updateMainImage(newOptions)
      return newOptions
    })
  }

  // Actualizar imagen principal (muestra la imagen del último servicio seleccionado)
  const updateMainImage = (options: Record<number, any[]>) => {
    // Buscar el último servicio seleccionado en cualquier categoría
    const allSelected = Object.values(options).flat();
    if (allSelected.length > 0) {
      const lastSelected = allSelected[allSelected.length - 1];
      if (lastSelected.image) {
        setCurrentMainImage(
          lastSelected.image.startsWith('http')
            ? lastSelected.image
            : `http://localhost:8000/media/${lastSelected.image.startsWith('services/') ? lastSelected.image : 'services/' + lastSelected.image}`
        );
        return;
      }
    }
    setCurrentMainImage("/images/u2-logo.png");
  }

  // Calcular precio total
  const calculateTotal = () => {
    let total = 0
    Object.values(selectedOptions).forEach((options: any) => {
      options.forEach((option: any) => {
        total += option.price_min_usd || 0
      })
    })
    return total
  }

  // Calcular área ocupada
  const calculateAreaUsed = () => {
    let total = 0
    Object.values(selectedOptions).forEach((options: any) => {
      options.forEach((option: any) => {
        const area = SERVICE_AREA_MAX[option.name_en] || 0
        total += area
      })
    })
    return total
  }

  // Calcular porcentaje de área ocupada
  const areaUsed = calculateAreaUsed()
  const areaPercent = areaTotal > 0 ? Math.round((areaUsed / areaTotal) * 100) : 0
  const areaMissing = areaTotal > 0 ? Math.max(areaTotal - areaUsed, 0) : 0

  // Sugerencias de servicios que caben en el área faltante
  const serviceSuggestions = Object.entries(SERVICE_AREA_MAX)
    .filter(([name, area]) => area && areaMissing >= area)
    .map(([name, area]) => {
      // Buscar el servicio en la lista para obtener el nombre en español
      const service = services.find(s => s.name_en === name)
      return service ? `${service.name_es} (${service.name_en}, ${area} m²)` : `${name} (${area} m²)`
    })

  // Renderizado
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando datos de diseño...</div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>
  }

  // Pantalla de cotización final con Cal.com integrado
  if (showQuote) {
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
                  {Object.entries(selectedOptions).map(([categoryId, options]: any) => {
                    if (options.length === 0) return null
                    const category = categories.find((c) => c.id.toString() === categoryId)
                    const categoryTotal = options.reduce((sum: number, opt: any) => sum + (opt.price_min_usd || 0), 0)
                    return (
                      <div key={categoryId} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="neutra-font-bold text-blue-600 capitalize">{category?.name}</h4>
                          <span className="neutra-font-bold">${categoryTotal}</span>
                        </div>
                        {options.map((option: any) => (
                          <div key={option.id} className="flex justify-between text-sm text-gray-600 ml-4">
                            <span className="neutra-font">{language === "es" ? option.name_es : option.name_en}</span>
                            <span className="neutra-font">${option.price_min_usd || 0}</span>
                          </div>
                        ))}
                      </div>
                    )
                  })}
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
                {/* Input para el correo Gmail en la cotización */}
                <div className="mt-6 mb-6 max-w-md mx-auto">
                  <label htmlFor="cotizacionEmail" className="block text-blue-700 font-bold mb-2">Correo Gmail para recibir la factura:</label>
                  <input
                    id="cotizacionEmail"
                    type="email"
                    placeholder="tucorreo@gmail.com"
                    className="w-full border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {/* Botones de navegación */}
                <div className="flex gap-4">
                  <Button onClick={() => {
                    setShowQuote(false);
                    router.push('/');
                  }} variant="outline" className="flex-1 neutra-font">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("back") || "Atrás"}
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
  return (
    <div className="min-h-screen bg-white neutra-font">
      <Header currentPage="disena" />
      <section className="w-full py-10 md:py-20 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="w-full px-2 md:container md:mx-auto md:px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("designTitle")}</h1>
            <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("designSubtitle")}</p>
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      {/* Navegación de pestañas */}
      <div className="bg-white border-b">
        <div className="w-full px-2 md:container md:mx-auto md:px-4">
          <div className="flex gap-2 py-4 overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id.toString())}
                className={`px-4 py-2 rounded-lg text-lg neutra-font transition-colors shadow-md mx-1 mb-2 ${
                  activeTab === cat.id.toString() ? "bg-blue-600 text-white scale-105" : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
                }`}
              >
                <span className="mr-2">{cat.emoji}</span> {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imagen principal del diseño - DINÁMICA */}
          <div className="lg:col-span-2">
            {/* Input para el área total */}
            <div className="mb-4 flex items-center gap-4">
              <label htmlFor="areaTotal" className="font-bold text-blue-700">Área total de la casa (m²):</label>
              <input
                id="areaTotal"
                type="number"
                min={1}
                className="border border-blue-200 rounded px-3 py-1 w-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={areaTotal > 0 ? areaTotal : ""}
                onChange={e => setAreaTotal(Number(e.target.value))}
                placeholder="Ej: 120"
              />
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 bg-white border-2 border-blue-100 shadow-lg">
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
            {/* Barra de progreso de selección de categorías */}
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="text-2xl">🔥</div>
              <div className="flex-1 h-4 bg-blue-100 rounded-full overflow-hidden relative">
                <div className="h-4 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: `${areaPercent}%` }} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-700">
                  {areaPercent}% completado
                </div>
              </div>
            </div>
            {/* Alerta visual si falta área */}
            {areaTotal > 0 && areaUsed < areaTotal && (
              <div className="text-red-600 font-bold text-sm mb-4 px-2">Te falta llenar {areaMissing} m² del área total</div>
            )}
            {/* Alerta visual si excede el área total */}
            {areaTotal > 0 && areaUsed > areaTotal && (
              <div className="text-red-600 font-bold text-sm mb-4 px-2">Has excedido el área total disponible. Reduce la selección o ajusta el área.</div>
            )}
          </div>
          {/* Panel de configuración lateral con altura fija y scroll */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col border-2 border-blue-100 h-[630px] overflow-y-auto">
              {/* Header del panel */}
              <div className="p-4 border-b flex-shrink-0">
                <h2 className="text-xl neutra-font-bold text-blue-600">
                  {t("chooseThe") || "Elige los"} {categories.find((c) => c.id.toString() === activeTab)?.name}
                </h2>
              </div>
              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                  {services.filter((s) => s.category_id.toString() === activeTab).map((service) => {
                    // Calcular cantidad seleccionada de este servicio
                    const selectedCount = (selectedOptions[service.category_id] || []).filter((o: any) => o.id === service.id).length
                    const maxUnits = SERVICE_MAX_UNITS[service.name_en];
                                return (
                          <Card
                        key={service.id}
                            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                          selectedOptions[service.category_id]?.some((o: any) => o.id === service.id)
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                        onClick={() => handleOptionSelect(service.category_id, service)}
                          >
                            <div className="flex items-center gap-3">
                          {service.image && (
                                <Image
                              src={
                                service.image.startsWith('http')
                                  ? service.image
                                  : `http://localhost:8000/media/${service.image.startsWith('services/') ? service.image : 'services/' + service.image}`
                              }
                              alt={service.name_es}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                              )}
                              <div className="flex-1">
                            <h4 className="neutra-font-bold text-gray-900 text-sm">{language === "es" ? service.name_es : service.name_en}</h4>
                            <p className="text-xs text-blue-600 neutra-font">${service.price_min_usd || 0} USD</p>
                            {SERVICE_AREA_MAX[service.name_en] && (
                              <p className="text-xs text-gray-500">Área: {SERVICE_AREA_MAX[service.name_en]} m²</p>
                            )}
                              </div>
                              {/* Checkmark para opciones seleccionadas */}
                          {selectedOptions[service.category_id]?.some((o: any) => o.id === service.id) && (
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
                        {/* Alerta visual si excede el máximo */}
                        {maxUnits && selectedCount > maxUnits && (
                          <div className="text-red-600 font-bold text-xs mt-2">Excediste el máximo permitido para este servicio ({maxUnits})</div>
                        )}
                          </Card>
                    );
                  })}
                  </div>
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
                    onClick={() => {
                      if (areaTotal > 0 && areaUsed < areaTotal) {
                        setShowAreaAlert(true);
                        setShowAreaExceededAlert(false);
                        return;
                      }
                      if (areaTotal > 0 && areaUsed > areaTotal) {
                        setShowAreaAlert(false);
                        setShowAreaExceededAlert(true);
                        return;
                      }
                      setShowAreaAlert(false);
                      setShowAreaExceededAlert(false);
                      setShowQuote(true);
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 neutra-font-black text-sm shadow-xl"
                  >
                    {t("getYourQuote") || "Obtén tu Cotización"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {/* Modal de alerta visual si falta área, solo al intentar cotizar */}
                  {showAreaAlert && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold"
                          onClick={() => setShowAreaAlert(false)}
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                        <div className="text-red-600 font-bold text-lg mb-2 text-center">
                          Te falta llenar <b>{areaMissing} m²</b> del área total para poder cotizar.
                        </div>
                        {serviceSuggestions.length > 0 ? (
                          <div className="mt-4">
                            <div className="text-blue-700 font-semibold mb-2 text-center">Puedes agregar alguno de estos espacios:</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto">
                              {Object.entries(SERVICE_AREA_MAX)
                                .filter(([name, area]) => area && areaMissing >= area)
                                .map(([name, area], i) => {
                                  const service = services.find(s => s.name_en === name)
                                  return (
                                    <div key={i} className="flex items-center gap-3 bg-blue-50 rounded p-2">
                                      {service?.image && (
                                        <Image src={service.image} alt={service.name_es} width={40} height={40} className="rounded object-cover" />
                                      )}
                                      <div>
                                        <div className="font-bold text-gray-800 text-sm">{service ? service.name_es : name}</div>
                                        <div className="text-xs text-gray-500">{service ? service.name_en : name}</div>
                                        <div className="text-xs text-blue-700">Área: {area} m²</div>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 text-center text-blue-700">O reduce el área total para ajustarla al área ocupada.</div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                          <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-bold"
                            onClick={() => {
                              setAreaTotal(areaUsed);
                              setShowAreaAlert(false);
                            }}
                          >
                            Reducir área total a {areaUsed} m²
                          </button>
                          <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold"
                            onClick={() => setShowAreaAlert(false)}
                          >
                            Cerrar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Alerta visual si excede el área, solo al intentar cotizar */}
                  {showAreaExceededAlert && (
                    <div className="text-red-600 font-bold text-sm mt-2">Has excedido el área total disponible. Reduce la selección o ajusta el área para poder cotizar.</div>
                  )}
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
