'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payment_intent = searchParams.get('payment_intent');
    const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');

    if (payment_intent) {
      // Aquí podrías hacer una llamada al backend para obtener detalles del pago
      setPaymentDetails({
        payment_intent,
        status: 'succeeded',
        amount: '10.00', // Esto vendría del backend
        currency: 'USD'
      });
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            ¡Pago Exitoso!
          </CardTitle>
          <CardDescription>
            Tu transacción se ha completado correctamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentDetails && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Detalles del Pago:</h3>
              <div className="space-y-1 text-sm">
                <div><span className="font-medium">ID:</span> {paymentDetails.payment_intent}</div>
                <div><span className="font-medium">Estado:</span> 
                  <span className="text-green-600 ml-1">Pagado</span>
                </div>
                <div><span className="font-medium">Monto:</span> ${paymentDetails.amount} {paymentDetails.currency}</div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <Link href="/marketplace">
              <Button className="w-full" variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Marketplace
              </Button>
            </Link>
            <Link href="/stripe-test">
              <Button className="w-full">
                🧪 Más Pruebas de Stripe
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 