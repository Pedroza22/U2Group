"use client"

import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FooterV2() {
  return (
    <footer className="w-full bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y descripción */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image src="/images/u2-logo.png" alt="U2 Group" width={40} height={40} className="mr-3" />
              <span className="text-xl neutra-font-bold">U2 GROUP</span>
            </div>
            <p className="text-blue-200 text-sm neutra-font leading-relaxed">
              Arquitectura que desafía el status quo. Creamos espacios únicos que reflejan tu visión y estilo de vida.
            </p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>
                <Link href="/disena" className="hover:text-white transition-colors neutra-font">
                  Diseño Arquitectónico
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="hover:text-white transition-colors neutra-font">
                  Proyectos Residenciales
                </Link>
              </li>
              <li>
                <Link href="/proyectos" className="hover:text-white transition-colors neutra-font">
                  Proyectos Comerciales
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors neutra-font">
                  Consultoría
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors neutra-font">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors neutra-font">
                  Blog
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors neutra-font">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">Contacto</h3>
            <div className="space-y-2 text-blue-200 text-sm">
              <p className="neutra-font">info@u2group.com</p>
              <p className="neutra-font">+57 3043001791</p>
              <p className="neutra-font">Pasto , Colombia </p>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-blue-200 text-sm neutra-font">© 2025 U2 GROUP. Todos los derechos reservados.</div>

            {/* Redes sociales */}
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm neutra-font-bold mr-2">Síguenos</span>
              <div className="flex space-x-3">
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-blue-200 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Créditos de desarrollo */}
          <div className="text-center mt-4">
            <div className="text-xs text-blue-300 neutra-font">Desarrollado por: Jpedroza & Jaraagb Developers inc.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
