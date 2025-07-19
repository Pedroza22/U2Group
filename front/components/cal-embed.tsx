"use client"

import { useEffect, useState, useRef } from "react"
import { Calendar, Clock, User, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalEmbedProps {
  calLink?: "jara-u2group-lrzdfm/consulta-arquitectura?overlayCalendar=true"
  showDemo?: false
}

export function CalEmbed({ calLink, showDemo = false }: CalEmbedProps) {
  const [embedState, setEmbedState] = useState<"loading" | "loaded" | "demo">("demo")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptRef = useRef<HTMLScriptElement | null>(null)

  // Nombres de meses en español
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  // Días de la semana
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  useEffect(() => {
    // Si no hay link válido o showDemo es true, mostrar demo
    if (!calLink || showDemo || !calLink.includes("/")) {
      setEmbedState("demo")
      return
    }

    // Intentar cargar Cal.com silenciosamente
    setEmbedState("loading")

    const cleanupPreviousScripts = () => {
      const existingScripts = document.querySelectorAll('script[src*="cal.com"]')
      existingScripts.forEach((script) => script.remove())

      if (scriptRef.current) {
        scriptRef.current.remove()
        scriptRef.current = null
      }
    }

    const loadCalEmbed = () => {
      try {
        cleanupPreviousScripts()

        const cleanCalLink = calLink.split("?")[0]
        const script = document.createElement("script")
        script.src = "https://app.cal.com/embed/embed.js"
        script.async = true
        scriptRef.current = script

        const timeout = setTimeout(() => {
          setEmbedState("demo")
        }, 8000)

        script.onload = () => {
          clearTimeout(timeout)

          try {
            if (typeof window !== "undefined" && (window as any).Cal) {
              setTimeout(() => {
                try {
                  ;(window as any).Cal("init", {
                    origin: "https://app.cal.com",
                  })
                  ;(window as any).Cal("inline", {
                    elementOrSelector: containerRef.current,
                    calLink: cleanCalLink,
                    config: {
                      theme: "light",
                      hideEventTypeDetails: false,
                      layout: "month_view",
                    },
                  })

                  setEmbedState("loaded")
                } catch (embedError) {
                  setEmbedState("demo")
                }
              }, 500)
            } else {
              setEmbedState("demo")
            }
          } catch (initError) {
            setEmbedState("demo")
          }
        }

        script.onerror = () => {
          clearTimeout(timeout)
          setEmbedState("demo")
        }

        document.head.appendChild(script)
      } catch (error) {
        setEmbedState("demo")
      }
    }

    const loadTimeout = setTimeout(loadCalEmbed, 100)

    return () => {
      clearTimeout(loadTimeout)
      cleanupPreviousScripts()
    }
  }, [calLink, showDemo])

  // Función para cambiar mes
  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  // Función para obtener días del mes
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Días del mes anterior (para completar la primera semana)
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i)
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
        isPast: prevDate < new Date(new Date().setHours(0, 0, 0, 0)),
      })
    }

    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day)
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isWeekend: currentDate.getDay() === 0 || currentDate.getDay() === 6,
        isPast: currentDate < new Date(new Date().setHours(0, 0, 0, 0)),
      })
    }

    // Días del mes siguiente (para completar la última semana)
    const remainingDays = 42 - days.length // 6 semanas × 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day)
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
        isPast: nextDate < new Date(new Date().setHours(0, 0, 0, 0)),
      })
    }

    return days
  }

  // Función para manejar selección de fecha
  const handleDateSelect = (date: Date, isWeekend: boolean, isPast: boolean) => {
    if (isWeekend || isPast) return

    setSelectedDate(date)

    // Abrir Cal.com con la fecha seleccionada
    if (calLink) {
      const cleanLink = calLink.split("?")[0]
      const dateParam = date.toISOString().split("T")[0]
      window.open(`https://cal.com/${cleanLink}?date=${dateParam}`, "_blank", "noopener,noreferrer")
    } else {
      window.open("https://cal.com", "_blank", "noopener,noreferrer")
    }
  }

  // Función para abrir Cal.com en nueva ventana
  const openCalInNewWindow = () => {
    if (calLink) {
      const cleanLink = calLink.split("?")[0]
      window.open(`https://cal.com/${cleanLink}`, "_blank", "noopener,noreferrer")
    } else {
      window.open("https://cal.com", "_blank", "noopener,noreferrer")
    }
  }

  // Demo o Loading (sin errores visibles)
  if (embedState === "demo" || embedState === "loading") {
    const days = getDaysInMonth(currentDate)

    return (
      <div className="w-full min-h-[500px] bg-white rounded-lg border border-gray-200">
        {/* Header del calendario con navegación */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => changeMonth("prev")} className="hover:bg-gray-100">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => changeMonth("next")} className="hover:bg-gray-100">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendario interactivo */}
        <div className="p-4">
          {/* Indicador sutil de carga */}
          {embedState === "loading" && (
            <div className="flex items-center justify-center mb-4">
              <div className="animate-pulse flex items-center gap-2 text-blue-600 text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <span>Conectando calendario...</span>
              </div>
            </div>
          )}

          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Días del mes */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isSelectable = day.isCurrentMonth && !day.isWeekend && !day.isPast
              const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString()

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-colors cursor-pointer
                    ${
                      !day.isCurrentMonth
                        ? "text-gray-300"
                        : day.isWeekend
                          ? "text-gray-400 bg-gray-50"
                          : day.isPast
                            ? "text-gray-400 line-through"
                            : isSelected
                              ? "bg-blue-600 text-white"
                              : isSelectable
                                ? "bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100"
                                : "text-gray-700 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleDateSelect(day.date, day.isWeekend, day.isPast)}
                >
                  {day.date.getDate()}
                </div>
              )
            })}
          </div>

          {/* Leyenda */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-50 rounded"></div>
              <span>Fin de semana</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span>Seleccionado</span>
            </div>
          </div>

          {/* Información del servicio */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Consulta de Arquitectura</p>
                <p className="text-xs text-blue-600">30 minutos • Video llamada</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">U2 Group</p>
                <p className="text-xs text-gray-600">Equipo de arquitectos</p>
              </div>
            </div>
          </div>

          {/* Botón principal de acción */}
          <div className="mt-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={openCalInNewWindow}>
              <Calendar className="w-4 h-4 mr-2" />
              Agendar Consulta
            </Button>

            <p className="text-xs text-gray-500 text-center mt-2">
              Click on an available day or use the button to schedule
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Cal.com embed cargado exitosamente
  return (
    <div className="w-full min-h-[500px] bg-white rounded-lg overflow-hidden border border-gray-200">
      <div ref={containerRef} className="w-full h-full" style={{ minHeight: "500px" }} />
    </div>
  )
}
