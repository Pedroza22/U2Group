"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { getOrders } from '@/lib/api-orders';
import { useRouter } from 'next/navigation';
import MarketplaceNav from '@/components/layout/marketplace-nav';
import Footer from '@/components/layout/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Define types for better readability
interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: string;
  };
  quantity: number;
}

interface Order {
  id: number;
  created_at: string;
  total_amount: string;
  order_items: OrderItem[];
}

export default function OrdersPage() {
  const { user, token, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      return; // Wait for auth state to be determined
    }
    if (!user || !token) {
      router.push('/login');
    } else {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const fetchedOrders = await getOrders(token);
          setOrders(fetchedOrders);
          setError(null);
        } catch (err) {
          setError('No se pudieron cargar las órdenes. Inténtalo de nuevo más tarde.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user, token, router, authLoading]);

  const renderSkeleton = () => (
    <div className="space-y-6">
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-48 w-full rounded-lg" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketplaceNav />
      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Órdenes</h1>
        {loading || authLoading ? (
          renderSkeleton()
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No has realizado ninguna orden todavía.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Orden #{order.id}</CardTitle>
                  <Badge variant="secondary">{new Date(order.created_at).toLocaleDateString()}</Badge>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y divide-gray-200">
                    {order.order_items.map((item) => (
                      <li key={item.id} className="py-3 flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-gray-800">${Number(item.product.price).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t mt-4 pt-4 flex justify-end">
                    <p className="text-lg font-bold">Total: ${Number(order.total_amount).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
} 