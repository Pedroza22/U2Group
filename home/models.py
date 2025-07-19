from django.db import models
from django.contrib.auth.models import User as DjangoUser
from django.conf import settings

class User(DjangoUser):
    """
    Modelo proxy para extender el usuario de Django sin modificar la tabla
    """
    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        # Asegurarse de que el email sea único
        if self.email and User.objects.filter(email=self.email).exclude(id=self.id).exists():
            raise ValueError('Este email ya está registrado')
        super().save(*args, **kwargs)

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    accepted_policies = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user.username}"

class CalculatorEntry(models.Model):
    area_m2 = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.area_m2} m² - ${self.price}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    image = models.ImageField(upload_to="projects/")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    STYLE_CHOICES = [
        ('modern', 'Moderno'),
        ('contemporary', 'Contemporáneo'),
        ('traditional', 'Tradicional'),
        ('minimalist', 'Minimalista'),
        ('colonial', 'Colonial'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    area_m2 = models.PositiveIntegerField()
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1)
    garage = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    architectural_style = models.CharField(max_length=20, choices=STYLE_CHOICES)
    main_image = models.ImageField(upload_to='products/main_images/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    @property
    def area_sqft(self):
        return round(self.area_m2 * 10.764, 2)

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/gallery/')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Image {self.order} of {self.product.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('completed', 'Completado'),
        ('cancelled', 'Cancelado'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order {self.id} by {self.user.username}'

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT) # Evita borrar productos si están en una orden
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.product.name} ({self.quantity})'
