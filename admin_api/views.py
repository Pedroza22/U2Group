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
    permission_classes = [AllowAny]

    def get_queryset(self):
        blog_id = self.request.query_params.get('blog')
        visitor_id = self.request.query_params.get('visitor_id')
        
        queryset = BlogLikeFavorite.objects.all()
        
        if blog_id:
            queryset = queryset.filter(blog=blog_id)
        if visitor_id:
            queryset = queryset.filter(visitor_id=visitor_id)
            
        return queryset

    def create(self, request, *args, **kwargs):
        blog_id = request.data.get('blog')
        visitor_id = request.data.get('visitor_id')
        action_type = request.data.get('action_type')  # 'like' o 'favorite'
        
        if not all([blog_id, visitor_id, action_type]):
            return Response(
                {'error': 'Se requiere blog_id, visitor_id y action_type'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Obtener o crear el registro
        like_favorite, created = BlogLikeFavorite.objects.get_or_create(
            blog_id=blog_id,
            visitor_id=visitor_id,
            defaults={'liked': False, 'favorited': False}
        )

        # Actualizar el estado según la acción
        if action_type == 'like':
            like_favorite.liked = not like_favorite.liked
        elif action_type == 'favorite':
            like_favorite.favorited = not like_favorite.favorited

        like_favorite.save()

        # Actualizar los contadores en el blog
        blog = like_favorite.blog
        blog.like_count = BlogLikeFavorite.objects.filter(blog=blog, liked=True).count()
        blog.favorite_count = BlogLikeFavorite.objects.filter(blog=blog, favorited=True).count()
        blog.save()

        # Devolver el nuevo estado
        return Response({
            'id': like_favorite.id,
            'blog': blog_id,
            'visitor_id': visitor_id,
            'liked': like_favorite.liked,
            'favorited': like_favorite.favorited,
            'like_count': blog.like_count,
            'favorite_count': blog.favorite_count
        })
