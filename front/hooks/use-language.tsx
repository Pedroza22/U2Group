"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const translations = {
  es: {
    inicio: "Inicio",
    contacto: "Contacto",
    proyectos: "Proyectos",
    disena: "Diseña",
    blog: "Blog",
    nosotros: "Nosotros",
    marketplace: "Marketplace",
    productos: "Productos",
    favoritos: "Favoritos",
    carrito: "Carrito",
    ordenes: "Mis Pedidos",
    ajustes: "Configuración",
    salir: "Cerrar Sesión",
    iniciar_sesion: "Iniciar Sesión",
    conectado_como: "Conectado como",
    mi_cuenta: "Mi Cuenta",
    cerrar_sesion: "Cerrar Sesión",
    ver_perfil: "Ver Perfil",
    configuracion: "Configuración",
    idioma: "Idioma",
  },
  en: {
    inicio: "Home",
    contacto: "Contact",
    proyectos: "Projects",
    disena: "Design",
    blog: "Blog",
    nosotros: "About Us",
    marketplace: "Marketplace",
    productos: "Products",
    favoritos: "Favorites",
    carrito: "Cart",
    ordenes: "My Orders",
    ajustes: "Settings",
    salir: "Log Out",
    iniciar_sesion: "Sign In",
    conectado_como: "Signed in as",
    mi_cuenta: "My Account",
    cerrar_sesion: "Sign Out",
    ver_perfil: "View Profile",
    configuracion: "Settings",
    idioma: "Language",
  },
} as Record<string, any>;

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang && storedLang !== language) {
      setLanguage(storedLang);
      document.documentElement.lang = storedLang;
    } else {
      document.documentElement.lang = language;
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  };

  // Función de traducción
  const t = (key: string) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
