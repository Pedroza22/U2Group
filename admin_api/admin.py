from django.contrib import admin
from .models import Project, ProjectImage, Blog

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline]
    list_display = ("name", "category", "year", "featured")
    search_fields = ("name", "category", "year")
    list_filter = ("category", "featured", "year")

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)
admin.site.register(Blog)
