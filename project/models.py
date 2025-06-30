from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='projects/', null=True, blank=True)
    color = models.CharField(max_length=7, default="#4F46E5")

    def __str__(self):
        return self.name