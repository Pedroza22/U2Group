"use client";

import React from "react";

export default function PoliticaCookies() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900 py-16 px-2">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl animate-pulse" style={{zIndex:0}} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-2xl animate-pulse" style={{zIndex:0}} />
      </div>
      <section className="relative z-10 w-full max-w-2xl bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-8 md:p-12 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-yellow-400 text-white rounded-full p-4 shadow-lg mb-4 animate-bounce">
            <span className="text-4xl">🍪</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 tracking-tight text-yellow-600 dark:text-yellow-300 drop-shadow-lg">Política de Cookies</h1>
          <p className="text-base text-zinc-500 dark:text-zinc-300 mb-2">Última actualización: 12 de julio de 2025</p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 rounded-full mb-2" />
        </div>
        <h2 className="text-xl font-semibold mb-2">¿Qué son las cookies?</h2>
        <p className="mb-4">Las cookies son pequeños archivos que se almacenan en tu dispositivo para mejorar tu experiencia de navegación, analizar el uso del sitio y personalizar la publicidad.</p>
        <h2 className="text-xl font-semibold mb-2">¿Qué tipos de cookies usamos?</h2>
        <ul className="list-disc ml-6 mb-4">
          <li><b>Funcionales:</b> Necesarias para el funcionamiento básico del sitio.</li>
          <li><b>Analíticas:</b> Nos ayudan a entender cómo usas el sitio (ej: Google Analytics).</li>
          <li><b>Publicitarias:</b> Permiten mostrarte anuncios personalizados (solo si das tu consentimiento).</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">¿Qué datos recogen?</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Dirección IP y tipo de navegador</li>
          <li>Páginas visitadas y tiempo de navegación</li>
          <li>Preferencias de idioma y configuración</li>
        </ul>
        <h2 className="text-xl font-semibold mb-2">Consentimiento y gestión</h2>
        <p className="mb-4">Al navegar por nuestro sitio, puedes aceptar o rechazar el uso de cookies no esenciales mediante el banner de cookies. Puedes revocar tu consentimiento en cualquier momento usando el botón a continuación.</p>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => {
            localStorage.removeItem('cookiesAccepted');
            window.location.reload();
          }}
        >
          Revocar consentimiento
        </button>
        <h2 className="text-xl font-semibold mb-2">Más información</h2>
        <p>Para más detalles, consulta nuestra <a href="/privacidad" className="text-blue-600 underline">Política de Privacidad</a> o escríbenos a <a href="mailto:contact@u2.group" className="text-blue-600 underline">contact@u2.group</a>.</p>
      </section>
    </main>
  );
} 