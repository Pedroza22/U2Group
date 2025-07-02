from django.contrib import admin
from .models import CalculatorEntry, Project

@admin.register(CalculatorEntry)
class CalculatorEntry(admin.ModelAdmin):
    list_display = ('area_m2', 'price', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('area_m2',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'latitude', 'longitude', 'created_at')
    search_fields = ('title',)
    list_filter = ('created_at',)
