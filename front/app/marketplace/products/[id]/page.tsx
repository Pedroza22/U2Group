"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Car,
  Bed,
  Bath,
  Square,
  Heart,
  User,
  ShoppingCart,
  Camera,
  Package,
  Settings,
  LogOut,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getMarketplaceProduct } from "@/lib/api-marketplace"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"


import { useCart } from "@/context/cart-context"
import dynamic from "next/dynamic"

const CartSidebar = dynamic(() => import("@/components/marketplace/cart-sidebar"), { ssr: false })

interface ProductDetailProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedPlanSet, setSelectedPlanSet] = useState("pdf")
  const [selectedUnit, setSelectedUnit] = useState("sqft")
  const [isHeartFilled, setIsHeartFilled] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart();
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);

  // Refs for scrolling to sections
  const planInfoRef = useRef<HTMLDivElement>(null)
  const floorPlanRef = useRef<HTMLDivElement>(null)
  const planDetailsRef = useRef<HTMLDivElement>(null)
  const whatsIncludedRef = useRef<HTMLDivElement>(null)
  const whatsNotIncludedRef = useRef<HTMLDivElement>(null)
  const relatedPlansRef = useRef<HTMLDivElement>(null)

  // Cargar datos del producto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const resolvedParams = await params
        const data = await getMarketplaceProduct(parseInt(resolvedParams.id))
        setProduct(data)
      } catch (error) {
        console.error('Error al cargar el producto:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params])

  // Intersection Observer para detectar cuando mostrar el popup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === planDetailsRef.current) {
            setShowPopup(entry.isIntersecting)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "-100px 0px 0px 0px",
      },
    )

    if (planDetailsRef.current) {
      observer.observe(planDetailsRef.current)
    }

    return () => {
      if (planDetailsRef.current) {
        observer.unobserve(planDetailsRef.current)
      }
    }
  }, [])

  const thumbnails = [
    product?.image || "/placeholder.svg?height=80&width=120",
    "/placeholder.svg?height=80&width=120",
    "/placeholder.svg?height=80&width=120",
    "/placeholder.svg?height=80&width=120",
    "/placeholder.svg?height=80&width=120",
    "/placeholder.svg?height=80&width=120",
  ]

  const relatedPlans = [
    {
      id: "56478SM",
      image: "/placeholder.svg?height=200&width=300",
      planNumber: "56478SM",
      price: 1295,
      sqft: 2400,
      bedrooms: 4,
      bathrooms: 3.5,
      stories: 1,
      cars: 3,
    },
    {
      id: "833073WAT",
      image: "/placeholder.svg?height=200&width=300",
      planNumber: "833073WAT",
      price: 1495,
      sqft: 1621,
      bedrooms: 3,
      bathrooms: 2.5,
      stories: 2,
      cars: 2,
    },
    {
      id: "86415HH",
      image: "/placeholder.svg?height=200&width=300",
      planNumber: "86415HH",
      price: 2024,
      sqft: 2301,
      bedrooms: 4,
      bathrooms: 2.5,
      stories: 1,
      cars: 2,
    },
    {
      id: "280242JWD",
      image: "/placeholder.svg?height=200&width=300",
      planNumber: "280242JWD",
      price: 1750,
      sqft: 5280,
      bedrooms: 5,
      bathrooms: 4,
      stories: 2,
      cars: 4,
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % thumbnails.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length)
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getPlanSetPrice = () => {
    return selectedPlanSet === "pdf" ? product?.price || 1000 : (product?.price || 1000) + 500
  }

  // Conversion functions
  const convertArea = (sqft: number) => {
    return selectedUnit === "sqft" ? sqft : Math.round(sqft * 0.092903)
  }

  const convertLinear = (feet: number) => {
    return selectedUnit === "sqft" ? feet : Math.round(feet * 0.3048 * 100) / 100
  }

  const getUnitLabel = () => {
    return selectedUnit === "sqft" ? "sq. ft." : "m²"
  }

  const getLinearUnitLabel = () => {
    return selectedUnit === "sqft" ? "'" : "m"
  }

  // Handler para añadir al carrito
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setCartSidebarOpen(true);
  };

  if (loading) {
    return (
      <>
        <Header currentPage="marketplace" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header currentPage="marketplace" />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
            <p className="text-gray-600">El producto que buscas no existe o ha sido eliminado.</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header currentPage="marketplace" />
      
      <div className="min-h-screen bg-gray-50">
        {/* Popup de Add to Cart con opción de unidades */}
        {showPopup && (
          <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-2xl max-w-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg text-gray-900">Quick Purchase</h4>
                <button onClick={() => setShowPopup(false)} className="p-1 hover:bg-gray-100 rounded-full">
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-[#0D00FF] mb-1">Starting at</p>
                <p className="text-3xl font-bold text-[#0D00FF]">${getPlanSetPrice()}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 font-medium text-gray-900">Plan Set</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-900 font-medium justify-between"
                      >
                        {selectedPlanSet === "pdf" ? "PDF - $1,000" : "PDF + Archivo Editable - $1,500"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
                      <DropdownMenuItem
                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                        onSelect={() => setSelectedPlanSet("pdf")}
                      >
                        PDF - $1,000
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                        onSelect={() => setSelectedPlanSet("pdf-editable")}
                      >
                        PDF + Archivo Editable - $1,500
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <p className="text-sm mt-1 text-[#0D00FF] font-medium">${getPlanSetPrice()}</p>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium text-gray-900">Options</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-900 font-medium justify-between"
                      >
                        {selectedUnit === "sqft" ? "sq.ft" : "m²"}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
                      <DropdownMenuItem
                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                        onSelect={() => setSelectedUnit("sqft")}
                      >
                        sq.ft
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                        onSelect={() => setSelectedUnit("m2")}
                      >
                        m²
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-3 text-base rounded-xl border-0 shadow-lg"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-400 text-gray-900 hover:bg-gray-200 bg-transparent font-semibold py-3 rounded-xl backdrop-blur-sm"
                >
                  Best Price Guarantee
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl">
                <h4 className="font-bold mb-2 text-lg text-gray-900">Modify This Plan</h4>
                <p className="text-sm mb-4 text-gray-700">
                  Need to make changes? We will get you a free price quote within 1 to 3 business days.
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-gray-400 text-gray-900 hover:bg-gray-200 bg-transparent font-semibold py-2 px-4 rounded-xl backdrop-blur-sm"
                >
                  Modify This Plan
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Hero Image Section original */}
          <div className="relative mb-6">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src={product.image || "/placeholder.svg"} 
                alt={product.name} 
                fill 
                className="object-cover" 
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Thumbnail Gallery original */}
            <div className="absolute right-4 top-4 space-y-2">
              {thumbnails.map((thumb, index) => (
                <div
                  key={index}
                  className={`w-20 h-12 rounded border-2 overflow-hidden cursor-pointer ${
                    index === currentImageIndex ? "border-blue-500" : "border-white"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={thumb || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded text-sm">18 Images</div>
          </div>

          {/* Plan Info original */}
          <div ref={planInfoRef} className="mb-6">
            <p className="text-sm text-gray-600 mb-2">Plan {product.id}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Quick Stats original */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Square className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{convertArea(product.area_m2 || 0)}</span>
                <span className="text-gray-600">{getUnitLabel()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bed className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{product.rooms || 0}</span>
                <span className="text-gray-600">bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{product.bathrooms || 0}</span>
                <span className="text-gray-600">bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{product.floors || 1}</span>
                <span className="text-gray-600">story</span>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">2</span>
                <span className="text-gray-600">garage</span>
              </div>
            </div>
          </div>

          {/* Menú de navegación abajo */}
          <div className="border-b mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => scrollToSection(floorPlanRef)}
                className="border-b-2 border-blue-600 pb-2 text-blue-600 font-medium hover:text-blue-700"
              >
                Floor Plan
              </button>
              <button
                onClick={() => scrollToSection(planDetailsRef)}
                className="pb-2 text-gray-500 hover:text-gray-700"
              >
                Plan details
              </button>
              <button
                onClick={() => scrollToSection(whatsIncludedRef)}
                className="pb-2 text-gray-500 hover:text-gray-700"
              >
                What's Included
              </button>
              <button
                onClick={() => scrollToSection(whatsNotIncludedRef)}
                className="pb-2 text-gray-500 hover:text-gray-700"
              >
                What's not included
              </button>
              <button
                onClick={() => scrollToSection(relatedPlansRef)}
                className="pb-2 text-gray-500 hover:text-gray-700"
              >
                Related Plans
              </button>
            </nav>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Left Column - Mantener diseño original */}
            <div className="lg:col-span-2">
              {/* Floor Plans - imágenes sin recuadro */}
              <div ref={floorPlanRef} className="space-y-6 mb-8">
                <h3 className="text-lg font-semibold">Main Level</h3>
                <div className="w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Main level floor plan"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="w-full">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Optional lower level floor plan"
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Plan Details original */}
              <div ref={planDetailsRef} className="mt-8 space-y-6 mb-8">
                <h3 className="text-xl font-bold">Plan Details</h3>
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              </div>

              {/* What's Included Section original */}
              <div ref={whatsIncludedRef} className="mt-8 space-y-6 mb-8">
                <h4 className="font-semibold text-xl">What's Included</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Elevations</li>
                  <li>• Fully Dimensioned Floor Plans</li>
                  <li>• Roof Plan & Sections</li>
                  <li>• Foundation plan</li>
                  <li>• Framing plans</li>
                  <li>• Suggested Electrical Layout</li>
                </ul>
              </div>

              {/* What's Not Included Section original */}
              <div ref={whatsNotIncludedRef} className="mt-8 space-y-6 mb-8">
                <h4 className="font-semibold text-xl">What's Not Included</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Architectural or Engineering Stamp - Handled locally if required</li>
                  <li>• Site plan - Handled locally when site mapping</li>
                  <li>
                    • Heating, Ventilation, and Air Conditioning (HVAC) or equipment and duct work - your subcontractor
                    handles this
                  </li>
                  <li>
                    • Plumbing Drawings (drawings showing the actual plumbing pipe sizes and locations) - your
                    subcontractor handles this
                  </li>
                  <li>• Energy calculations - handled locally when required</li>
                </ul>
              </div>

              {/* Related Plans Section - Nuevo diseño */}
              <div ref={relatedPlansRef} className="mt-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-2xl text-gray-900">More Plans By This Designer</h4>
                  <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                    View More
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative">
                        <Image
                          src={plan.image || "/placeholder.svg"}
                          alt={`Plan ${plan.planNumber}`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3 flex space-x-2">
                          <div className="p-2 bg-white rounded-full shadow-md">
                            <Camera className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="p-2 bg-white rounded-full shadow-md">
                            <Home className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h5 className="font-bold text-lg mb-1">{plan.planNumber}</h5>
                        <p className="text-sm text-gray-600 mb-2">Plan Number</p>
                        <p className="text-sm text-gray-600 mb-4">
                          starting at{" "}
                          <span className="font-bold text-lg text-[#0D00FF]">${plan.price.toLocaleString()}</span>
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-5 gap-2 text-center text-xs">
                          <div>
                            <div className="font-bold text-sm">{convertArea(plan.sqft)}</div>
                            <div className="text-gray-600">{getUnitLabel()}</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{plan.bedrooms}</div>
                            <div className="text-gray-600">Bed</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{plan.bathrooms}</div>
                            <div className="text-gray-600">Bath</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{plan.stories}</div>
                            <div className="text-gray-600">Story</div>
                          </div>
                          <div>
                            <div className="font-bold text-sm">{plan.cars}</div>
                            <div className="text-gray-600">Cars</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - ESTÁTICO SIN STICKY */}
            <div className="lg:col-span-1">
              {/* Contenido con glassmorphism - SIN STICKY */}
              <div className="p-6">
                {/* Pricing Card con glassmorphism y colores azules - SIN STICKY */}
                <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-6 shadow-2xl">
                  <div className="text-center mb-6">
                    <p className="text-sm text-[#0D00FF] mb-1">Starting at</p>
                    <p className="text-4xl font-bold text-[#0D00FF]">${getPlanSetPrice()}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2 font-medium text-gray-900">Plan Set</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-900 font-medium focus:border-cyan-400 focus:outline-none justify-between"
                          >
                            {selectedPlanSet === "pdf" ? "PDF - $1,000" : "PDF + Archivo Editable - $1,500"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
                          <DropdownMenuItem
                            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                            onSelect={() => setSelectedPlanSet("pdf")}
                          >
                            PDF - $1,000
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                            onSelect={() => setSelectedPlanSet("pdf-editable")}
                          >
                            PDF + Archivo Editable - $1,500
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <p className="text-sm mt-1 text-[#0D00FF] font-medium">${getPlanSetPrice()}</p>
                    </div>

                    <div>
                      <label className="block text-sm mb-2 font-medium text-gray-900">Options</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full p-3 rounded-xl bg-gray-50/80 backdrop-blur-sm border border-gray-200 text-gray-900 font-medium focus:border-cyan-400 focus:outline-none justify-between"
                          >
                            {selectedUnit === "sqft" ? "sq.ft" : "m²"}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl p-1">
                          <DropdownMenuItem
                            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                            onSelect={() => setSelectedUnit("sqft")}
                          >
                            sq.ft
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                            onSelect={() => setSelectedUnit("m2")}
                          >
                            m²
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-4 text-lg rounded-xl border-0 shadow-lg">
                      Add to Cart
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-2 border-gray-400 text-gray-900 hover:bg-gray-200 bg-transparent font-semibold py-3 rounded-xl backdrop-blur-sm"
                    >
                      Best Price Guarantee
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-xl">
                    <h4 className="font-bold mb-2 text-lg text-gray-900">Modify This Plan</h4>
                    <p className="text-sm mb-4 text-gray-700">
                      Need to make changes? We will get you a free price quote within 1 to 3 business days.
                    </p>
                    <Button
                      variant="outline"
                      className="border-2 border-gray-400 text-gray-900 hover:bg-gray-200 bg-transparent font-semibold py-2 px-4 rounded-xl backdrop-blur-sm"
                    >
                      Modify This Plan
                    </Button>
                  </div>
                </div>

                {/* Specifications con glassmorphism */}
                <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                  <div className="space-y-0">
                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Square Footage Breakdown</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Total Heated Area</span>
                          <span className="font-semibold text-gray-900">
                            {convertArea(product.area_m2 || 0)} {getUnitLabel()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">1st Floor</span>
                          <span className="font-semibold text-gray-900">
                            {convertArea(product.area_m2 || 0)} {getUnitLabel()}
                          </span>
                        </div>
                        {product.area_ft2 && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Optional Lower Level</span>
                            <span className="font-semibold text-gray-900">
                              {convertArea(product.area_ft2)} {getUnitLabel()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Beds/Baths</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Bedrooms</span>
                          <span className="font-semibold text-gray-900">{product.rooms || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Full bathrooms</span>
                          <span className="font-semibold text-gray-900">{product.bathrooms || 0}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Foundation Type</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Standard Foundations</span>
                          <span className="font-semibold text-gray-900">Walkout</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Dimensions</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Width</span>
                          <span className="font-semibold text-gray-900">
                            {convertLinear(73)} {getLinearUnitLabel()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Depth</span>
                          <span className="font-semibold text-gray-900">
                            {convertLinear(65)} {getLinearUnitLabel()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Max Ridge Height</span>
                          <span className="font-semibold text-gray-900">
                            {convertLinear(18.83)} {getLinearUnitLabel()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Garage</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Type</span>
                          <span className="font-semibold text-gray-900">Attached</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Area</span>
                          <span className="font-semibold text-gray-900">
                            {convertArea(700)} {getUnitLabel()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Count</span>
                          <span className="font-semibold text-gray-900">2 Cars</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Entry Location</span>
                          <span className="font-semibold text-gray-900">Front</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Ceiling Heights</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Lower Level</span>
                          <span className="font-semibold text-gray-900">
                            {convertLinear(9)} {getLinearUnitLabel()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">First Floor</span>
                          <span className="font-semibold text-gray-900">
                            {convertLinear(9)} {getLinearUnitLabel()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-b border-gray-200">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Architectural Style</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-900 hover:bg-gray-200">
                          {product.style || 'Modern'}
                        </Badge>
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-900 hover:bg-gray-200">
                          {product.category || 'Residential'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-bold mb-3 text-lg text-gray-900">Special Features</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p>Bathrooms - Split</p>
                        <p>Butler Walk-in Pantry</p>
                        <p>Laundry - Main Level</p>
                        <p>Master Suite - 1st Floor</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <CartSidebar isOpen={cartSidebarOpen} onClose={() => setCartSidebarOpen(false)} />
    </>
  )
} 