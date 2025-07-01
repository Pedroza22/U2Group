from rest_framework import serializers
from .models import CalculatorEntry

class CalculatorEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculatorEntry
        fields = ['id', 'area_m2', 'price', 'created_at']  # Asegúrate de incluir los campos correctos