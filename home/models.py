from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    image = models.URLField(blank=True, null=True)
    date = models.DateField()
    read_time = models.CharField(max_length=50)
    featured = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Project(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    
    from django.db import models

class PriceEstimate(models.Model):
    pages = models.IntegerField()
    customization_level = models.CharField(max_length=50)  # low, medium, high
    monthly_support = models.BooleanField(default=False)
    extras = models.JSONField(default=list)
    total_price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
