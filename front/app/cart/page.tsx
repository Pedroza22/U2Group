"use client"
import { useSearchParams } from "next/navigation"

export default function CartPage() {
  const params = useSearchParams();
  const success = params.get("success");
  const canceled = params.get("canceled");

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      {success && (
        <div className="text-green-600 text-2xl font-bold mb-4">¡Pago realizado con éxito!</div>
      )}
      {canceled && (
        <div className="text-red-600 text-2xl font-bold mb-4">El pago fue cancelado.</div>
      )}
      {!success && !canceled && (
        <div className="text-gray-700 text-xl">Tu carrito está vacío o pendiente de pago.</div>
      )}
    </div>
  );
} 