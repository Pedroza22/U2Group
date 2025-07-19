from rest_framework import serializers
from django.contrib.auth.models import User as DjangoUser
from .models import (
    CalculatorEntry, Project, Product, ProductImage, 
    UserProfile, Order, OrderItem, User
)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('accepted_policies',)

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(required=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'profile')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        
        # Crear el usuario usando el modelo proxy
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=password
        )
        
        # Crear el perfil del usuario
        UserProfile.objects.create(
            user=user,
            accepted_policies=profile_data.get('accepted_policies', False)
        )
        
        return user

class CalculatorEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CalculatorEntry
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'order']

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    area_sqft = serializers.FloatField(read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'area_m2', 'area_sqft',
            'bedrooms', 'bathrooms', 'garage', 'price',
            'architectural_style', 'main_image', 'images',
            'created_at', 'updated_at'
        ]

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_image = serializers.CharField(source='product.main_image.url', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'product_image', 'price', 'quantity')
        read_only_fields = ('product_name', 'product_image')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField()
    status = serializers.SerializerMethodField()
    
    class Meta:
        model = Order
        fields = ('id', 'user', 'created_at', 'total_price', 'items', 'status')

    def get_status(self, obj):
        # Por ahora retornamos un estado fijo, pero aquí podrías implementar la lógica real
        return 'completed'