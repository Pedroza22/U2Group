"use client"

import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"

interface FilterSidebarProps {
  unit: "sqft" | "m2"
  setUnit: (unit: "sqft" | "m2") => void
}

export default function FilterSidebar({ unit, setUnit }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [selectedFilters, setSelectedFilters] = useState({
    area: [] as string[],
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    garage: [] as string[],
    architecturalStyle: [] as string[],
  })
  const [expandedSections, setExpandedSections] = useState({
    area: true,
    bedrooms: true,
    bathrooms: true,
    garage: true,
    architecturalStyle: false,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }))
  }

  const areaOptions = {
    m2: [
      { label: "Menos de 100", value: "0-100" },
      { label: "100-200", value: "100-200" },
      { label: "200+", value: "200+" },
    ],
    sqft: [
      { label: "Menos de 1,076", value: "0-1076" },
      { label: "1,076-2,153", value: "1076-2153" },
      { label: "2,153+", value: "2153+" },
    ],
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-gray-800 p-3 rounded-l-xl shadow-xl z-10 hover:bg-white/30 transition-all duration-300"
      >
        Filtros
      </button>
    )
  }

  return (
    <div className="w-80 sticky top-[calc(6rem+2rem)] h-[calc(100vh-16rem)] mt-0">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 relative overflow-hidden h-full flex flex-col">
        {/* Gradient overlay for extra glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-2xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header - Fixed */}
          <div className="flex-shrink-0 p-6 pb-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Filter</h2>
              <div className="flex gap-2">
                <button className="text-[#0D00FF] text-sm hover:text-[#0D00FF]/80 transition-colors">Clear All</button>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-lg transition-colors">
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <button className="w-full bg-[#0D00FF] backdrop-blur-sm text-white py-3 rounded-xl hover:bg-[#0D00FF]/90 transition-all duration-300 shadow-lg border border-[#0D00FF]/30">
              Save Search
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Search for a keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl pr-10 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0D00FF]/50 focus:border-[#0D00FF]/50 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#0D00FF] backdrop-blur-sm text-white p-1.5 rounded-lg hover:bg-[#0D00FF]/90 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Área</span>
                  <div className="flex bg-white/20 backdrop-blur-sm rounded-xl p-1 border border-white/30">
                    <button
                      onClick={() => setUnit("m2")}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        unit === "m2" ? "bg-[#0D00FF] text-white shadow-lg" : "text-gray-600 hover:bg-white/20"
                      }`}
                    >
                      m²
                    </button>
                    <button
                      onClick={() => setUnit("sqft")}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        unit === "sqft" ? "bg-[#0D00FF] text-white shadow-lg" : "text-gray-600 hover:bg-white/20"
                      }`}
                    >
                      sq.ft
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => toggleSection("area")}
                  className="flex justify-between items-center w-full text-left font-medium mb-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Total Heated Area ({unit === "m2" ? "m²" : "Sq. Ft."})
                  {expandedSections.area ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.area && (
                  <div className="space-y-2">
                    {areaOptions[unit].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => toggleFilter("area", option.value)}
                        className={`w-full px-3 py-2 backdrop-blur-sm border rounded-xl text-left transition-all duration-200 ${
                          selectedFilters.area.includes(option.value)
                            ? "bg-[#0D00FF] border-[#0D00FF] text-white font-medium"
                            : "bg-white/10 border-white/20 text-gray-700 hover:bg-white/20 hover:border-[#0D00FF]/30 hover:text-gray-900"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleSection("bedrooms")}
                  className="flex justify-between items-center w-full text-left font-medium mb-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Habitaciones
                  {expandedSections.bedrooms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.bedrooms && (
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, "3+"].map((num) => (
                      <button
                        key={num}
                        onClick={() => toggleFilter("bedrooms", num.toString())}
                        className={`px-3 py-2 backdrop-blur-sm border rounded-xl transition-all duration-200 ${
                          selectedFilters.bedrooms.includes(num.toString())
                            ? "bg-[#0D00FF] border-[#0D00FF] text-white font-medium"
                            : "bg-white/10 border-white/20 text-gray-700 hover:bg-white/20 hover:border-[#0D00FF]/30 hover:text-gray-900"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleSection("bathrooms")}
                  className="flex justify-between items-center w-full text-left font-medium mb-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Baños
                  {expandedSections.bathrooms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.bathrooms && (
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 1.5, 2.5, 3.5, "4+"].map((num) => (
                      <button
                        key={num}
                        onClick={() => toggleFilter("bathrooms", num.toString())}
                        className={`px-3 py-2 backdrop-blur-sm border rounded-xl transition-all duration-200 ${
                          selectedFilters.bathrooms.includes(num.toString())
                            ? "bg-[#0D00FF] border-[#0D00FF] text-white font-medium"
                            : "bg-white/10 border-white/20 text-gray-700 hover:bg-white/20 hover:border-[#0D00FF]/30 hover:text-gray-900"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleSection("garage")}
                  className="flex justify-between items-center w-full text-left font-medium mb-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Carros
                  {expandedSections.garage ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedSections.garage && (
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, "3+"].map((num) => (
                      <button
                        key={num}
                        onClick={() => toggleFilter("garage", num.toString())}
                        className={`px-3 py-2 backdrop-blur-sm border rounded-xl transition-all duration-200 ${
                          selectedFilters.garage.includes(num.toString())
                            ? "bg-[#0D00FF] border-[#0D00FF] text-white font-medium"
                            : "bg-white/10 border-white/20 text-gray-700 hover:bg-white/20 hover:border-[#0D00FF]/30 hover:text-gray-900"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Architectural Style Section */}
              <div>
                <button
                  onClick={() => toggleSection("architecturalStyle")}
                  className="flex justify-between items-center w-full text-left font-medium mb-3 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Estilo Arquitectónico
                  {expandedSections.architecturalStyle ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {expandedSections.architecturalStyle && (
                  <div className="space-y-2">
                    {["Moderno", "Tradicional", "Contemporáneo", "Rústico"].map((style) => (
                      <button
                        key={style}
                        onClick={() => toggleFilter("architecturalStyle", style)}
                        className={`w-full px-3 py-2 backdrop-blur-sm border rounded-xl text-left transition-all duration-200 ${
                          selectedFilters.architecturalStyle.includes(style)
                            ? "bg-[#0D00FF] border-[#0D00FF] text-white font-medium"
                            : "bg-white/10 border-white/20 text-gray-700 hover:bg-white/20 hover:border-[#0D00FF]/30 hover:text-gray-900"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Fixed */}
          <div className="flex-shrink-0 p-6 pt-4 border-t border-white/20">
            <button className="w-full bg-[#0D00FF] backdrop-blur-sm text-white py-3 rounded-xl font-medium hover:bg-[#0D00FF]/90 transition-all duration-300 shadow-lg border border-[#0D00FF]/30">
              Contáctanos
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
