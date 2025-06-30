"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, LinkIcon } from "lucide-react"

interface ImageUploaderProps {
  value?: string
  onChange: (value: string) => void
  label?: string
}

export default function ImageUploader({ value = "", onChange, label = "Imagen" }: ImageUploaderProps) {
  // Estado para controlar el modo de subida (archivo o URL)
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file")
  const [urlInput, setUrlInput] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Asegurar que value nunca sea undefined
  const imgSrc = value || ""

  // Función para manejar la subida de archivos
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validar que sea una imagen
      if (!file.type.startsWith("image/")) {
        alert("Por favor selecciona un archivo de imagen válido")
        return
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo 5MB.")
        return
      }

      // Convertir a base64 para preview local
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para manejar URL externa
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput("")
    }
  }

  // Función para eliminar imagen
  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {/* Label del campo */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Selector de modo de subida */}
      <div className="flex gap-2 mb-4">
        <Button
          type="button"
          variant={uploadMode === "file" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMode("file")}
          className="text-xs"
        >
          <Upload className="w-3 h-3 mr-1" />
          Archivo
        </Button>
        <Button
          type="button"
          variant={uploadMode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMode("url")}
          className="text-xs"
        >
          <LinkIcon className="w-3 h-3 mr-1" />
          URL
        </Button>
      </div>

      {/* Preview de la imagen actual */}
      {imgSrc && (
        <div className="relative">
          <img
            src={imgSrc.startsWith("data:") ? imgSrc : imgSrc || "/placeholder.svg?height=200&width=300"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
            onError={() => {
              // Si la imagen falla al cargar, usar placeholder
              onChange("/placeholder.svg?height=200&width=300")
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
            className="absolute top-2 right-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Área de subida según el modo seleccionado */}
      {uploadMode === "file" ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Arrastra una imagen aquí o</p>
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="text-sm">
            Seleccionar archivo
          </Button>
          <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF hasta 5MB</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="button" onClick={handleUrlSubmit} size="sm">
              Agregar
            </Button>
          </div>
          <p className="text-xs text-gray-500">Pega la URL de una imagen externa</p>
        </div>
      )}
    </div>
  )
}
