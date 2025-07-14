from django.core.management.base import BaseCommand
from design.models import Category, Service, GeneralConfig

class Command(BaseCommand):
    help = 'Carga datos iniciales de categorías, servicios y configuración general para diseño.'

    def handle(self, *args, **options):
        # Categorías
        categories = [
            (1, 'Espacios básicos', '🛏️'),
            (2, 'Funcionalidad del hogar', '🏡'),
            (3, 'Trabajo & Creatividad', '🎯'),
            (4, 'Bienestar & Salud', '🧠'),
            (5, 'Naturaleza & Sustentabilidad', '🌿'),
            (6, 'Entretenimiento & Social', '🎬'),
        ]
        for cid, name, emoji in categories:
            Category.objects.update_or_create(id=cid, defaults={"name": name, "emoji": emoji})

        # Configuración general
        configs = [
            ("metro_cuadrado_suma", "2"),
            ("metro_cuadrado_precio", "1"),
            ("metro_cuadrado_area_min", "80"),
            ("metro_cuadrado_area_max", "1000"),
            ("porcentaje_muros", "25"),
            ("porcentaje_cocina", "12"),
            ("porcentaje_sala", "13"),
            ("porcentaje_ajuste", "-50"),
        ]
        for key, value in configs:
            GeneralConfig.objects.update_or_create(key=key, defaults={"value": value})

        # Servicios / Espacios
        services = [
            # (category_id, name_en, name_es, price_min_usd, area_max_m2, max_units)
            # 🛏️ Espacios básicos
            (1, 'Large room', 'Habitación grande', 70, 18, 5),
            (1, 'Medium room', 'Habitación mediana', 60, 14, None),
            (1, 'Small room', 'Habitación pequeña', 50, 10, None),
            (1, 'Large full bathroom', 'Baño completo grande', 20, 16, 5),
            (1, 'Medium full bathroom', 'Baño completo mediano', 15, 14, None),
            (1, 'Small full bathroom', 'Baño completo pequeño', 10, 6, None),
            (1, 'Large social bathroom (half bath)', 'Baño social (medio baño) grande', 10, 6, 3),
            (1, 'Small social bathroom (half bath)', 'Baño social (medio baño) pequeño', 5, 2, None),
            (1, 'Floor', 'Pisos', 300, None, 2),
            (1, 'Attic', 'Atico', 200, None, None),
            (1, 'Basement', 'Sotano', 200, None, None),
            (1, 'Parking', 'Parqueadero', 40, 14, 5),
            (1, 'Laundry and storage room', 'Cuarto de lavado y almacenamiento', 40, 8, 2),
            # 🏡 Funcionalidad del hogar
            (2, 'Multifunctional garage', 'Garage multifuncional', 70, 40, None),
            (2, 'Walking closet / vestidor inteligente', 'Walking closet / vestidor inteligente', 30, 10, None),
            (2, 'Accessible room for the elderly', 'Cuarto accesible adulto mayor', 70, 14, None),
            (2, 'Space for pets', 'Espacio para mascotas', 30, 6, None),
            # 🎯 Trabajo & Creatividad
            (3, 'Personal office or hybrid coworking', 'Oficina personal o coworking híbrido', 150, 16, None),
            (3, 'Executive or board room', 'Sala ejecutiva o de juntas', 150, 20, None),
            (3, 'Recording studio / podcast', 'Estudio de grabación / podcast', 100, 16, None),
            (3, 'Creative craft workshop', 'Taller creativo artesanal', 90, 18, None),
            (3, 'Mini warehouse / e-commerce logistics', 'Mini bodega / logística e-commerce', 40, 10, None),
            (3, 'Convertible flexible space', 'Espacio flexible convertible', 70, 12, None),
            # 🧠 Bienestar & Salud
            (4, 'Home gym', 'Gimnasio en casa', 200, 20, None),
            (4, 'Sauna or steam bath', 'Sauna o baño de vapor', 60, 6, None),
            (4, 'Meditation / yoga / mindfulness', 'Meditación / yoga / mindfulness', 60, 10, None),
            (4, 'Library or reading room', 'Biblioteca o sala de lectura', 40, 14, None),
            (4, 'Sensory / therapeutic room', 'Cuarto sensorial / terapéutico', 60, 14, None),
            # 🌿 Naturaleza & Sustentabilidad
            (5, 'Indoor garden / green wall', 'Jardín interior / muro verde', 60, None, None),
            (5, 'Green roof or living terrace', 'Azotea verde o terraza viva', 100, None, None),
            (5, 'Urban vegetable garden (outdoor/indoor)', 'Huerta urbana (exterior/interior)', 90, None, None),
            (5, 'Rainwater harvesting system', 'Sistema de recolección de agua lluvia', 100, None, None),
            (5, 'Outdoor multifunctional space (gardening)', 'Espacio multifuncional exterior (jardineria)', None, None, None),
            (5, 'Composting', 'Compostaje', 80, 12, None),
            (5, 'Drying', 'Secado', 80, 12, None),
            (5, 'Greenhouse', 'Invernadero', 100, 12, None),
            (5, 'Solar panels + backup', 'Paneles solares + backup', 200, None, None),
            # 🎬 Entretenimiento & Social
            (6, 'Game room / indoor cinema', 'Sala de juegos / cine interior', 150, 20, None),
            (6, 'Integrated bar or cellar', 'Bar o cava integrada', 90, 8, None),
            (6, 'BBQ + outdoor kitchen + covered dining room', 'BBQ + cocina exterior + comedor techado', 200, 26, None),
            (6, 'Firepit + chill zone', 'Firepit + zona chill', 80, 12, None),
            (6, 'Social rooftop with veranda', 'Rooftop social con mirador', 110, None, None),
            (6, 'Projector or outdoor cinema', 'Proyector o cine al aire libre', 40, 18, None),
            (6, 'Outdoor playground', 'Zona de juegos infantiles exterior', 50, 20, None),
            (6, 'Swimming pool', 'Piscina', 250, 18, None),
        ]
        for cat_id, name_en, name_es, price, area_max, max_units in services:
            Service.objects.update_or_create(
                category_id=cat_id,
                name_en=name_en,
                defaults={
                    "name_es": name_es,
                    "price_min_usd": price,
                    "area_max_m2": area_max,
                    "max_units": max_units,
                }
            )
        self.stdout.write(self.style.SUCCESS('Datos iniciales cargados correctamente.')) 