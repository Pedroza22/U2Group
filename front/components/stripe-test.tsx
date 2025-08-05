'use client';

import { useState } from 'react';
import { useStripePayment } from '@/hooks/use-stripe-payment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function StripeTest() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [amount, setAmount] = useState('10.00');
  const [email, setEmail] = useState('test@example.com');
  
  const {
    processPayment,
    createPaymentMethod,
    createCustomer,
    createCheckoutSession,
    refundPayment,
    testConnection,
    getStripeConfig,
  } = useStripePayment();

  const addResult = (test: string, success: boolean, data?: any, error?: string) => {
    setResults(prev => [...prev, {
      test,
      success,
      data,
      error,
      timestamp: new Date().toLocaleTimeString()
    }]);
  };

  const runTest = async (testName: string, testFn: () => Promise<any>) => {
    setLoading(true);
    try {
      const result = await testFn();
      addResult(testName, true, result);
    } catch (error) {
      addResult(testName, false, null, error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const testConfig = () => runTest('Configuración', getStripeConfig);
  const testConnectionBtn = () => runTest('Conexión', testConnection);
  const testCustomer = () => runTest('Customer', () => createCustomer({ email, name: 'Test Customer' }));
  const testPaymentMethod = () => runTest('PaymentMethod', () => createPaymentMethod({
    type: 'card',
    card: { token: 'tok_visa' },
    billing_details: { name: 'Test User', email }
  }));
  const testPaymentIntent = () => runTest('PaymentIntent', () => processPayment({
    amount: parseFloat(amount),
    currency: 'usd',
    order_id: `test_${Date.now()}`,
    customer_email: email
  }));
  const testCheckoutSession = () => runTest('Checkout Session', () => createCheckoutSession({
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'Test Product' },
        unit_amount: Math.round(parseFloat(amount) * 100)
      },
      quantity: 1
    }],
    success_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`,
    customer_email: email
  }));

  const clearResults = () => setResults([]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Pruebas de Stripe</CardTitle>
          <CardDescription>
            Prueba la integración completa de Stripe con tu backend
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Monto ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10.00"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button onClick={testConfig} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '⚙️ Config'}
            </Button>
            <Button onClick={testConnectionBtn} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '🔗 Conexión'}
            </Button>
            <Button onClick={testCustomer} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '👤 Customer'}
            </Button>
            <Button onClick={testPaymentMethod} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '💳 PaymentMethod'}
            </Button>
            <Button onClick={testPaymentIntent} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '💰 PaymentIntent'}
            </Button>
            <Button onClick={testCheckoutSession} disabled={loading} variant="outline" size="sm">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : '🛒 Checkout'}
            </Button>
          </div>

          <Button onClick={clearResults} variant="destructive" size="sm">
            🗑️ Limpiar resultados
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Resultados de las Pruebas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.map((result, index) => (
                <Alert key={index} variant={result.success ? "default" : "destructive"}>
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <XCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>
                      <strong>{result.test}</strong> - {result.timestamp}
                      {result.success ? (
                        <div className="text-sm text-green-600 mt-1">
                          ✅ Exitoso
                          {result.data?.id && <div>ID: {result.data.id}</div>}
                          {result.data?.url && <div>URL: {result.data.url}</div>}
                        </div>
                      ) : (
                        <div className="text-sm text-red-600 mt-1">
                          ❌ Error: {result.error}
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 