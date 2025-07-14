from rest_framework import serializers
from .models import Project, ProjectImage, Blog, BlogLikeFavorite

class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'project']

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'display_title', 'color', 'image', 'utilization', 'services', 'year',
            'category', 'type', 'size', 'location', 'status', 'featured', 'description', 'features', 'images'
        ]

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'author', 'date', 'category', 'read_time', 'image', 'summary', 'content', 'tags', 'featured', 'like_count', 'favorite_count'
        ]

class BlogLikeFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogLikeFavorite
        fields = ['id', 'blog', 'visitor_id', 'liked', 'favorited'] 