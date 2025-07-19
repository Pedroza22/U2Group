"use client";

import Link from "next/link";

export default function CartPage() {
  // Aquí podrías usar el contexto del carrito para mostrar productos
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Carrito de Compras</h1>
      <p className="mb-6 text-gray-600">Tu carrito está vacío.</p>
      <Link href="/marketplace" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Ir al Marketplace</Link>
    </div>
  );
} 