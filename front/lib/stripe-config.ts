// Configuración de Stripe
export const STRIPE_CONFIG = {
  // Clave pública de Stripe (desde el dashboard de Stripe)
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder',
  
  // URLs del backend para Stripe
  createPaymentIntentUrl: 'http://localhost:8000/api/stripe/create-payment-intent/',
  confirmPaymentUrl: 'http://localhost:8000/api/stripe/confirm-payment/',
  createPaymentMethodUrl: 'http://localhost:8000/api/stripe/create-payment-method/',
  createCustomerUrl: 'http://localhost:8000/api/stripe/create-customer/',
  createCheckoutSessionUrl: 'http://localhost:8000/api/stripe/create-checkout-session/',
  refundPaymentUrl: 'http://localhost:8000/api/stripe/refund-payment/',
  testConnectionUrl: 'http://localhost:8000/api/stripe/test-connection/',
  configUrl: 'http://localhost:8000/api/stripe/config/',
}

// Debug: Verificar variables de entorno
console.log('🔍 Stripe Config Debug:');
console.log('🔑 NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? 'Configurada' : 'No configurada');
console.log('🔗 createPaymentIntentUrl:', STRIPE_CONFIG.createPaymentIntentUrl);
console.log('🔗 createPaymentMethodUrl:', STRIPE_CONFIG.createPaymentMethodUrl);
console.log('🔗 createCustomerUrl:', STRIPE_CONFIG.createCustomerUrl);

// Tipos para Stripe
export interface PaymentIntentData {
  amount: number;
  currency: string;
  order_id: string;
  customer_email: string;
}

export interface PaymentConfirmData {
  payment_intent_id: string;
  order_id: string;
}

export interface PaymentMethodData {
  type: string;
  card?: {
    token?: string;
    number?: string;
    exp_month?: number;
    exp_year?: number;
    cvc?: string;
  };
  billing_details?: {
    name?: string;
    email?: string;
    address?: {
      line1?: string;
      line2?: string;
      city?: string;
      state?: string;
      postal_code?: string;
      country?: string;
    };
  };
}

export interface CustomerData {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionData {
  line_items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description?: string;
      };
      unit_amount: number;
    };
    quantity: number;
  }>;
  success_url: string;
  cancel_url: string;
  customer_email?: string;
  metadata?: Record<string, string>;
}

export interface RefundData {
  payment_intent_id: string;
  amount?: number;
  reason?: string;
}

// Función para validar la configuración de Stripe
export const validateStripeConfig = () => {
  if (!STRIPE_CONFIG.publishableKey || STRIPE_CONFIG.publishableKey === 'pk_test_placeholder') {
    console.warn('⚠️ Stripe no está configurado correctamente. Configura NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY en tu .env.local');
    return false;
  }
  return true;
} 