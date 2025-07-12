"use client"

import { Instagram, Facebook, Youtube, Linkedin, Twitter, FileText } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full text-white py-12" style={{ backgroundColor: "#0D00FF" }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo y enlace a políticas */}
          <div className="md:col-span-1">
            {/* Solo texto U2 GROUP más grande */}
            <div className="mb-4">
              <h2 className="text-3xl neutra-font-bold">U2 GROUP</h2>
            </div>
            {/* Enlace a políticas de privacidad */}
            <div className="mt-4">
              <a href="/documents/politicas-privacidad.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-100 hover:text-white transition-colors neutra-font text-sm">
                <FileText className="w-4 h-4 mr-2" />
                {t("privacyPolicy")}
              </a>
            </div>
          </div>
          {/* Servicios */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">{t("services")}</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <Link href="/disena" className="hover:text-white transition-colors neutra-font">
                  {t("architecturalDesign")}
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors neutra-font">
                  {t("consulting")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Empresa */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <Link href="/nosotros" className="hover:text-white transition-colors neutra-font">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors neutra-font">
                  {t("blog")}
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors neutra-font">
                  {t("adminPanel")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Contacto */}
          <div>
            <h3 className="text-white neutra-font-bold mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li>
                <a href="mailto:info@u2group.com" className="hover:text-white transition-colors neutra-font">
                  info@u2group.com
                </a>
              </li>
              <li>
                <a href="tel:+573043001791" className="hover:text-white transition-colors neutra-font">
                  +57 3043001791
                </a>
              </li>
              <li>
                <span className="neutra-font">Pasto, Colombia</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-400 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-blue-100 text-sm neutra-font">© 2022 U2 GROUP. {t("allRightsReserved")}</div>
            {/* Redes sociales */}
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm neutra-font-bold mr-2">{t("followUs")}</span>
              <div className="flex space-x-3">
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <Linkedin className="w-10 h-10" />
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <Facebook className="w-10 h-10" />
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <Instagram className="w-10 h-10" />
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <Twitter className="w-10 h-10" />
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  <Youtube className="w-10 h-10" />
                </a>
              </div>
            </div>
          </div>
          {/* Créditos de desarrollo */}
          <div className="text-center mt-4">
            <div className="text-xs text-blue-100 neutra-font">
              {t("developedBy")}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
