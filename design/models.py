from django.db import models
from django.contrib.postgres.fields import JSONField

class DesignEntry(models.Model):
    area_total = models.FloatField(help_text="Área total del terreno en m²")
    area_basica = models.FloatField(help_text="Área reservada para espacios básicos (50%)")
    area_disponible = models.FloatField(help_text="Área restante para opciones")
    area_usada = models.FloatField(default=0.0)
    porcentaje_ocupado = models.FloatField(default=0.0)
    opciones = JSONField(help_text="Opciones seleccionadas con su área y precio")
    precio_total = models.FloatField()
    correo = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Diseño #{self.id} - {self.area_total} m² - ${self.precio_total}'