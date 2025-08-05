'use client';

import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';
import { FavoritesProvider } from '@/context/favorites-context';

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
} 