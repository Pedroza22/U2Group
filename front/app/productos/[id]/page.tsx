'use client';

import { useEffect, useState } from 'react';
import { Product, getProduct } from '@/lib/api-products';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(parseInt(params.id));
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
      router.push('/productos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-96 w-full mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-white/30">
        <CardHeader>
          <CardTitle className="text-3xl">{product.name}</CardTitle>
          <CardDescription>
            {product.architectural_style} · {product.area_m2}m² / {product.area_sqft}ft²
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Main Image and Gallery */}
          <div className="mb-8">
            <div className="relative h-96 mb-4">
              <Image
                src={product.main_image}
                alt={product.name}
                fill
                className="object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedImage(product.main_image)}
              />
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((image) => (
                  <CarouselItem key={image.id} className="basis-1/4">
                    <div className="relative h-24">
                      <Image
                        src={image.image}
                        alt={`Gallery image ${image.order}`}
                        fill
                        className="object-cover rounded cursor-pointer"
                        onClick={() => setSelectedImage(image.image)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Características</h3>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Habitaciones:</span> {product.bedrooms}
                </li>
                <li>
                  <span className="font-medium">Baños:</span> {product.bathrooms}
                </li>
                <li>
                  <span className="font-medium">Garaje:</span> {product.garage}
                </li>
                <li>
                  <span className="font-medium">Estilo:</span> {product.architectural_style}
                </li>
                <li>
                  <span className="font-medium">Área:</span> {product.area_m2}m² / {product.area_sqft}ft²
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Descripción</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-8">
                <p className="text-2xl font-bold mb-4">${product.price.toLocaleString()}</p>
                <Button className="w-full">Contactar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl">
          <div className="relative h-[80vh]">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Full size image"
                fill
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 