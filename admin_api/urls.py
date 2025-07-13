from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectImageViewSet, BlogViewSet, BlogLikeFavoriteViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'project-images', ProjectImageViewSet, basename='projectimage')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'blog-likes-favorites', BlogLikeFavoriteViewSet, basename='blog-likes-favorites')

urlpatterns = [
    path('', include(router.urls)),
] 