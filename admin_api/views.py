from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, ProjectImage, Blog, BlogLikeFavorite
from .serializers import ProjectSerializer, ProjectImageSerializer, BlogSerializer, BlogLikeFavoriteSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-id')
    serializer_class = ProjectSerializer
    parser_classes = (MultiPartParser, FormParser)

class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    parser_classes = (MultiPartParser, FormParser)

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-date')
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)

    @method_decorator(csrf_exempt, name='dispatch')
    @action(detail=True, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def like(self, request, pk=None):
        print(f"[LIKE] Petición recibida para blog id={pk}, método={request.method}, user={request.user}, data={request.data}")
        blog = self.get_object()
        blog.like_count += 1
        blog.save()
        print(f"[LIKE] Nuevo contador: {blog.like_count}")
        return Response({'like_count': blog.like_count})

    @method_decorator(csrf_exempt, name='dispatch')
    @action(detail=True, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def favorite(self, request, pk=None):
        print(f"[FAVORITE] Petición recibida para blog id={pk}, método={request.method}, user={request.user}, data={request.data}")
        blog = self.get_object()
        blog.favorite_count += 1
        blog.save()
        print(f"[FAVORITE] Nuevo contador: {blog.favorite_count}")
        return Response({'favorite_count': blog.favorite_count})

class BlogLikeFavoriteViewSet(viewsets.ModelViewSet):
    queryset = BlogLikeFavorite.objects.all()
    serializer_class = BlogLikeFavoriteSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        if self.request.method == 'GET':
            # Permitir filtrar por blog para el contador global
            blog_id = self.request.query_params.get('blog')
            if blog_id:
                return BlogLikeFavorite.objects.filter(blog=blog_id)
            return BlogLikeFavorite.objects.all()
        return BlogLikeFavorite.objects.filter(user=self.request.user)
