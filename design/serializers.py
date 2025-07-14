from rest_framework import serializers
from .models import DesignEntry
from .models import Service

class DesignEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignEntry
        fields = '__all__'

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'