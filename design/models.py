from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    emoji = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return f"{self.emoji or ''} {self.name}"

class Service(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="services")
    name_en = models.CharField(max_length=255)
    name_es = models.CharField(max_length=255)
    price_min_usd = models.FloatField(null=True, blank=True)
    area_max_m2 = models.FloatField(blank=True, null=True)
    max_units = models.IntegerField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="services/", blank=True, null=True)

    def __str__(self):
        return f"{self.name_es} / {self.name_en}"

class GeneralConfig(models.Model):
    key = models.CharField(max_length=255, unique=True, db_index=True)
    value = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.key}: {self.value}"

class FilterConfiguration(models.Model):
    name = models.CharField(max_length=100, help_text="Nombre del filtro, ej: Habitaciones")
    key = models.CharField(max_length=50, unique=True, help_text="Clave para la API, ej: bedrooms")
    options = models.JSONField(
        default=list,
        help_text='Opciones en formato JSON. Ej: [{"label": "1", "params": {"bedrooms": 1}}, {"label": "3+", "params": {"bedrooms__gte": 3}}]',
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Configuración de Filtro"
        verbose_name_plural = "Configuraciones de Filtros"

class DesignEntry(models.Model):
    area_total = models.FloatField(help_text="Área total del terreno en m²")
    area_basica = models.FloatField(help_text="Área reservada para espacios básicos (50%)")
    area_disponible = models.FloatField(help_text="Área restante para opciones")
    area_usada = models.FloatField(default=0.0)
    porcentaje_ocupado = models.FloatField(default=0.0)
    opciones = models.JSONField(help_text="Opciones seleccionadas con su área y precio")
    precio_total = models.FloatField()
    correo = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Diseño #{self.id} - {self.area_total} m² - ${self.precio_total}'