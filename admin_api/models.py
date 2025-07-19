from django.db import models
import uuid
from django.core.validators import MinValueValidator

def generate_default_visitor_id():
    return f'legacy_{uuid.uuid4().hex[:8]}'

# Create your models here.

class Project(models.Model):
    name = models.CharField(max_length=255)
    display_title = models.CharField(max_length=255, blank=True, null=True)
    color = models.CharField(max_length=20)
    image = models.ImageField(upload_to='projects/main_images/')
    utilization = models.CharField(max_length=255)
    services = models.CharField(max_length=255)
    year = models.CharField(max_length=10)
    category = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    size = models.CharField(max_length=50)
    location = models.CharField(max_length=255)
    status = models.CharField(max_length=50)
    featured = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    features = models.JSONField(blank=True, null=True)  # lista de strings

    def __str__(self):
        return self.name

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/extra_images/')

    def __str__(self):
        return f"Imagen de {self.project.name}"

class Blog(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    date = models.DateField()
    category = models.CharField(max_length=100)
    read_time = models.CharField(max_length=50)
    image = models.ImageField(upload_to='blogs/main_images/')
    summary = models.TextField()
    content = models.TextField()
    tags = models.JSONField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    like_count = models.PositiveIntegerField(default=0)
    favorite_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class BlogLikeFavorite(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, related_name='likes_favorites')
    visitor_id = models.CharField(max_length=100, default=generate_default_visitor_id)  # Identificador único del visitante
    liked = models.BooleanField(default=False)
    favorited = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['blog']),
            models.Index(fields=['visitor_id']),
        ]
        unique_together = ('blog', 'visitor_id')  # Un visitante solo puede tener un registro por blog

class MarketplaceProduct(models.Model):
    CATEGORY_CHOICES = [
        ('residential', 'Residencial'),
        ('commercial', 'Comercial'),
        ('industrial', 'Industrial'),
        ('specialized', 'Especializado'),
    ]

    STYLE_CHOICES = [
        ('modern', 'Moderno'),
        ('contemporary', 'Contemporáneo'),
        ('traditional', 'Tradicional'),
        ('minimalist', 'Minimalista'),
        ('industrial', 'Industrial'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    style = models.CharField(max_length=50, choices=STYLE_CHOICES)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    area_m2 = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)])
    rooms = models.PositiveIntegerField(default=1)
    bathrooms = models.PositiveIntegerField(default=1)
    floors = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='marketplace/products/', null=True, blank=True)
    features = models.JSONField(default=list)  # Lista de características especiales
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']
