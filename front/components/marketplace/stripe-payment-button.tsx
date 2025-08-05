'use client';

import { useState } from 'react';
import { useStripePayment } from '@/hooks/use-stripe-payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  main_image?: string;
  image?: string;
}

interface StripePaymentButtonProps {
  cartItems: CartItem[];
  totalAmount: number;
  customerEmail: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onCancel?: () => void;
}

export default function StripePaymentButton({
  cartItems,
  totalAmount,
  customerEmail,
  onSuccess,
  onError,
  onCancel
}: StripePaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const { processPayment, createCheckoutSession } = useStripePayment();
  const { toast } = useToast();

  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de pagar",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Crear línea de items para Stripe
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: item.main_image ? [item.main_image] : item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convertir a centavos
        },
        quantity: item.quantity,
      }));

      // Crear sesión de checkout
      const session = await createCheckoutSession({
        line_items: lineItems,
        success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${window.location.origin}/marketplace/cart`,
        customer_email: customerEmail,
        metadata: {
          order_id: `order_${Date.now()}`,
          cart_items: JSON.stringify(cartItems.map(item => ({ id: item.id, quantity: item.quantity })))
        }
      });

      // Redirigir a Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('No se pudo crear la sesión de checkout');
      }

    } catch (error: any) {
      console.error('Error en el pago:', error);
      setPaymentStatus('error');
      
      const errorMessage = error.message || 'Error al procesar el pago';
      toast({
        title: "Error de pago",
        description: errorMessage,
        variant: "destructive"
      });
      
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectPayment = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de pagar",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');

    try {
      // Procesar pago directo
      const result = await processPayment({
        amount: totalAmount,
        currency: 'usd',
        order_id: `order_${Date.now()}`,
        customer_email: customerEmail,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))
      });

      setPaymentStatus('success');
      toast({
        title: "¡Pago exitoso!",
        description: "Tu pedido ha sido procesado correctamente",
        variant: "default"
      });

      onSuccess?.(result);

    } catch (error: any) {
      console.error('Error en el pago directo:', error);
      setPaymentStatus('error');
      
      const errorMessage = error.message || 'Error al procesar el pago';
      toast({
        title: "Error de pago",
        description: errorMessage,
        variant: "destructive"
      });
      
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Procesar Pago
        </CardTitle>
        <CardDescription>
          Total a pagar: ${totalAmount.toFixed(2)} USD
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Resumen del carrito */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-700">Resumen del pedido:</h4>
          <div className="text-sm text-gray-600 space-y-1">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estado del pago */}
        {paymentStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              ¡Pago procesado exitosamente! Redirigiendo...
            </AlertDescription>
          </Alert>
        )}

        {paymentStatus === 'error' && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Error al procesar el pago. Intenta nuevamente.
            </AlertDescription>
          </Alert>
        )}

        {/* Botones de pago */}
        <div className="space-y-2">
          <Button
            onClick={handlePayment}
            disabled={loading || cartItems.length === 0}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pagar con Stripe Checkout
              </>
            )}
          </Button>

          <Button
            onClick={handleDirectPayment}
            disabled={loading || cartItems.length === 0}
            variant="outline"
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              'Pago Directo (Modal)'
            )}
          </Button>

          {onCancel && (
            <Button
              onClick={onCancel}
              variant="ghost"
              className="w-full"
              disabled={loading}
            >
              Cancelar
            </Button>
          )}
        </div>

        {/* Información de seguridad */}
        <div className="text-xs text-gray-500 text-center">
          🔒 Tus datos de pago están protegidos por Stripe
        </div>
      </CardContent>
    </Card>
  );
} 