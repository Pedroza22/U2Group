from django.contrib import admin
from .models import DesignEntry

@admin.register(DesignEntry)
class DesignEntryAdmin(admin.ModelAdmin):
    list_display = ('id', 'area_total', 'area_usada', 'precio_total', 'correo', 'created_at')
    readonly_fields = ('created_at',)