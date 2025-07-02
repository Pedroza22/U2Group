from rest_framework import serializers
from .models import CalculatorEntry, Project

class CalculatorEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculatorEntry
        fields = ['id', 'area_m2', 'price', 'created_at']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'latitude', 'longitude', 'created_at']