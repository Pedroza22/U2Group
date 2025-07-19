"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Crear Cuenta</h1>
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
        <input type="text" placeholder="Nombre" className="border px-4 py-2 rounded" required />
        <input type="email" placeholder="Email" className="border px-4 py-2 rounded" required />
        <input type="password" placeholder="Contraseña" className="border px-4 py-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Registrarse</button>
      </form>
      <p className="mt-4 text-gray-600">¿Ya tienes cuenta? <Link href="/login" className="text-blue-600 hover:underline">Inicia sesión</Link></p>
    </div>
  );
} 