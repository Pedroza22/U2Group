"use client";

import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Mis Favoritos</h1>
      <p className="mb-6 text-gray-600">Aún no tienes favoritos guardados.</p>
      <Link href="/marketplace" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">Explorar Marketplace</Link>
    </div>
  );
} 