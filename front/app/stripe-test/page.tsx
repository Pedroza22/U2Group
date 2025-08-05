import StripeTest from '@/components/stripe-test';
import StripeCheckout from '@/components/stripe-checkout';

export default function StripeTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🧪 Pruebas de Integración de Stripe
          </h1>
          <p className="text-gray-600">
            Prueba todas las funcionalidades de Stripe con tu backend
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pruebas básicas */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">🔧 Pruebas Básicas</h2>
            <StripeTest />
          </div>
          
          {/* Checkout avanzado */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">💳 Checkout Avanzado</h2>
            <StripeCheckout
              amount={99.99}
              productName="Producto de Prueba"
              orderId={`test_${Date.now()}`}
              customerEmail="test@example.com"
              onSuccess={(data) => console.log('Pago exitoso:', data)}
              onError={(error) => console.error('Error:', error)}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 