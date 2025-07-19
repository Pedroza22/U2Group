"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  Heart,
  User,
  LogOut,
  Settings,
  Menu,
  X,
  LayoutGrid,
  ChevronDown,
  Building,
  Image as ImageIcon
} from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export default function MarketplaceNav() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/productos')}>
              <ImageIcon className="mr-2 h-5 w-5" />
              Plan Images
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hidden md:flex" onClick={() => router.push('/productos')}>
              <Building className="mr-2 h-5 w-5" />
              Floor Plans
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hidden md:flex">
                  Trending
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Más Populares</DropdownMenuItem>
                <DropdownMenuItem>Nuevos Lanzamientos</DropdownMenuItem>
                <DropdownMenuItem>Ofertas</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-6 w-6 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Hola, {user.first_name || user.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile/orders')}>
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" onClick={() => router.push('/login')}>Login</Button>
            )}

            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push('/profile/favorites')}>
              <Heart className="h-6 w-6 text-gray-600" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => router.push('/cart')}>
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-blue-600 text-white text-xs text-center">
                  {cartCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
            <div className="md:hidden py-4">
                <nav className="flex flex-col space-y-2">
                    <Button variant="ghost" className="justify-start" onClick={() => {router.push('/productos'); setIsMenuOpen(false);}}>Floor Plans</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="justify-start">Trending <ChevronDown className="ml-auto h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Más Populares</DropdownMenuItem>
                        <DropdownMenuItem>Nuevos Lanzamientos</DropdownMenuItem>
                        <DropdownMenuItem>Ofertas</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </nav>
            </div>
        )}

      </div>
    </nav>
  );
} 