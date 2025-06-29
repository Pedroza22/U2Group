from django.urls import path, include
from rest_framework import routers
from drf_spectacular.views import SpectacularSwaggerView

from home.views import BlogViewSet, ProjectViewSet

router = routers.DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blogs')
router.register(r'projects', ProjectViewSet, basename='projects')

urlpatterns = [
    path('home/', include(router.urls)),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]