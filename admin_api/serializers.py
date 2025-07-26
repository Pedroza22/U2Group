from rest_framework import serializers
from .models import Project, ProjectImage, Blog, BlogLikeFavorite, MarketplaceProduct

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'project']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'display_title', 'color', 'image', 'utilization', 'services', 'year',
            'category', 'type', 'size', 'location', 'status', 'featured', 'description', 'features', 'images'
        ]

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'author', 'date', 'category', 'read_time', 'image', 'summary', 'content', 'tags', 'featured', 'like_count', 'favorite_count'
        ]

class BlogLikeFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogLikeFavorite
        fields = ['id', 'blog', 'visitor_id', 'liked', 'favorited']

class MarketplaceProductSerializer(serializers.ModelSerializer):
    # Campos opcionales para evitar errores si no existen en la BD
    price_pdf_m2 = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=1000)
    price_pdf_sqft = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=1000)
    price_editable_m2 = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=1500)
    price_editable_sqft = serializers.DecimalField(max_digits=10, decimal_places=2, required=False, default=1500)
    included_items = serializers.JSONField(required=False, default=list)
    not_included_items = serializers.JSONField(required=False, default=list)
    
    # Nuevos campos
    area_sqft = serializers.DecimalField(max_digits=8, decimal_places=2, required=False, default=0)
    area_unit = serializers.ChoiceField(choices=[('sqft', 'Square Feet'), ('m2', 'Square Meters')], required=False, default='sqft')
    garage_spaces = serializers.IntegerField(required=False, default=2)
    main_level_images = serializers.JSONField(required=False, default=list)
    
    class Meta:
        model = MarketplaceProduct
        fields = [
            'id', 'name', 'description', 'category', 'style', 'price', 'area_m2', 
            'rooms', 'bathrooms', 'floors', 'image', 'features', 'is_featured', 
            'is_active', 'created_at', 'updated_at',
            'price_pdf_m2', 'price_pdf_sqft', 'price_editable_m2', 'price_editable_sqft',
            'included_items', 'not_included_items',
            'area_sqft', 'area_unit', 'garage_spaces', 'main_level_images'
        ]
        read_only_fields = ('created_at', 'updated_at') 