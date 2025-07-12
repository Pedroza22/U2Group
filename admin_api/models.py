from django.db import models

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
