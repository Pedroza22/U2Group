"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Camera, Home } from "lucide-react"

interface Plan {
  id: string
  name: string
  image: string
  price: number
  sqft: number
  bedrooms: number
  bathrooms: number
  stories: number
  garage: number
  isExclusive: boolean
}

interface PlanCardProps {
  plan: Plan
  unit: "sqft" | "m2"
}

export default function PlanCard({ plan, unit }: PlanCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const convertSqftToM2 = (sqft: number) => {
    return (sqft * 0.092903).toFixed(0)
  }

  const displaySqft = unit === "m2" ? convertSqftToM2(plan.sqft) : plan.sqft.toLocaleString()
  const displayUnitLabel = unit === "m2" ? "m²" : "Sq. Ft."

  return (
    <Link href={`/plan/${plan.id}`}>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/20 hover:border-white/30 cursor-pointer">
        <div className="relative">
          <Image
            src={plan.image || "/placeholder.svg"}
            alt={plan.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <button
              className="p-1 bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/30 hover:bg-white/30 transition-all"
              onClick={(e) => e.preventDefault()}
            >
              <Camera className="w-4 h-4 text-gray-700" />
            </button>
            <button
              className="p-1 bg-white/20 backdrop-blur-md rounded-full shadow-lg border border-white/30 hover:bg-white/30 transition-all"
              onClick={(e) => e.preventDefault()}
            >
              <Home className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 p-1 backdrop-blur-md rounded-full shadow-lg border transition-all ${
              isFavorite
                ? "bg-[#0D00FF]/90 border-[#0D00FF]/50 hover:bg-[#0D00FF]"
                : "bg-white/20 border-white/30 hover:bg-white/30"
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "text-white fill-white" : "text-gray-700"}`} />
          </button>
          {plan.isExclusive && (
            <div className="absolute bottom-2 left-2 bg-[#0D00FF]/90 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-xs font-semibold border border-[#0D00FF]/30 shadow-lg">
              EXCLUSIVO
            </div>
          )}
        </div>

        <div className="p-4 bg-gradient-to-br from-white/5 to-transparent">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-800">{plan.name}</h3>
            <div className="text-right">
              <div className="text-xs text-gray-600">desde</div>
              <div className="font-bold text-[#0D00FF]">${plan.price.toLocaleString()}</div>
            </div>
          </div>

          <div className="text-xs text-gray-600 mb-2">Número de Plan</div>

          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-800">{displaySqft}</div>
              <div className="text-gray-600">{displayUnitLabel}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{plan.bedrooms}</div>
              <div className="text-gray-600">Hab</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{plan.bathrooms}</div>
              <div className="text-gray-600">Baño</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{plan.stories}</div>
              <div className="text-gray-600">Piso</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-800">{plan.garage}</div>
              <div className="text-gray-600">Autos</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
