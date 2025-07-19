from django.core.management.base import BaseCommand
from home.models import Product, ProductImage
from django.core.files import File
from pathlib import Path
import os

class Command(BaseCommand):
    help = 'Load initial product data'

    def handle(self, *args, **kwargs):
        if Product.objects.exists():
            self.stdout.write('Products already exist. Skipping...')
            return

        # Create sample products
        products_data = [
            {
                'name': 'Casa Moderna Vista al Mar',
                'description': 'Hermosa casa moderna con vista al mar, amplios espacios y acabados de lujo.',
                'area_m2': 250,
                'bedrooms': 4,
                'bathrooms': 3,
                'garage': 2,
                'price': 450000,
                'architectural_style': 'modern',
            },
            {
                'name': 'Villa Minimalista',
                'description': 'Villa minimalista con diseño contemporáneo, perfecta para amantes del diseño moderno.',
                'area_m2': 180,
                'bedrooms': 3,
                'bathrooms': 2,
                'garage': 1,
                'price': 320000,
                'architectural_style': 'minimalist',
            },
            {
                'name': 'Residencia Colonial',
                'description': 'Elegante residencia de estilo colonial con amplios jardines y detalles clásicos.',
                'area_m2': 320,
                'bedrooms': 5,
                'bathrooms': 4,
                'garage': 2,
                'price': 580000,
                'architectural_style': 'colonial',
            },
        ]

        for data in products_data:
            product = Product.objects.create(**data)
            
            # Use placeholder image for main_image
            placeholder_path = Path(__file__).resolve().parent.parent.parent.parent / 'front' / 'public' / 'placeholder.jpg'
            if placeholder_path.exists():
                with open(placeholder_path, 'rb') as f:
                    product.main_image.save('main_image.jpg', File(f), save=True)
                    
                    # Create some gallery images
                    for i in range(3):
                        image = ProductImage.objects.create(
                            product=product,
                            order=i
                        )
                        image.image.save(f'gallery_{i}.jpg', File(f), save=True)

        self.stdout.write(self.style.SUCCESS('Successfully loaded initial product data')) 