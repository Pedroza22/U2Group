"use client"

import { Image as ImageIcon, LayoutGrid } from "lucide-react"

interface ControlsBarProps {
  isSticky?: boolean;
  activeView: "images" | "plans";
  setActiveView: (view: "images" | "plans") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function ControlsBar({
  isSticky = false,
  activeView,
  setActiveView,
  sortBy,
  setSortBy
}: ControlsBarProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeView === "images" 
              ? "bg-gray-100/80 text-gray-900" 
              : "text-gray-900 hover:bg-gray-50/80"
          }`}
          onClick={() => setActiveView("images")}
        >
          <ImageIcon className="w-5 h-5" />
          Plan Images
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
            activeView === "plans" 
              ? "bg-gray-100/80 text-gray-900" 
              : "text-gray-900 hover:bg-gray-50/80"
          }`}
          onClick={() => setActiveView("plans")}
        >
          <LayoutGrid className="w-5 h-5" />
          Floor Plans
        </button>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-transparent text-gray-900 border border-gray-200/80 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200/80 hover:bg-gray-50/80 transition-colors"
      >
        <option value="trending">Trending</option>
        <option value="newest">Newest</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  )
} 