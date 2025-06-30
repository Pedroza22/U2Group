"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export default function PriceCalculator({ onClose }: { onClose?: () => void }) {
  const { t } = useLanguage()

  const INITIAL_AREA = 75
  const MAX_AREA = 200
  const PRICE_PER_M2 = 4

  const [area, setArea] = useState(INITIAL_AREA)
  const total = area * PRICE_PER_M2

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          backgroundColor: "transparent",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: "bold",
            lineHeight: "1.1",
            color: "#262626",
            marginBottom: "0",
          }}
          className="neutra-font-bold animate-fade-in-up"
        >
          {t("turn every square meter info")}{" "}
          <span
            style={{
              color: "#0D00FF",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: "900",
              display: "inline-block",
              lineHeight: "0.9",
            }}
            className="neutra-font-black"
          >
            {t("something extraordinary")}{" "}
          </span>
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "clamp(22px, 5vw, 32px)",
            fontWeight: "600",
            color: "#262626",
          }}
          className="neutra-font-bold animate-fade-in-up animation-delay-200"
        >
          {t("start building your dream space starting from")}{" "}
          <span
            style={{
              color: "#0D00FF",
              fontSize: "clamp(32px, 6vw, 60px)",
              fontWeight: "900",
              lineHeight: "1.1",
            }}
            className="neutra-font-black"
          >
            ${total.toLocaleString("en-US")} USD
          </span>{" "}
          {t("With U2 Group")}
        </p>

        <p
          style={{
            marginTop: "10px",
            fontSize: "clamp(18px, 4vw, 22px)",
            fontWeight: "500",
            color: "#262626",
          }}
          className="neutra-font animate-fade-in-up animation-delay-400"
        >
          <span
            style={{
              fontSize: "clamp(20px, 5vw, 27px)",
              fontWeight: 600,
              color: "#0D00FF",
            }}
            className="neutra-font-bold"
          >
            {area} m²
          </span>{" "}
          · ${PRICE_PER_M2} {t("USD per m²")} ·{" "}
        </p>

        <p
          style={{
            marginTop: "10px",
            fontSize: "clamp(16px, 4vw, 20px)",
            color: "#262626",
            marginBottom: "30px",
          }}
          className="neutra-font animate-fade-in-up animation-delay-500"
        >
          {t("Learn More About")}{" "}
          <a
            href="https://u2group.framer.website/u2/en/calculator"
            style={{
              color: "#0D00FF",
              fontWeight: "600",
              fontSize: "inherit",
              textDecoration: "none",
              borderBottom: "2px solid #0D00FF",
              paddingBottom: "2px",
            }}
            className="neutra-font-bold hover:opacity-80 transition-opacity"
          >
            {t("How We Calculate Your Project Cost")}
          </a>
        </p>

        <div style={{ marginTop: "30px", marginBottom: "40px" }} className="animate-fade-in-up animation-delay-600">
          <input
            id="area-range"
            type="range"
            min={1}
            max={MAX_AREA}
            step={1}
            value={area}
            onChange={(e) => setArea(Number.parseInt(e.target.value))}
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "5px",
              background: `linear-gradient(to right, #0D00FF 0%, #0D00FF ${(area / MAX_AREA) * 100}%, #ddd ${(area / MAX_AREA) * 100}%, #ddd 100%)`,
              outline: "none",
              opacity: "0.8",
              transition: "opacity 0.2s",
            }}
            className="slider cursor-pointer"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto animate-fade-in-up animation-delay-700">
          <Link href="/disena" className="w-full sm:w-auto">
            <Button
              className="w-full sm:w-auto text-white px-8 py-3 text-lg font-medium neutra-font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: "#0D00FF",
                border: "none",
              }}
            >
              {t("Design Your Project")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Botón de cerrar si es modal */}
        {onClose && (
          <div className="text-center mt-6 animate-fade-in-up animation-delay-800">
            <Button
              onClick={onClose}
              variant="outline"
              className="neutra-font bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              {t("language") === "es" ? "Cerrar" : "Close"}
            </Button>
          </div>
        )}
      </div>

      {/* Estilos CSS para animaciones y slider */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-700 {
          animation-delay: 0.7s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .slider {
          -webkit-appearance: none;
          appearance: none;
        }
        
        .slider:hover {
          opacity: 1;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #0D00FF;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(13, 0, 255, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(13, 0, 255, 0.4);
        }

        .slider::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #0D00FF;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(13, 0, 255, 0.3);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(13, 0, 255, 0.4);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          border-radius: 5px;
          background: transparent;
        }

        .slider::-moz-range-track {
          height: 8px;
          border-radius: 5px;
          background: #ddd;
        }

        .slider::-moz-range-progress {
          height: 8px;
          border-radius: 5px;
          background: #0D00FF;
        }
      `}</style>
    </div>
  )
}
