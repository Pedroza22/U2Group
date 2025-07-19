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
  "Floor": 3,
};

export default function DisenaPage() {
  const { t, language } = useLanguage()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
  const router = useRouter();

  // Mapeo de traducciones para categorías
  const categoryTranslationMap: Record<string, string> = {
    "Espacios básicos": t("basicSpaces"),
    "Funcionalidad del hogar": t("homeFunction"),
    "Trabajo & Creatividad": t("workAndCreativity"),
    "Bienestar & Salud": t("wellnessAndHealth"),
    "Naturaleza & Sustentabilidad": t("natureAndSustainability"),
    "Entretenimiento & Social": t("entertainmentAndSocial"),
  };

  // Estado para datos dinámicos
  const [categories, setCategories] = useState<Category[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [config, setConfig] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Estado para selección
  const [activeTab, setActiveTab] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<Record<number, Record<number, number>>>({} as Record<number, Record<number, number>>)
  const [showQuote, setShowQuote] = useState(false)
  const [currentMainImage, setCurrentMainImage] = useState<string>("/images/u2-logo.png")
  // Estado para el área total
  const [areaTotal, setAreaTotal] = useState<number>(0)
  // Estado para mostrar alerta de área insuficiente al intentar cotizar
  const [showAreaAlert, setShowAreaAlert] = useState(false)
  // Estado para mostrar alerta de área excedida al intentar cotizar
  const [showAreaExceededAlert, setShowAreaExceededAlert] = useState(false)

  // Estado para el email y feedback
  const [cotizacionEmail, setCotizacionEmail] = useState("");
  const [enviandoFactura, setEnviandoFactura] = useState(false);
  const [facturaEnviada, setFacturaEnviada] = useState(false);
  const [errorEnvioFactura, setErrorEnvioFactura] = useState("");

  const [totalArea, setTotalArea] = useState(80);
  const [showMaxAreaAlert, setShowMaxAreaAlert] = useState(false);

  // Estado para mostrar el modal de sugerencias
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 1000) {
      setTotalArea(1000);
      setShowMaxAreaAlert(true);
    } else if (value < 80) {
      setTotalArea(80); // mínimo
      setShowMaxAreaAlert(false);
    } else {
      setTotalArea(value);
      setShowMaxAreaAlert(false);
    }
  };

  // Botón de cotizar: mostrar modal de sugerencias si falta área
  const handleCotizar = () => {
    if (areaPercent !== 100) {
      setShowSuggestionsModal(true);
      setShowAreaAlert(false);
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
  };

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
        setError("Error loading design data")
      })
      .finally(() => setLoading(false))
  }, [])

  // Selección por defecto de espacios básicos (suma 40m²)
  useEffect(() => {
    if (services.length === 0) return;
    // Nombres de los servicios a seleccionar por defecto
    const defaultNames = [
      "Small room",
      "Small full bathroom",
      "Small social bathroom (half bath)",
      "Parking",
      "Laundry and storage room"
    ];
    // Filtrar los servicios por nombre
    const defaultServices = services.filter(s => defaultNames.includes(s.name_en));
    // Agrupar por categoría
    const grouped: Record<number, Record<number, number>> = {};
    defaultServices.forEach(s => {
      if (!grouped[s.category_id]) grouped[s.category_id] = {};
      grouped[s.category_id][s.id] = 1;
    });
    setSelectedOptions(grouped);
  }, [services]);

  // Función para manejar selección de servicios (con cantidad)
  const handleOptionQuantity = (categoryId: number, service: Service, delta: number, maxUnits?: number) => {
    setSelectedOptions((prev) => {
      const cat = prev[categoryId] || {};
      const currentQty = cat[service.id] || 0;
      let newQty = currentQty + delta;
      if (newQty < 0) newQty = 0;
      if (maxUnits && newQty > maxUnits) newQty = maxUnits;
      const newCat = { ...cat, [service.id]: newQty };
      if (newQty === 0) delete newCat[service.id];
      const newOptions = { ...prev, [categoryId]: newCat };
      updateMainImage(newOptions);
      return newOptions;
    });
  };

  // Actualizar imagen principal (muestra la imagen del último servicio seleccionado)
  const updateMainImage = (options: Record<number, Record<number, number>>) => {
    // Generar un array de servicios seleccionados según la cantidad
    const allSelected: Service[] = [];
    Object.entries(options).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        if (service) {
          for (let i = 0; i < qty; i++) {
            allSelected.push(service);
          }
        }
      });
    });
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
  };

  // Calcular precio total
  // Sumar el precio de los servicios seleccionados más el área total (cada m² = $1)
  const calculateServicesTotal = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        if (service) {
          total += (service.price_min_usd || 0) * qty;
        }
      });
    });
    return total;
  };
  const calculateTotal = () => calculateServicesTotal() + totalArea;

  // Calcular área ocupada por los servicios seleccionados
  const calculateAreaUsed = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        if (service) {
          const area = SERVICE_AREA_MAX[service.name_en] || 0;
          total += area * qty;
        }
      });
    });
    return total;
  };

  // Área ocupada por los servicios por defecto (40m²)
  const DEFAULT_AREA = 40;
  // Calcular área ocupada por otros servicios (excluyendo los por defecto)
  const defaultNames = [
    "Small room",
    "Small full bathroom",
    "Small social bathroom (half bath)",
    "Parking",
    "Laundry and storage room"
  ];
  const areaUsed = calculateAreaUsed();
  const areaUsedByDefaults = Object.entries(selectedOptions).reduce((sum, [catId, servicesObj]) => {
    return sum + Object.entries(servicesObj).reduce((catSum, [serviceId, qty]) => {
      const service = services.find(s => s.id === Number(serviceId));
      if (service && defaultNames.includes(service.name_en)) {
        return catSum + (SERVICE_AREA_MAX[service.name_en] || 0) * qty;
      }
      return catSum;
    }, 0);
  }, 0);
  const areaUsedByOthers = areaUsed - areaUsedByDefaults;
  // Área restante para el usuario (descontando los 40m² por defecto)
  const areaRestante = totalArea - DEFAULT_AREA - areaUsedByOthers;

  // Calcular porcentaje de área ocupada SOLO del área adicional
  const areaAdicional = totalArea - DEFAULT_AREA;
  const areaPercent = areaAdicional > 0 ? Math.round((areaUsedByOthers / areaAdicional) * 100) : 0;
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
    return <div className="min-h-screen flex items-center justify-center">Loading design data...</div>
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
                  {categories.map((category) => {
                    const servicesObj = selectedOptions[category.id] || {};
                    if (Object.keys(servicesObj).length === 0) return null;
                    const categoryTotal = (Object.entries(servicesObj) as [string, number][]).reduce((sum, [serviceId, qty]) => sum + ((services.find(s => s.id === Number(serviceId))?.price_min_usd || 0) * qty), 0);
                    return (
                      <div key={category.id} className="border-b pb-2">
                        <div className="flex justify-between items-center">
                          <h4 className="neutra-font-bold text-blue-600 capitalize">{categoryTranslationMap[category.name] || category.name}</h4>
                          <span className="neutra-font-bold">${categoryTotal}</span>
                        </div>
                        {(Object.entries(servicesObj) as [string, number][]).map(([serviceId, cantidad]) => {
                          const service = services.find(s => s.id === Number(serviceId));
                          if (!service || cantidad === 0) return null;
                          return (
                            <div key={serviceId} className="flex justify-between text-sm text-gray-600 ml-4">
                              <span className="neutra-font">{language === "es" ? service.name_es : service.name_en} x {cantidad}</span>
                              <span className="neutra-font">${(service.price_min_usd || 0) * cantidad}</span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                 {/* Desglose del total de servicios */}
                 <div className="border-b pb-2">
                   <div className="flex justify-between items-center">
                     <h4 className="neutra-font-bold text-blue-600">{t("totalServices") || "Total servicios"}</h4>
                     <span className="neutra-font-bold">${calculateServicesTotal()}</span>
                   </div>
                 </div>
                 {/* Desglose del área total */}
                 <div className="border-b pb-2">
                   <div className="flex justify-between items-center">
                     <h4 className="neutra-font-bold text-blue-600">{t("totalArea") || "Total área"}</h4>
                     <span className="neutra-font-bold">${totalArea}</span>
                   </div>
                   <div className="flex justify-between text-sm text-gray-600 ml-4">
                     <span className="neutra-font">{totalArea} m² x $1 USD</span>
                     <span className="neutra-font">${totalArea}</span>
                   </div>
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
                {/* Input para el correo Gmail en la cotización */}
                <div className="mt-6 mb-6 max-w-md mx-auto">
                  <label htmlFor="cotizacionEmail" className="block text-blue-700 font-bold mb-2">{t("gmailForInvoice") || "Correo Gmail para recibir la factura:"}</label>
                  <input
                    id="cotizacionEmail"
                    type="email"
                    placeholder="tucorreo@gmail.com"
                    className="w-full border border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={cotizacionEmail}
                    onChange={e => setCotizacionEmail(e.target.value)}
                    disabled={enviandoFactura}
                  />
                  <button
                    className="mt-4 w-full bg-blue-600 text-white rounded px-4 py-2 font-bold hover:bg-blue-700 disabled:opacity-50"
                    onClick={async () => {
                      setEnviandoFactura(true);
                      setFacturaEnviada(false);
                      setErrorEnvioFactura("");
                      try {
                        // Construir productos a partir de los servicios seleccionados
                        const productos = Object.entries(selectedOptions).flatMap(([catId, servicesObj]) =>
                          Object.entries(servicesObj).map(([serviceId, qty]) => ({
                            name: services.find(s => s.id === Number(serviceId))?.name_es || "",
                            price: (services.find(s => s.id === Number(serviceId))?.price_min_usd || 0) * qty,
                          }))
                        );
                        await axios.post("http://localhost:8000/api/send-invoice/", {
                          email: cotizacionEmail,
                          products: productos,
                        });
                        setFacturaEnviada(true);
                      } catch (err) {
                        setErrorEnvioFactura(t("invoiceError") || "No se pudo enviar la factura. Verifica el correo o intenta de nuevo.");
                      } finally {
                        setEnviandoFactura(false);
                      }
                    }}
                    disabled={enviandoFactura || !cotizacionEmail || Object.values(selectedOptions).flat().length === 0}
                  >
                    {enviandoFactura ? t("sending") || "Enviando..." : t("sendInvoice") || "Enviar factura"}
                  </button>
                  {facturaEnviada && <p className="text-green-600 mt-2">{t("invoiceSent") || "¡Factura enviada correctamente!"}</p>}
                  {errorEnvioFactura && <p className="text-red-600 mt-2">{errorEnvioFactura}</p>}
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
          <div className="flex flex-wrap gap-2 py-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id.toString())}
                className={`px-3 py-1 rounded-md text-sm neutra-font transition-colors shadow-sm ${
                  activeTab === cat.id.toString()
                    ? "bg-blue-600 text-white scale-100"
                    : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
                }`}
              >
                {categoryTranslationMap[cat.name] || cat.name}
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
              <label htmlFor="areaTotal" className="font-bold text-blue-700">{t("designAreaTitle")}</label>
              <input
                id="areaTotal"
                type="number"
                value={totalArea}
                min={80}
                max={1000}
                onChange={handleAreaChange}
              />
              {showMaxAreaAlert && (
                <div className="text-red-600 font-bold text-xs mt-1">{t("designAreaExceeded")}</div>
              )}
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
                {currentMainImage === "/images/u2-logo.png" ? t("defaultView") : t("customView")}
              </div>
            </div>
            {/* Barra de progreso de selección de categorías */}
            <div className="flex items-center gap-2 mb-2 px-2">
              <div className="text-2xl">🔥</div>
              <div className="flex-1 h-4 bg-blue-100 rounded-full overflow-hidden relative">
                <div className="h-4 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: `${areaPercent}%` }} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-700">
                  {areaPercent}% {t("areaCompleted")}
                </div>
              </div>
            </div>
          </div>
          {/* Panel de configuración lateral con altura fija y scroll */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg flex flex-col border-2 border-blue-100 h-[630px] overflow-y-auto">
              {/* Header del panel */}
              <div className="p-4 border-b flex-shrink-0">
                <h2 className="text-xl neutra-font-bold text-blue-600">
                  {t("chooseThe")} {categories.find((c) => c.id.toString() === activeTab)?.name}
                </h2>
              </div>
              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                  {services.filter((s) => s.category_id.toString() === activeTab).map((service) => {
                    const maxUnits = SERVICE_MAX_UNITS[service.name_en];
                    const selectedQty = selectedOptions[service.category_id]?.[service.id] || 0;
                    return (
                      <Card
                        key={service.id}
                        className={`p-3 transition-all hover:shadow-md ${selectedQty > 0 ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
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
                              <p className="text-xs text-gray-500">{t("area")}: {SERVICE_AREA_MAX[service.name_en]} m²</p>
                            )}
                          </div>
                          {/* Selector de cantidad para servicios con máximo */}
                          {maxUnits ? (
                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-bold text-lg"
                                onClick={() => handleOptionQuantity(service.category_id, service, -1, maxUnits)}
                                disabled={selectedQty === 0}
                              >-</button>
                              <span className="font-bold text-blue-700 min-w-[20px] text-center">{selectedQty}</span>
                              <button
                                className="px-2 py-1 bg-blue-600 text-white rounded font-bold text-lg"
                                onClick={() => handleOptionQuantity(service.category_id, service, 1, maxUnits)}
                                disabled={selectedQty >= maxUnits}
                              >+</button>
                            </div>
                          ) : (
                            <button
                              className={`ml-2 px-3 py-1 rounded ${selectedQty > 0 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                              onClick={() => handleOptionQuantity(service.category_id, service, selectedQty > 0 ? -1 : 1)}
                            >{selectedQty > 0 ? t("remove") : t("add")}</button>
                          )}
                          {/* Checkmark para opciones seleccionadas */}
                          {selectedQty > 0 && (
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
                        {maxUnits && selectedQty > maxUnits && (
                          <div className="text-red-600 font-bold text-xs mt-2">{t("maxUnitsExceeded").replace("{{max}}", maxUnits.toString())}</div>
                        )}
                      </Card>
                    );
                  })}
                  </div>
              </div>
              {/* Panel de precio total - FIJO en la parte inferior */}
              <div className="border-t p-4 bg-white rounded-b-lg flex-shrink-0">
                <div className="text-center mb-4">
                  <p className="text-sm neutra-font-bold text-gray-700">{t("designCost")}</p>
                  <div className="text-2xl neutra-font-black text-blue-600">
                    ${calculateTotal()} <span className="text-sm neutra-font">USD</span>
                  </div>
                </div>
                {/* Botones de acción */}
                <div className="space-y-2">
                  <Button
                    onClick={handleCotizar}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 neutra-font-black text-sm shadow-xl"
                  >
                    {t("getYourQuote")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  {/* Modal flotante de sugerencias al intentar cotizar si falta área */}
                  {showSuggestionsModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in border-2 border-blue-100">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold"
                          onClick={() => setShowSuggestionsModal(false)}
                          aria-label="Cerrar"
                        >
                        </button>
                        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">{t("suggestionsTitle")}</h2>
                        <p className="text-gray-700 mb-4 text-center">{t("suggestionsDescription")}</p>
                        <ul className="space-y-3 max-h-80 overflow-y-auto">
                          {services
                            .filter(s => {
                              const area = SERVICE_AREA_MAX[s.name_en] || 0;
                              // No sugerir los que ya están seleccionados ni los de los defaults
                              const yaSeleccionado = Object.entries(selectedOptions).some(([catId, servicesObj]) => 
                                Object.keys(servicesObj).includes(s.id.toString())
                              );
                              const esDefault = defaultNames.includes(s.name_en);
                              return area > 0 && area <= areaRestante && !yaSeleccionado && !esDefault;
                            })
                            .length === 0 ? (
                              <li className="text-center text-gray-500 flex flex-col items-center gap-4">
                                {t("noSuggestionsAvailable")}
                                <div className="flex gap-3 justify-center mt-2">
                                  {areaUsed > 80 && (
                                    <button
                                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded shadow text-sm"
                                      onClick={() => {
                                        setTotalArea(Math.max(areaUsed, 80)); // Disminuir área restante, nunca menos de 80
                                        setShowSuggestionsModal(false);
                                      }}
                                    >
                                      {t("decreaseRemainingArea")}
                                    </button>
                                  )}
                                  <button
                                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-3 rounded shadow text-sm"
                                    onClick={() => {
                                      setShowSuggestionsModal(false);
                                      setTimeout(() => {
                                        const input = document.querySelector('input[type="number"]#areaTotal') as HTMLInputElement;
                                        if (input) input.focus();
                                      }, 100);
                                    }}
                                  >
                                    {t("increaseTotalArea")}
                                  </button>
                                </div>
                              </li>
                            ) : (
                              services
                                .filter(s => {
                                  const area = SERVICE_AREA_MAX[s.name_en] || 0;
                                  const yaSeleccionado = Object.entries(selectedOptions).some(([catId, servicesObj]) => 
                                    Object.keys(servicesObj).includes(s.id.toString())
                                  );
                                  const esDefault = defaultNames.includes(s.name_en);
                                  return area > 0 && area <= areaRestante && !yaSeleccionado && !esDefault;
                                })
                                .map(s => (
                                  <li key={s.id} className="flex items-center justify-between bg-blue-50 rounded p-3 border border-blue-100">
                                    <div>
                                      <span className="font-bold text-gray-800">{s.name_es}</span>
                                      <span className="text-xs text-blue-700 ml-2">{SERVICE_AREA_MAX[s.name_en]} m²</span>
                                    </div>
                                    <button
                                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded shadow text-sm"
                                      onClick={() => {
                                        setSelectedOptions(prev => {
                                          const current = prev[s.category_id] || {};
                                          return { ...prev, [s.category_id]: { ...current, [s.id]: (current[s.id] || 0) + 1 } };
                                        });
                                      }}
                                    >
                                      {t("add")}
                                    </button>
                                  </li>
                                ))
                            )}
                        </ul>
                        <div className="flex justify-center mt-6">
                          <button
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold"
                            onClick={() => setShowSuggestionsModal(false)}
                          >
                            {t("close")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Alerta visual si excede el área, solo al intentar cotizar */}
                  {showAreaExceededAlert && (
                    <div className="text-red-600 font-bold text-sm mt-2">{t("areaExceededAlert")}</div>
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
