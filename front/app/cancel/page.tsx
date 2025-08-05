'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">
            Pago Cancelado
          </CardTitle>
          <CardDescription>
            Tu transacción ha sido cancelada. No se ha procesado ningún cargo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-2">¿Qué pasó?</h3>
            <p className="text-sm text-yellow-700">
              El proceso de pago fue cancelado. Esto puede haber ocurrido por:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
              <li>Decisión del usuario</li>
              <li>Problemas de conexión</li>
              <li>Datos de tarjeta inválidos</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link href="/marketplace">
              <Button className="w-full" variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Marketplace
              </Button>
            </Link>
            <Link href="/stripe-test">
              <Button className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Intentar de Nuevo
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 