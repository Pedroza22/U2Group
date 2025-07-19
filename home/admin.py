from django.contrib import admin
from .models import UserProfile, CalculatorEntry, Project, Product, ProductImage

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'accepted_policies', 'created_at')
    list_filter = ('accepted_policies',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'area_m2', 'bedrooms', 'bathrooms', 'garage', 'price', 'architectural_style')
    list_filter = ('architectural_style', 'bedrooms', 'bathrooms', 'garage')
    search_fields = ('name', 'description')

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(CalculatorEntry)
class CalculatorEntryAdmin(admin.ModelAdmin):
    list_display = ('area_m2', 'price', 'created_at')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
