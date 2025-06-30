export interface Project {
  id: number
  name: string
  color: string // Solo colores de la paleta de la empresa
  image: string
  utilization: string
  services: string
  year: string
  category: string
  type: string
  size: string
  location: string
  status: string
  featured: boolean
  description?: string
  features?: string[]
  images?: string[]
}

// PALETA DE COLORES DE LA EMPRESA - SOLO AZULES
export const COMPANY_COLORS = {
  PRIMARY_BLUE: "#3B82F6", // Azul principal
  DARK_BLUE: "#1E40AF", // Azul oscuro
  LIGHT_BLUE: "#60A5FA", // Azul claro
  NAVY_BLUE: "#1E3A8A", // Azul marino
  SKY_BLUE: "#0EA5E9", // Azul cielo
}

import { AdminDataManager } from "./admin-data"

export const getProjects = (t: (key: string) => string): Project[] => {
  // OBTENER PROYECTOS DESDE EL ADMINISTRADOR
  const adminProjects = AdminDataManager.getProjects()

  // CONVERTIR A FORMATO COMPATIBLE
  return adminProjects.map((project) => ({
    ...project,
    utilization: t(project.utilization) || project.utilization,
    services: t(project.services) || project.services,
    category: t(project.category) || project.category,
    type: t(project.type) || project.type,
  }))
}
