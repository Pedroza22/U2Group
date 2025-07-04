"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { useParams } from "next/navigation"
import { getProjects } from "@/data/projects"

export default function ProjectDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const projectId = params.id
  const projects = getProjects(t)

  // Encontrar el proyecto actual por ID
  const project = projects.find((p) => p.id === Number(projectId)) || projects[0]

  // Otros proyectos para mostrar al final (excluye el actual)
  const otherProjects = projects.filter((p) => p.id !== project.id).slice(0, 2)

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* HEADER - Navegación principal */}
      <Header currentPage="proyectos" />

      {/* BOTÓN VOLVER - Para regresar a la lista de proyectos */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/proyectos">
          <Button variant="outline" className="neutra-font bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("proyectos")}
          </Button>
        </Link>
      </div>

      {/* CONTENIDO PRINCIPAL DEL PROYECTO */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* IMAGEN PRINCIPAL Y TÍTULO */}
          <div className="space-y-6">
            {/* Imagen principal del proyecto */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={project.images?.[0] || project.image || "/placeholder.svg"}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* TÍTULO DEL PROYECTO - Editable desde admin */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl neutra-font-black text-blue-600 leading-tight">
                {project.displayTitle || project.name}
              </h1>
            </div>
          </div>

          {/* INFORMACIÓN DEL PROYECTO - Detalles técnicos */}
          <div className="space-y-5.85">
            {/* Utilización del proyecto */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("utilization")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.utilization}</h2>
              <hr className="border-gray-300" />
            </div>

            {/* Servicios proporcionados */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("services")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.services}</h2>
              <hr className="border-gray-300" />
            </div>

            {/* Año de realización */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("year")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.year}</h2>
              <hr className="border-gray-300" />
            </div>

            {/* Categoría del proyecto */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("category")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.category}</h2>
              <hr className="border-gray-300" />
            </div>

            {/* Tipo de proyecto */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("type")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.type}</h2>
              <hr className="border-gray-300" />
            </div>

            {/* Tamaño del proyecto */}
            <div>
              <h3 className="text-gray-600 neutra-font mb-2">[{t("size")}]</h3>
              <h2 className="text-3xl neutra-font-bold text-blue-600 mb-4">{project.size}</h2>
              <hr className="border-gray-300" />
            </div>
          </div>
        </div>

        {/* GALERÍA DE IMÁGENES ADICIONALES - Grid adaptativo */}
        {project.images && project.images.length > 1 && (
          <div className="mt-16">
            <h3 className="text-2xl neutra-font-bold text-gray-900 mb-8 text-center">Galería del Proyecto</h3>

            {/* Grid que se adapta automáticamente según la cantidad de imágenes */}
            <div className="grid md:grid-cols-2 gap-8">
              {project.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.name} - Vista ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Overlay sutil al hacer hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DESCRIPCIÓN DEL PROYECTO - Información detallada */}
        {project.description && (
          <div className="mt-16 max-w-4xl">
            <h3 className="text-2xl neutra-font-bold text-gray-900 mb-6">Acerca de Este Proyecto</h3>
            <p className="text-lg text-gray-700 neutra-font leading-relaxed mb-8">{project.description}</p>

            {/* Características principales del proyecto */}
            {project.features && (
              <>
                <h4 className="text-xl neutra-font-bold text-gray-900 mb-4">Características Principales</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 neutra-font flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* OTROS PROYECTOS - Sugerencias relacionadas */}
        <div className="mt-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
            <span className="text-gray-600 neutra-font text-sm uppercase tracking-wider">{t("moreProjects")}</span>
          </div>

          <h2 className="text-4xl md:text-6xl neutra-font-black text-blue-600 mb-12">{t("otherProjects")}</h2>

          {/* Grid de proyectos relacionados */}
          <div className="grid md:grid-cols-2 gap-8">
            {otherProjects.map((otherProject) => (
              <Link key={otherProject.id} href={`/proyectos/${otherProject.id}`}>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <Image
                    src={otherProject.image || "/placeholder.svg"}
                    alt={otherProject.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-75"
                  />

                  {/* Logo de la empresa */}
                  <div className="absolute top-4 right-4 text-gray-600 neutra-font-bold text-lg opacity-70">U2</div>

                  {/* Título del proyecto */}
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-3xl md:text-4xl neutra-font-black text-white">{otherProject.name}</h3>
                  </div>

                  {/* Overlay con información al hacer hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    style={{ backgroundColor: `${otherProject.color}CC` }}
                  >
                    <div className="text-center text-white">
                      <h3 className="text-3xl md:text-4xl neutra-font-black mb-2">{otherProject.name}</h3>
                      <p className="text-lg neutra-font opacity-90">{t("viewProject")}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER - Información de contacto */}
      <Footer />
    </div>
  )
}
