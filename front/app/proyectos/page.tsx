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
      <Header currentPage="proyectos" />
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-white via-blue-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl neutra-font-black text-blue-700 mb-8 drop-shadow-md">{t("projectsTitle")}</h1>
            <p className="text-2xl text-gray-700 mb-8 neutra-font max-w-2xl mx-auto">{t("projectsSubtitle")}</p>
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      {/* Aquí iría el listado de proyectos, puedes aplicar tarjetas similares a las de blog/noticias */}
      <section className="w-full py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl neutra-font-black text-blue-600 mb-4 drop-shadow-md">{t("Nuestros Destacados")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {projects.map((project) => (
              <Link key={project.id} href={`/proyectos/${project.id}`}>
                <div className="bg-white border-2 border-blue-100 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow cursor-pointer overflow-hidden group">
                  <div className="relative h-56 w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover w-full h-full group-hover:brightness-90 transition-all duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4 text-blue-600 neutra-font-bold text-lg opacity-80 bg-white bg-opacity-70 px-3 py-1 rounded-full">{project.year}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl neutra-font-black text-blue-700 mb-2">{project.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">{project.category}</span>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">{project.type}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 neutra-font">{project.location}</p>
                    <p className="text-gray-700 text-sm neutra-font line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="w-full h-2 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 my-8" />
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl neutra-font-bold mb-4 text-blue-700">{t("haveProject")}</h2>
          <p className="text-xl mb-8 text-blue-900 neutra-font">{t("contactTeam")}</p>
          <Link href="/contacto">
            <Button className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-10 py-4 rounded-full neutra-font-black shadow-xl text-lg">
              {t("startProject")}
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
