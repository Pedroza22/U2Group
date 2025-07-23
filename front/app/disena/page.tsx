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

// Configuración de servicios según la tabla proporcionada
const SERVICE_CONFIG: Record<string, { default: number | boolean, max: number | boolean, type: 'number' | 'boolean' }> = {
  "Habitación grande": { default: 0, max: 5, type: 'number' },
  "Habitación mediana": { default: 0, max: 5, type: 'number' },
  "Habitación pequeña": { default: 1, max: 5, type: 'number' },
  "Baño completo grande": { default: 0, max: 5, type: 'number' },
  "Baño completo mediano": { default: 0, max: 5, type: 'number' },
  "Baño completo pequeño": { default: 1, max: 5, type: 'number' },
  "Baño social (medio baño) grande": { default: 0, max: 3, type: 'number' },
  "Baño social (medio baño) pequeño": { default: 1, max: 3, type: 'number' },
  "Pisos": { default: 1, max: 10, type: 'number' },
  "Ático": { default: false, max: true, type: 'boolean' },
  "Sótano": { default: false, max: true, type: 'boolean' },
  "Parqueadero": { default: 1, max: 5, type: 'number' },
  "Cuarto de lavado y almacenamiento": { default: 1, max: 2, type: 'number' },
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
  const [selectedOptions, setSelectedOptions] = useState<Record<number, Record<number, number | boolean>>>({} as Record<number, Record<number, number | boolean>>)
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

  // 1. Inicializar área y productos por defecto
  const BASIC_DEFAULT_AREA = 40;
  const INITIAL_AREA = 80;
  const [totalArea, setTotalArea] = useState(INITIAL_AREA);
  const [showMaxAreaAlert, setShowMaxAreaAlert] = useState(false);
  const [areaInput, setAreaInput] = useState(totalArea);

  // Estado para mostrar el modal de sugerencias
  const [showSuggestionsModal, setShowSuggestionsModal] = useState(false);
  const [activeProductId, setActiveProductId] = useState<number | null>(null);

  // 1. Calcular área básica y defaults
  const areaBasica = Math.floor(totalArea * 0.5);
  const areaDefaults = (() => {
    let total = 0;
    services.forEach(service => {
      const config = SERVICE_CONFIG[service.name_es];
      if (config && config.type === 'number' && config.default) {
        total += (SERVICE_AREA_MAX[service.name_en] || 0) * (config.default as number);
      }
    });
    return total;
  })();
  // 2. Calcular área ocupada por todos los productos seleccionados
  const calculateAreaUsed = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        if (service) {
          total += (SERVICE_AREA_MAX[service.name_en] || 0) * (qty as number);
        }
      });
    });
    return total;
  };
  const areaUsed = calculateAreaUsed();
  // 3. Calcular área adicional y restante
  const areaAdicional = totalArea - areaBasica - areaDefaults;
  const areaRestante = Math.max(areaAdicional - (areaUsed - areaDefaults), 0);
  // 4. Sugerencias
  const sugerencias = services.filter(s => {
    const area = SERVICE_AREA_MAX[s.name_en] || 0;
    return area > 0 && area <= areaRestante;
  });
  // Agrupar sugerencias por categoría
  const sugerenciasPorCategoria = categories.map(cat => ({
    ...cat,
    productos: sugerencias.filter(s => s.category_id === cat.id)
  })).filter(cat => cat.productos.length > 0);
  // 5. Barra de progreso
  const areaPercent = areaAdicional <= 0 ? 100 : areaAdicional > 0 ? Math.min(Math.round(((areaUsed - areaDefaults) / areaAdicional) * 100), 100) : 0;

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

  const handleAreaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaInput(e.target.value);
  };

  const handleAreaInputBlur = () => {
    let value = parseInt(areaInput as any) || 80;
    if (value > 1000) value = 1000;
    if (value < 80) value = 80;
    setTotalArea(value);
    setAreaInput(value);
  };

  useEffect(() => {
    setAreaInput(totalArea);
  }, [totalArea]);

  // Botón de cotizar: mostrar modal de sugerencias si falta área
  const handleCotizar = () => {
    if (areaPercent !== 100) {
      setShowSuggestionsModal(true);
      setShowAreaAlert(false);
      setShowAreaExceededAlert(false);
      return;
    }
    if (totalArea > 0 && areaUsed > totalArea) {
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
        // Logs detallados para depuración
        console.log('CATEGORÍAS DESDE API:', catRes.data);
        console.log('SERVICIOS DESDE API:', servRes.data);
        if (Array.isArray(catRes.data)) {
          console.log('Total categorías:', catRes.data.length);
        }
        if (Array.isArray(servRes.data)) {
          console.log('Total servicios:', servRes.data.length);
        }
      })
      .catch((err) => {
        setError("Error loading design data")
      })
      .finally(() => setLoading(false))
  }, [])

  // Inicialización de valores por defecto (productos default = 1)
  useEffect(() => {
    if (services.length === 0) return;
    const grouped: Record<number, Record<number, number | boolean>> = {};
    services.forEach(s => {
      const config = SERVICE_CONFIG[s.name_es];
      if (config) {
      if (!grouped[s.category_id]) grouped[s.category_id] = {};
        grouped[s.category_id][s.id] = config.default;
      }
    });
    setSelectedOptions(grouped);
  }, [services]);

  // Calcular precio: base + extras
  const calculateServicesTotal = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        const config = service ? SERVICE_CONFIG[service.name_es] : undefined;
        if (service && config) {
          if (config.type === 'number') {
            const extras = (qty as number) - (config.default as number);
            if (extras > 0) {
              total += (service.price_min_usd || 0) * extras;
            }
          } else if (config.type === 'boolean' && qty) {
            total += (service.price_min_usd || 0);
          }
        } else if (service) {
          const extras = (qty as number);
          if (extras > 0) {
            total += (service.price_min_usd || 0) * extras;
          }
        }
      });
    });
    return total;
  };
  const calculateTotal = () => {
    return totalArea + calculateServicesTotal();
  };

  // Mensajes según el estado del área
  const areaCompleta = areaRestante === 0 && areaAdicional > 0;
  const areaMinimaOcupada = areaAdicional <= 0;
  // Alerta visual y bloqueo de botones si el área está llena
  const areaLlena = areaAdicional > 0 && areaRestante === 0;
  const areaRestantePositivo = areaRestante > 0;

  // Estado para alerta de intento de agregar producto que no cabe
  const [showNoFitAlert, setShowNoFitAlert] = useState<{show: boolean, nombre: string}>({show: false, nombre: ''});

  // Definir la función updateMainImage para evitar ReferenceError
  const updateMainImage = (options: Record<number, Record<number, number | boolean>>) => {
    // Generar un array de servicios seleccionados según la cantidad
    const allSelected: Service[] = [];
    Object.entries(options).forEach(([catId, servicesObj]) => {
      Object.entries(servicesObj).forEach(([serviceId, qty]) => {
        const service = services.find(s => s.id === Number(serviceId));
        if (service) {
          for (let i = 0; i < (qty as number); i++) {
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

  // Renderizado
  if (loading) {
    return <div className="min-h-screen flex flex-col items-center justify-center">
      <div>Cargando datos de diseño...</div>
      <div className="mt-4 text-xs text-gray-500">(Espere...)</div>
    </div>
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>
  }
  // Mostrar en pantalla el total de categorías y servicios recibidos

  // Definir mainImage y activeService antes del return principal
  const activeService = services.find(s => s.id === activeProductId);
  const mainImage = activeService?.image
    ? (activeService.image.startsWith('http')
        ? activeService.image
        : `http://localhost:8000/media/${activeService.image.startsWith('services/') ? activeService.image : 'services/' + activeService.image}`)
    : currentMainImage;

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
      <div className="text-center text-xs text-gray-500 mb-2">
        Total categorías: {categories.length} | Total servicios: {services.length}
      </div>
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
                value={areaInput}
                min={80}
                max={1000}
                onChange={handleAreaInputChange}
                onBlur={handleAreaInputBlur}
              />
              {showMaxAreaAlert && (
                <div className="text-red-600 font-bold text-xs mt-1">{t("designAreaExceeded")}</div>
              )}
            </div>
            {/* En la imagen grande: */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden mb-8 bg-white border-2 border-blue-100 shadow-lg">
              <Image
                src={mainImage || "/placeholder.svg"}
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
              {/* 1. Logo azul en la barra de progreso */}
              {/* (Asegúrate de que el SVG en /images/logocasamaps.svg tenga fill="#0D00FF") */}
              <div style={{ background: 'white', borderRadius: '50%', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image src="/images/CASA.svg" alt="Logo Casa" width={24} height={24} />
              </div>
              <div className="flex-1 h-4 bg-blue-100 rounded-full overflow-hidden relative">
                <div className="h-4 bg-gradient-to-r from-blue-500 to-orange-400 rounded-full transition-all duration-500" style={{ width: `${areaPercent}%` }} />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-700">
                  {areaPercent}% {t("areaCompleted")}
                </div>
              </div>
            </div>
            {areaPercent === 100 && (
              <div className="flex flex-col items-center my-4">
                <span className="text-blue-700 font-bold mb-2">¡Has completado el área disponible!</span>
              </div>
            )}
            {/* En el render, mostrar la alerta si el área está llena o queda poco espacio */}
            {(areaLlena || areaRestantePositivo) && (
              <div className="text-center my-4">
                {areaLlena ? (
                  <div className="text-red-600 font-bold mb-2">
                    El área adicional está completamente ocupada. Aumenta el área para agregar más productos o continúa a la cotización.
                  </div>
                ) : (
                  <div className="text-blue-700 font-bold mb-2">
                    Área restante: {areaRestante} m²
                  </div>
                )}
                {sugerencias.length > 0 && (
                  <div className="text-blue-700">
                    Productos que puedes agregar con el área restante:
                    <ul className="list-disc list-inside">
                      {sugerencias.map(s => (
                        <li key={s.id}>{s.name_es} ({SERVICE_AREA_MAX[s.name_en]} m²)</li>
                      ))}
                    </ul>
                  </div>
                )}
                {areaRestante > 0 && sugerencias.length === 0 && (
                  <div className="text-orange-600 font-bold mt-2">
                    No hay productos que quepan en el área restante. Puedes aumentar el área para agregar más opciones.
                  </div>
                )}
              </div>
            )}
            {/* Alerta si el usuario intenta agregar un producto que no cabe */}
            {showNoFitAlert.show && (
              <div className="text-center text-orange-600 font-bold my-4">
                No puedes agregar "{showNoFitAlert.nombre}" porque no cabe en el área restante.<br />
                {sugerencias.length > 0 ? (
                  <span>Productos que sí puedes agregar: {sugerencias.map(s => s.name_es).join(', ')}</span>
                ) : (
                  <span>No hay productos que quepan en el área restante. Aumenta el área para más opciones.</span>
                )}
                <button className="ml-4 px-2 py-1 bg-blue-100 rounded" onClick={() => setShowNoFitAlert({show: false, nombre: ''})}>Cerrar</button>
              </div>
            )}
            {/* SOLO mostrar el botón para abrir el modal, NO la lista de sugerencias fuera del modal */}
            {areaRestante > 0 && sugerencias.length > 0 && (
              <div className="text-center my-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition"
                  onClick={() => setShowSuggestionsModal(true)}
                >
                  Ver productos que puedes agregar con el área restante
                </button>
              </div>
            )}
            {showSuggestionsModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in border-2 border-blue-100">
                  <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-2xl font-bold"
                    onClick={() => setShowSuggestionsModal(false)}
                    aria-label="Cerrar"
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-bold text-blue-700 mb-4 text-center">Productos que puedes agregar con el área restante ({areaRestante} m²)</h2>
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {sugerenciasPorCategoria.map(cat => (
                      <div key={cat.id}>
                        <h3 className="text-blue-600 font-bold mb-2">{cat.name}</h3>
                        <div className="space-y-3">
                          {cat.productos.map(s => (
                            <Card key={s.id} className="flex items-center gap-3 p-3 border border-blue-100 bg-blue-50">
                              {s.image && (
                                <Image
                                  src={s.image.startsWith('http') ? s.image : `http://localhost:8000/media/${s.image.startsWith('services/') ? s.image : 'services/' + s.image}`}
                                  alt={s.name_es}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="neutra-font-bold text-gray-900 text-sm">{language === "es" ? s.name_es : s.name_en}</h4>
                                <p className="text-xs text-blue-600 neutra-font">Área: {SERVICE_AREA_MAX[s.name_en]} m²</p>
                              </div>
                              <button
                                className="px-3 py-1 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 transition text-xs"
                                onClick={() => {
                                  setSelectedOptions(prev => {
                                    const current = prev[s.category_id] || {};
                                    const newQty = (current[s.id] || 0) + 1;
                                    return { ...prev, [s.category_id]: { ...current, [s.id]: newQty } };
                                  });
                                  setShowSuggestionsModal(false);
                                }}
                              >
                                Agregar
                              </button>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-bold"
                      onClick={() => setShowSuggestionsModal(false)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}
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
                  {services.filter((s) => s.category_id.toString() === activeTab).length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No hay servicios para esta categoría.</div>
                  ) : (
                    services.filter((s) => s.category_id.toString() === activeTab).map((service) => {
                      const config = SERVICE_CONFIG[service.name_es] || { default: 0, max: 5, type: 'number' };
                      const selectedQty = selectedOptions[service.category_id]?.[service.id] ?? config.default;
                    return (
                      <Card
                        key={service.id}
                          onClick={() => setActiveProductId(service.id)}
                          className={`p-3 transition-all hover:shadow-md ${selectedQty ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                      >
                        <div className="flex items-center gap-3">
                          {service.image && (
                            <Image
                                src={service.image.startsWith('http') ? service.image : `http://localhost:8000/media/${service.image.startsWith('services/') ? service.image : 'services/' + service.image}`}
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
                            {/* Input numérico o switch según corresponda */}
                            {config.type === 'number' ? (
                            <div className="flex items-center gap-2">
                              <button
                                  className={`w-8 h-8 rounded bg-blue-50 text-blue-600 font-bold text-lg flex items-center justify-center border border-blue-100 hover:bg-blue-100 transition ${selectedQty <= config.default ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  onClick={() => {
                                    if (selectedQty > config.default) {
                                      setSelectedOptions(prev => {
                                        const updated = {
                                          ...prev,
                                          [service.category_id]: {
                                            ...prev[service.category_id],
                                            [service.id]: (selectedQty as number) - 1
                                          }
                                        };
                                        updateMainImage(updated);
                                        return updated;
                                      });
                                    }
                                  }}
                                  disabled={selectedQty <= config.default}
                                  type="button"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center font-bold text-gray-900">{selectedQty}</span>
                              <button
                                  className="w-8 h-8 rounded bg-blue-600 text-white font-bold text-lg flex items-center justify-center border border-blue-600 hover:bg-blue-700 transition"
                                  onClick={() => {
                                    const areaProducto = SERVICE_AREA_MAX[service.name_en] || 0;
                                    if (areaLlena || (areaProducto > areaRestante)) {
                                      setShowNoFitAlert({show: true, nombre: service.name_es});
                                      return;
                                    }
                                    if ((selectedQty as number) < (config.max as number)) {
                                      setSelectedOptions(prev => {
                                        const updated = {
                                          ...prev,
                                          [service.category_id]: {
                                            ...prev[service.category_id],
                                            [service.id]: (selectedQty as number) + 1
                                          }
                                        };
                                        updateMainImage(updated);
                                        return updated;
                                      });
                                    }
                                  }}
                                  disabled={areaLlena || (selectedQty as number) >= (config.max as number)}
                                  type="button"
                                >
                                  +
                                </button>
                            </div>
                          ) : (
                              <input
                                type="checkbox"
                                checked={!!selectedQty}
                                onChange={e => {
                                  setSelectedOptions(prev => {
                                    const updated = {
                                      ...prev,
                                      [service.category_id]: {
                                        ...prev[service.category_id],
                                        [service.id]: e.target.checked
                                      }
                                    };
                                    updateMainImage(updated);
                                    return updated;
                                  });
                                }}
                              />
                          )}
                        </div>
                      </Card>
                    );
                    })
                  )}
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
                              return area > 0 && area <= areaAdicional && !yaSeleccionado && !esDefault;
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
                                  return area > 0 && area <= areaAdicional && !yaSeleccionado && !esDefault;
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
