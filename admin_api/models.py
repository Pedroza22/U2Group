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
    area_ft2 = models.DecimalField(max_digits=8, decimal_places=2, validators=[MinValueValidator(0)], null=True, blank=True)
    rooms = models.PositiveIntegerField(default=1)
    bathrooms = models.PositiveIntegerField(default=1)
    floors = models.PositiveIntegerField(default=1)
    image = models.ImageField(upload_to='marketplace/products/', null=True, blank=True)
    features = models.JSONField(default=list)  # Lista de características especiales
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    # Campos adicionales para la vista de detalle
    width = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Ancho en pies
    depth = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Profundidad en pies
    max_ridge_height = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Altura máxima
    garage_type = models.CharField(max_length=50, default='Attached')  # Tipo de garaje
    garage_area = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Área del garaje
    garage_cars = models.PositiveIntegerField(default=2)  # Número de carros en garaje
    garage_entry = models.CharField(max_length=50, default='Front')  # Entrada del garaje
    ceiling_height_lower = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Altura techo nivel inferior
    ceiling_height_first = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Altura techo primer nivel
    foundation_type = models.CharField(max_length=50, default='Walkout')  # Tipo de fundación
    porch_front_area = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Área porche frontal
    porch_rear_area = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Área porche trasero
    optional_lower_level = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)  # Nivel inferior opcional
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']

class Order(models.Model):
    stripe_session_id = models.CharField(max_length=255, unique=True)
    email = models.EmailField(blank=True, null=True)
    amount_total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='pending')
    raw_data = models.JSONField(default=dict)

    def __str__(self):
        return f"Order {self.stripe_session_id} - {self.amount_total}"
