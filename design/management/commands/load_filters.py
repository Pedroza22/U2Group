from django.core.management.base import BaseCommand
from design.models import FilterConfiguration
from home.models import Product

class Command(BaseCommand):
    help = 'Load initial filter configurations for the marketplace'

    def handle(self, *args, **kwargs):
        # Clear existing configs to avoid duplicates
        if FilterConfiguration.objects.exists():
            self.stdout.write(self.style.WARNING('Clearing existing filter configurations...'))
            FilterConfiguration.objects.all().delete()

        # Architectural Styles from model choices
        style_options = [
            {"label": style[1], "params": {"architectural_style": style[0]}}
            for style in Product.STYLE_CHOICES
        ]

        filters_data = [
            {
                "name": "Habitaciones", "key": "bedrooms",
                "options": [
                    {"label": "1", "params": {"bedrooms": 1}},
                    {"label": "2", "params": {"bedrooms": 2}},
                    {"label": "3+", "params": {"bedrooms__gte": 3}}
                ]
            },
            {
                "name": "Baños", "key": "bathrooms",
                "options": [
                    {"label": "1", "params": {"bathrooms": 1}},
                    {"label": "1.5", "params": {"bathrooms": 1.5}},
                    {"label": "2.5", "params": {"bathrooms": 2.5}},
                    {"label": "4+", "params": {"bathrooms__gte": 4}}
                ]
            },
            {
                "name": "Garaje (Vehículos)", "key": "garage",
                "options": [
                    {"label": "1", "params": {"garage": 1}},
                    {"label": "2", "params": {"garage": 2}},
                    {"label": "3+", "params": {"garage__gte": 3}}
                ]
            },
            {
                "name": "Área (m²)", "key": "area",
                "options": [
                    {"label": "100+", "params": {"area_m2__gte": 100}},
                    {"label": "200+", "params": {"area_m2__gte": 200}},
                    {"label": "300+", "params": {"area_m2__gte": 300}}
                ]
            },
            {
                "name": "Precio (USD)", "key": "price",
                "options": [
                    {"label": "< $200k", "params": {"price__lte": 200000}},
                    {"label": "$200k - $400k", "params": {"price__gte": 200000, "price__lte": 400000}},
                    {"label": "> $400k", "params": {"price__gte": 400000}}
                ]
            },
            {
                "name": "Estilo Arquitectónico", "key": "architectural_style",
                "options": style_options
            }
        ]

        for data in filters_data:
            FilterConfiguration.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Successfully loaded all initial filter configurations.')) 