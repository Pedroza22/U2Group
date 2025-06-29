from rest_framework import viewsets
from .models import Blog, Project
from .serializer import BlogSerializer, ProjectSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Blog.objects.all().order_by('-date')
        serializer_class = BlogSerializer
@action(detail=False)
def featured(self, request):
        blogs = self.queryset.filter(featured=True)[:4]
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Project.objects.all()
        serializer_class = ProjectSerializer
