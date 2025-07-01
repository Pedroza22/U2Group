"use client"

import { useEffect, useRef, useState } from "react"

// Declare global google object for TypeScript
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

// Define types for the locations
interface ProjectLocation {
  id: string
  name: string
  lat: number
  lng: number
  description?: string
  projectUrl?: string
}

// Project locations - you can modify these coordinates
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
  center = { lat: 10, lng: -40 }, // Centrado en América del Sur
  locations = PROJECT_LOCATIONS,
}: GoogleMapsWorkingProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load Google Maps API
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && window.google.maps) {
      setIsLoaded(true)
      setIsLoading(false)
      return
    }

    // Create a unique callback name
    const callbackName = `initMap_${Date.now()}`

    // Set up the callback
    window[callbackName as any] = () => {
      setIsLoaded(true)
      setIsLoading(false)
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=${callbackName}`
    script.async = true
    script.defer = true
    script.onerror = () => {
      setIsLoading(false)
      setError("Failed to load Google Maps")
      console.error("Failed to load Google Maps API")
    }

    document.head.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`)
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript)
      }
      if (window[callbackName as any]) {
        delete window[callbackName as any]
      }
    }
  }, [apiKey])

  // Initialize the map
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
            elementType: "geometry",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            stylers: [{ visibility: "off" }],
          },
        ],
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        // limitado de zoom
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

  // Add markers
  useEffect(() => {
    if (!map || !locations.length || typeof window === "undefined" || !window.google) return

    const markers: any[] = []
    const infoWindows: any[] = []

    try {
      locations.forEach((location) => {
        // Create custom marker with purple color like in the reference image
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.name,
          icon: {
            path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 6,
            fillColor: "#0D00FF", 
            fillOpacity: 1,
            strokeColor: "#FFFFFF",
            strokeWeight: 2,
          },
          animation: window.google.maps.Animation.DROP,
        })

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; font-family: system-ui, -apple-system, sans-serif; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; color: #6B46C1; font-size: 16px; font-weight: bold;">
                ${location.name}
              </h3>
              ${
                location.description
                  ? `
                <p style="margin: 0 0 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
                  ${location.description}
                </p>
              `
                  : ""
              }
              ${
                location.projectUrl
                  ? `
                <a href="${location.projectUrl}" 
                   style="color: #6B46C1; text-decoration: none; font-weight: 600; font-size: 14px;">
                  Ver Proyecto →
                </a>
              `
                  : ""
              }
            </div>
          `,
        })

        // Add click event to marker
        marker.addListener("click", () => {
          // Close other windows
          infoWindows.forEach((iw) => iw.close())
          // Open this window
          infoWindow.open(map, marker)
        })

        markers.push(marker)
        infoWindows.push(infoWindow)
      })

      // Cleanup function
      return () => {
        markers.forEach((marker) => marker.setMap(null))
        infoWindows.forEach((infoWindow) => infoWindow.close())
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
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  if (error || !isLoaded) {
    return (
      <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gray-100" style={{ height }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-gray-600 mb-4">
              <h3 className="text-xl font-bold mb-2 text-purple-600">U2 Group Projects</h3>
              <p className="text-red-500 mb-4">{error || "Error al cargar Google Maps"}</p>
              <p className="text-sm text-gray-500 mb-6">Nuestros proyectos alrededor del mundo</p>
            </div>
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
