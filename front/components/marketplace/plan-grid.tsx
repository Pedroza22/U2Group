"use client"

import Image from "next/image"
import { Heart, Home, Camera } from "lucide-react"
import { Product } from "@/lib/api-products"

interface PlanGridProps {
  products: Product[];
  unit: "sqft" | "m2";
  filters: Record<string, any>;
  sortBy: string;
  onProductClick: (id: number) => void;
}

export default function PlanGrid({
  products,
  unit,
  filters,
  sortBy,
  onProductClick
}: PlanGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          onClick={() => onProductClick(product.id)}
        >
          <div className="relative aspect-square">
            <Image
              src={product.main_image}
              alt={product.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50">
                <Home className="w-4 h-4 text-gray-700" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50">
                <Heart className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-lg font-bold text-blue-600">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium">{unit === "m2" ? product.area_m2 : product.area_sqft}</p>
                <p className="text-xs">{unit === "m2" ? "m²" : "sq.ft"}</p>
              </div>
              <div>
                <p className="font-medium">{product.bedrooms}</p>
                <p className="text-xs">Bed</p>
              </div>
              <div>
                <p className="font-medium">{product.bathrooms}</p>
                <p className="text-xs">Bath</p>
              </div>
              <div>
                <p className="font-medium">{product.garage}</p>
                <p className="text-xs">Cars</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
