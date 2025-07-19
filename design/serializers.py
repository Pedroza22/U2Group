from rest_framework import serializers
from .models import DesignEntry, Service, Category, GeneralConfig, FilterConfiguration

class FilterConfigurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilterConfiguration
        fields = ('name', 'key', 'options')

class DesignEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignEntry
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'