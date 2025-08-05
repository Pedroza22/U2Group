import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { STRIPE_CONFIG, PaymentIntentData, PaymentConfirmData, PaymentMethodData, CustomerData, CheckoutSessionData, RefundData } from '@/lib/stripe-config';

// Cargar Stripe
const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

// Tipos para las respuestas
interface PaymentIntentResponse {
  client_secret: string;
  payment_intent_id: string;
}

interface PaymentMethodResponse {
  id: string;
  type: string;
  [key: string]: any;
}

interface CustomerResponse {
  id: string;
  email: string;
  [key: string]: any;
}

interface CheckoutSessionResponse {
  id: string;
  url: string;
  [key: string]: any;
}

interface RefundResponse {
  id: string;
  amount: number;
  [key: string]: any;
}

interface TestConnectionResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

interface StripeConfigResponse {
  publishable_key: string;
  [key: string]: any;
}

export const useStripePayment = () => {
  const processPayment = async (data: PaymentIntentData) => {
    try {
      console.log('🚀 Procesando pago con Stripe...');
      console.log('🔗 URL:', STRIPE_CONFIG.createPaymentIntentUrl);
      console.log('💰 Datos:', data);

      // 1. Crear PaymentIntent en el backend
      const response = await axios.post<PaymentIntentResponse>(STRIPE_CONFIG.createPaymentIntentUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { client_secret, payment_intent_id } = response.data;
      console.log('✅ PaymentIntent creado:', payment_intent_id);

      // 2. Cargar Stripe
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe no se pudo cargar');
      }

      // 3. Mostrar el formulario de pago de Stripe
      const { error: stripeError } = await stripe.confirmPayment({
        clientSecret: client_secret,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        console.error('❌ Error de Stripe:', stripeError);
        throw new Error(stripeError.message)
      }

      // 4. Confirmar el pago en el backend
      const confirmResponse = await axios.post(STRIPE_CONFIG.confirmPaymentUrl, {
        payment_intent_id,
        order_id: data.order_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const confirmData = confirmResponse.data;
      console.log('✅ Pago confirmado:', confirmData);

      return { success: true, data: confirmData };
    } catch (error: any) {
      console.error('❌ Error en el proceso de pago:', error);
      
      // Manejar errores de axios
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Se ha producido un error de procesamiento.';
        throw new Error(errorMessage);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const createPaymentMethod = async (data: PaymentMethodData) => {
    try {
      console.log('🔧 Creando PaymentMethod...');
      
      const response = await axios.post<PaymentMethodResponse>(STRIPE_CONFIG.createPaymentMethodUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      console.log('✅ PaymentMethod creado:', result.id);
      return result;
    } catch (error: any) {
      console.error('❌ Error al crear PaymentMethod:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al crear método de pago.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const createCustomer = async (data: CustomerData) => {
    try {
      console.log('👤 Creando Customer...');
      
      const response = await axios.post<CustomerResponse>(STRIPE_CONFIG.createCustomerUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      console.log('✅ Customer creado:', result.id);
      return result;
    } catch (error: any) {
      console.error('❌ Error al crear Customer:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al crear cliente.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const createCheckoutSession = async (data: CheckoutSessionData) => {
    try {
      console.log('🛒 Creando Checkout Session...');
      
      const response = await axios.post<CheckoutSessionResponse>(STRIPE_CONFIG.createCheckoutSessionUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      console.log('✅ Checkout Session creada:', result.id);
      return result;
    } catch (error: any) {
      console.error('❌ Error al crear Checkout Session:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al crear sesión de checkout.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const refundPayment = async (data: RefundData) => {
    try {
      console.log('💰 Procesando reembolso...');
      
      const response = await axios.post<RefundResponse>(STRIPE_CONFIG.refundPaymentUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = response.data;
      console.log('✅ Reembolso procesado:', result.id);
      return result;
    } catch (error: any) {
      console.error('❌ Error al procesar reembolso:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al procesar reembolso.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const testConnection = async () => {
    try {
      console.log('🔍 Probando conexión con Stripe...');
      
      const response = await axios.get<TestConnectionResponse>(STRIPE_CONFIG.testConnectionUrl);

      const result = response.data;
      console.log('✅ Conexión exitosa:', result.message);
      return result;
    } catch (error: any) {
      console.error('❌ Error en test de conexión:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al probar conexión.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  const getStripeConfig = async () => {
    try {
      console.log('⚙️ Obteniendo configuración de Stripe...');
      
      const response = await axios.get<StripeConfigResponse>(STRIPE_CONFIG.configUrl);

      const result = response.data;
      console.log('✅ Configuración obtenida:', result);
      return result;
    } catch (error: any) {
      console.error('❌ Error al obtener configuración:', error);
      
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.detail || 'Error al obtener configuración.';
        throw new Error(errorMessage);
      } else {
        throw new Error(error.message || 'Error desconocido');
      }
    }
  };

  return {
    processPayment,
    createPaymentMethod,
    createCustomer,
    createCheckoutSession,
    refundPayment,
    testConnection,
    getStripeConfig,
  };
}; 