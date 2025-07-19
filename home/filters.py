import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    bedrooms = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='exact')
    bedrooms__gte = django_filters.NumberFilter(field_name='bedrooms', lookup_expr='gte')

    bathrooms = django_filters.NumberFilter(field_name='bathrooms', lookup_expr='exact')
    bathrooms__gte = django_filters.NumberFilter(field_name='bathrooms', lookup_expr='gte')

    area_m2__gte = django_filters.NumberFilter(field_name='area_m2', lookup_expr='gte')
    
    price__gte = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = django_filters.NumberFilter(field_name='price', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['architectural_style', 'garage', 'bedrooms', 'bathrooms', 'price'] 