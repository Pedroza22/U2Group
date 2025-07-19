"use client";

import MarketplaceNav from '@/components/layout/marketplace-nav';
import Footer from '@/components/layout/footer';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNav />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p>Aquí irán las opciones de configuración del perfil de usuario.</p>
            {/* Próximamente: cambio de contraseña, datos personales, etc. */}
        </div>
      </main>
      <Footer />
    </div>
  );
} 