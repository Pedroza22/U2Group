from rest_framework import serializers
from .models import DesignEntry

class DesignEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DesignEntry
        fields = '__all__'