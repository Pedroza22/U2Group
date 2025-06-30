from django.db import models

class CalculatorEntry(models.Model):
    area_m2 = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)