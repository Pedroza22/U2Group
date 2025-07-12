from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ProjectImageViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'project-images', ProjectImageViewSet, basename='projectimage')

urlpatterns = [
    path('', include(router.urls)),
] 