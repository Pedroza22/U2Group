from rest_framework import serializers
from .models import Blog, Project

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
class PriceCalculatorSerializer(serializers.Serializer):
    num_pages = serializers.IntegerField(min_value=1)
    design_level = serializers.ChoiceField(choices=['básico', 'intermedio', 'avanzado'])
    has_multilanguage = serializers.BooleanField()