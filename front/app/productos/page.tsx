'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, getProducts } from '@/lib/api-products';
import { FilterConfig, getFilterConfigs } from '@/lib/api-filters';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from 'next/link';
import MarketplaceNav from '@/components/layout/marketplace-nav';
import Footer from '@/components/layout/footer';

const MarketplacePage = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [filterConfigs, setFilterConfigs] = useState<FilterConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async (currentFilters: Record<string, any>) => {
    setLoading(true);
    try {
      const productData = await getProducts(currentFilters);
      setProducts(productData.results);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const configData = await getFilterConfigs();
        setFilterConfigs(configData);
      } catch (error) {
        console.error('Error fetching filter configs:', error);
      }
    };
    fetchConfigs();
  }, []);

  useEffect(() => {
    const activeFilters = { ...filters };
    // Remove search if it's empty
    if (activeFilters.search === '') {
      delete activeFilters.search;
    }
    loadProducts(activeFilters);
  }, [filters, loadProducts]);

  const handleFilterChange = (newParams: Record<string, any>) => {
    setFilters(prev => ({ ...prev, ...newParams }));
  };
  
  const handleToggleChange = (key: string, value: string) => {
    const newParams = JSON.parse(value);
    // This logic needs to be improved to clear previous related filters
    // For now, it just adds the new one.
    setFilters(prev => ({ ...prev, ...newParams }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange({ search: e.target.value });
  };
  
  const clearFilters = () => {
    setFilters({});
  };

  const renderFilter = (config: FilterConfig) => {
    if (config.key === 'area') {
      return (
        <Select onValueChange={(value) => handleToggleChange(config.key, value)}>
          <SelectTrigger>
            <SelectValue placeholder={config.name} />
          </SelectTrigger>
          <SelectContent>
            {config.options.map((opt, index) => (
              <SelectItem key={index} value={JSON.stringify(opt.params)}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <Accordion type="single" collapsible className="w-full" defaultValue={config.key}>
        <AccordionItem value={config.key} className="border-b-0">
          <AccordionTrigger className="font-semibold">{config.name}</AccordionTrigger>
          <AccordionContent>
            <ToggleGroup
              type="single"
              variant="outline"
              className="grid grid-cols-3 gap-2"
              onValueChange={(value) => {
                if(value) handleToggleChange(config.key, value);
              }}
            >
              {config.options.map((opt, index) => (
                <ToggleGroupItem key={index} value={JSON.stringify(opt.params)} aria-label={opt.label}>
                  {opt.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MarketplaceNav />
      <div className="container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-8 flex-grow">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1 p-4 border rounded-lg h-fit sticky top-24">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Filtros</h2>
            <Button variant="ghost" size="sm" onClick={clearFilters}>Limpiar</Button>
          </div>
          <div className="space-y-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Guardar Búsqueda</Button>
            <Input
              placeholder="Buscar por nombre..."
              onChange={handleSearchChange}
            />
            {filterConfigs.map(renderFilter)}
            <Link href="/contacto" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">Contáctanos</Button>
            </Link>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="md:col-span-3">
          <h1 className="text-4xl font-bold mb-8">Marketplace de Planos</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden"><Skeleton className="h-48 w-full" /><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2" /></CardHeader><CardContent><Skeleton className="h-4 w-full mb-2" /><Skeleton className="h-4 w-2/3" /></CardContent></Card>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push(`/productos/${product.id}`)}>
                  <div className="relative h-48">
                    <Image src={product.main_image} alt={product.name} layout="fill" className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.area_m2}m² / {product.area_sqft}ft²</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-2">{product.bedrooms} hab · {product.bathrooms} baños · {product.garage} garaje</p>
                    <p className="font-semibold text-lg">${Number(product.price).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No se encontraron productos con los filtros seleccionados.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MarketplacePage; 