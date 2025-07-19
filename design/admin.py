from django.contrib import admin
from .models import DesignEntry, Service, Category, GeneralConfig, FilterConfiguration

@admin.register(DesignEntry)
class DesignEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'area_total', 'area_usada', 'precio_total', 'correo', 'created_at')
    readonly_fields = ('created_at',)

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name_es', 'price_min_usd', 'category')
    search_fields = ('name_es', 'name_en', 'category__name')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

@admin.register(GeneralConfig)
class GeneralConfigAdmin(admin.ModelAdmin):
    list_display = ('id', 'key', 'value')
    search_fields = ('key', 'value')

@admin.register(FilterConfiguration)
class FilterConfigurationAdmin(admin.ModelAdmin):
    list_display = ('name', 'key')
    search_fields = ('name', 'key')