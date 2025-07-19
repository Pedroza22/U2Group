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
              <Link href="/privacidad" className="inline-flex items-center text-blue-100 hover:text-white transition-colors neutra-font text-sm">
                <FileText className="w-4 h-4 mr-2" />
                {t("privacyPolicy")}
              </Link>
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
                <a href="mailto:support-team@u2.group" className="hover:text-white transition-colors neutra-font">
                  support-team@u2.group
                </a>
              </li>
              <li>
                <a href="tel:+573164035330" className="hover:text-white transition-colors neutra-font">
                  +57 3164035330
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
            <div className="text-blue-100 text-sm neutra-font">© 2024 U2 GROUP. {t("allRightsReserved")}</div>
            {/* Redes sociales */}
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm neutra-font-bold mr-2">{t("followUs")}</span>
              <div className="flex space-x-3">
                <a href="https://www.linkedin.com/company/u2-group/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <Linkedin className="w-10 h-10" />
                </a>
                <a href="https://www.facebook.com/share/1DEBNZd94e/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <Facebook className="w-10 h-10" />
                </a>
                <a href="https://www.instagram.com/u2.group?igsh=MTB3MGZ2NzVnenBjaQ==" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <Instagram className="w-10 h-10" />
                </a>
                <a href="https://www.tiktok.com/@u2.group" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  {/* TikTok icono no está en lucide-react, puedes agregar uno SVG personalizado aquí si lo deseas */}
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2.25h2.25a.75.75 0 0 1 .75.75v2.25a3.75 3.75 0 0 0 3.75 3.75h.75a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-1.5v4.5a6.75 6.75 0 1 1-6.75-6.75.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75 3 3 0 1 0 3 3v-9a.75.75 0 0 1 .75-.75z"/></svg>
                </a>
                <a href="https://co.pinterest.com/u2group/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  {/* Icono Pinterest SVG */}
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.477 2.04 2 6.515 2 12.04c0 4.418 2.865 8.166 6.839 9.489-.094-.807-.179-2.048.037-2.93.195-.803 1.252-5.12 1.252-5.12s-.319-.64-.319-1.584c0-1.484.861-2.592 1.934-2.592.912 0 1.353.684 1.353 1.504 0 .916-.583 2.288-.884 3.565-.252 1.066.535 1.936 1.587 1.936 1.904 0 3.37-2.008 3.37-4.904 0-2.563-1.844-4.36-4.478-4.36-3.052 0-4.848 2.29-4.848 4.658 0 .924.355 1.918.8 2.456.09.11.104.206.076.316-.083.342-.267 1.086-.304 1.236-.048.195-.156.237-.362.143-1.35-.627-2.192-2.594-2.192-4.176 0-3.4 2.768-7.48 8.26-7.48 4.42 0 7.33 3.2 7.33 6.64 0 4.548-2.522 7.95-6.25 7.95-1.25 0-2.426-.676-2.83-1.438l-.77 2.93c-.233.89-.688 2.003-1.025 2.684.77.238 1.584.367 2.43.367 5.523 0 10-4.477 10-10.001 0-5.523-4.477-10-10-10z"/></svg>
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
