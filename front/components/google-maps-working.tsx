"use client"

import { useEffect, useRef, useState } from "react"

// Extiende el tipo Window con el callback dinámico
declare global {
  interface Window {
    google: any
    [key: string]: any // Para permitir asignar funciones con nombre dinámico
  }
}

interface ProjectLocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
  projectUrl?: string
}

const PROJECT_LOCATIONS: ProjectLocation[] = [
  {
    id: "madrid",
    name: "Madrid",
    lat: 40.4168,
    lng: -3.7038,
    description: "Proyecto residencial en el centro de Madrid",
    projectUrl: "/proyectos/madrid-residencial",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    lat: 41.3851,
    lng: 2.1734,
    description: "Complejo comercial en Barcelona",
    projectUrl: "/proyectos/barcelona-comercial",
  },
  {
    id: "valencia",
    name: "Valencia",
    lat: 39.4699,
    lng: -0.3763,
    description: "Villa moderna en Valencia",
    projectUrl: "/proyectos/valencia-villa",
  },
  {
    id: "pasto",
    name: "Pasto, Colombia",
    lat: 1.2136,
    lng: -77.2811,
    description: "Oficinas U2 Group",
    projectUrl: "/proyectos/pasto-oficinas",
  },
  {
    id: "miami",
    name: "Miami, USA",
    lat: 25.7617,
    lng: -80.1918,
    description: "Proyecto internacional en Miami",
    projectUrl: "/proyectos/miami-tower",
  },
  {
    id: "bogota",
    name: "Bogotá, Colombia",
    lat: 4.711,
    lng: -74.0721,
    description: "Centro corporativo en Bogotá",
    projectUrl: "/proyectos/bogota-corporate",
  },
]

// Función para generar el ícono de la casa como SVG
const createHouseIcon = (color: string = "#0D00FF") => {
  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)"/>
        </filter>
      </defs>
      <path 
        d="M16 4L4 12V28H28V12L16 4Z" 
        fill="${color}"
        stroke="white"
        stroke-width="1.5"
        filter="url(#shadow)"
      />
      <path 
        d="M12 28V18H20V28" 
        fill="white"
      />
    </svg>
  `;
  
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

interface GoogleMapsWorkingProps {
  apiKey: string
  height?: string
  zoom?: number
  center?: { lat: number; lng: number }
  locations?: ProjectLocation[]
}

export default function GoogleMapsWorking({
  apiKey,
  height = "500px",
  zoom = 4,
  center = { lat: 10, lng: -40 },
  locations = PROJECT_LOCATIONS,
}: GoogleMapsWorkingProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setIsLoaded(true)
      setIsLoading(false)
      return
    }

    // Verificar si ya existe el script de Google Maps
    const existingScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')
    let script: HTMLScriptElement | null = null
    let callbackName: string | null = null
    let scriptJustAdded = false

    if (!existingScript) {
      callbackName = `initMap_${Date.now()}`
      window[callbackName] = () => {
        setIsLoaded(true)
        setIsLoading(false)
      }
      script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`
      script.async = true
      script.defer = true
      script.onerror = () => {
        setIsLoading(false)
        setError("Error loading Google Maps")
        console.error("Google Maps API load error")
      }
      document.head.appendChild(script)
      scriptJustAdded = true
    } else {
      // Si ya existe, esperar a que Google Maps esté disponible
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true)
          setIsLoading(false)
          clearInterval(checkLoaded)
        }
      }, 100)
      // Limpiar el intervalo si el componente se desmonta
      return () => clearInterval(checkLoaded)
    }

    return () => {
      // No eliminar el callback aquí para evitar el error de Google Maps
      // Solo limpiar el intervalo si aplica (ya está arriba)
      // No eliminar el script para evitar conflictos con otras instancias
    }
  }, [apiKey])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || typeof window === "undefined" || !window.google) return

    try {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom,
        center,
        mapTypeId: "roadmap",
        styles: [
          {
            featureType: "administrative",
            elementType: "all",
            stylers: [
              {
                saturation: "-100"
              }
            ]
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                saturation: -100
              },
              {
                lightness: 65
              },
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                saturation: -100
              },
              {
                lightness: "50"
              },
              {
                visibility: "simplified"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: "-100"
              }
            ]
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified"
              }
            ]
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [
              {
                lightness: "30"
              }
            ]
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                lightness: "40"
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                saturation: -100
              },
              {
                visibility: "simplified"
              }
            ]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                hue: "#ffff00"
              },
              {
                lightness: -25
              },
              {
                saturation: -97
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels",
            stylers: [
              {
                lightness: -25
              },
              {
                saturation: -100
              }
            ]
          }
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        minZoom: 4,
        maxZoom: 4,
        restriction: {
          latLngBounds: {
            north: 85,
            south: -85,
            west: -180,
            east: 180,
          },
        },
      })

      setMap(mapInstance)
    } catch (err) {
      console.error("Error initializing map:", err)
      setError("Error initializing map")
    }
  }, [isLoaded, center, zoom])

  useEffect(() => {
    if (!map || !locations.length || typeof window === "undefined" || !window.google) return

    const markers: any[] = []
    const infoWindows: any[] = []

    try {
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.name,
          icon: {
            url: createHouseIcon("#0D00FF"),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(16, 32), // Centrar el ícono
          },
          animation: window.google.maps.Animation.DROP,
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; font-family: system-ui, -apple-system, sans-serif; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #6B46C1; font-size: 16px; font-weight: bold;">
                ${location.name}
              </h3>
              ${
                location.description
                  ? `<p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">
                      ${location.description}
                    </p>`
                  : ""
              }
              ${
                location.projectUrl
                  ? `<a href="${location.projectUrl}" style="color: #6B46C1; font-weight: 600;">
                      Ver Proyecto → 
                    </a>`
                  : ""
              }
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindows.forEach((iw) => iw.close())
          infoWindow.open(map, marker)
        })

        markers.push(marker)
        infoWindows.push(infoWindow)
      })

      return () => {
        markers.forEach((marker) => marker.setMap(null))
        infoWindows.forEach((iw) => iw.close())
      }
    } catch (err) {
      console.error("Error adding markers:", err)
    }
  }, [map, locations])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded-lg" style={{ height }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  if (error || !isLoaded) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-100" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-purple-600">U2 Group Projects</h3>
            <p className="text-red-500 mb-4">{error || "Error loading Google Maps"}</p>
            <p className="text-sm text-gray-500 mb-6">Our projects around the world</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locations.map((location) => (
                <div key={location.id} className="text-center p-3 bg-white rounded-lg shadow">
                  <div className="w-4 h-4 bg-purple-600 rounded-full mx-auto mb-2"></div>
                  <span className="text-sm font-medium text-gray-700">{location.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-lg" />
    </div>
  )
}
