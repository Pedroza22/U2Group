"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useLanguage } from "@/hooks/use-language"
import { getProjects } from "@/data/projects"

export default function ProyectosPage() {
  const { t } = useLanguage()
  const projects = getProjects(t)

  return (
    <div className="min-h-screen bg-white neutra-font">
      {/* HEADER */}
      <Header currentPage="proyectos" />

      {/* HEADER DE LA PÁGINA */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl neutra-font-black text-blue-600 mb-4">{t("projectsTitle")}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto neutra-font">{t("projectsSubtitle")}</p>
          </div>
        </div>
      </div>

      {/* GRID DE PROYECTOS */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {projects.map((project, index) => {
            const heights = [
              "aspect-[4/5]",
              "aspect-[4/3]",
              "aspect-[4/5]",
              "aspect-[4/3]",
              "aspect-[4/5]",
              "aspect-[4/3]",
              "aspect-[4/5]",
              "aspect-[4/3]",
              "aspect-[4/5]",
              "aspect-[4/3]",
            ]

            return (
              <Link key={project.id} href={`/proyectos/${project.id}`}>
                <div
                  className={`relative ${heights[index]} rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-75"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  />

                  <div className="absolute top-4 right-4 text-gray-600 neutra-font-bold text-lg opacity-70">U2</div>

                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                    style={{ backgroundColor: `${project.color}CC` }}
                  >
                    <div className="text-center text-white">
                      <h3 className="text-2xl md:text-3xl neutra-font-black mb-2">{project.name}</h3>
                      <p className="text-sm md:text-base neutra-font opacity-90">{project.category}</p>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-0 transition-all duration-300"
                    style={{ backgroundColor: project.color }}
                  />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* OTHER PROJECTS */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-gray-600 neutra-font text-sm uppercase tracking-wider">{t("moreProjects")}</span>
        </div>

        <h2 className="text-4xl md:text-6xl neutra-font-black text-blue-600 mb-12">{t("Nuestros Destacados")}</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.slice(3, 5).map((project) => (
            <Link key={project.id} href={`/proyectos/${project.id}`}>
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-75"
                />

                <div className="absolute top-4 right-4 text-gray-600 neutra-font-bold text-lg opacity-70">U2</div>

                <div className="absolute bottom-6 left-6">
                  <h3 className="text-3xl md:text-4xl neutra-font-black text-white">{project.name}</h3>
                </div>

                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center"
                  style={{ backgroundColor: `${project.color}CC` }}
                >
                  <div className="text-center text-white">
                    <h3 className="text-3xl md:text-4xl neutra-font-black mb-2">{project.name}</h3>
                    <p className="text-lg neutra-font opacity-90">{project.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl neutra-font-bold mb-4">{t("haveProject")}</h2>
          <p className="text-xl mb-8 text-blue-100 neutra-font">{t("contactTeam")}</p>
          <Link href="/contacto">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 neutra-font">
              {t("startProject")}
            </Button>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}
