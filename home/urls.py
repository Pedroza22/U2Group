from django.urls import path, include
from rest_framework import routers
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView

from home.views import BlogViewSet, PriceCalculatorView, ProjectViewSet

router = routers.DefaultRouter()
router.register(r'blogs', BlogViewSet, basename='blogs')
router.register(r'projects', ProjectViewSet, basename='projects')

urlpatterns = [
    path('home/', include(router.urls)),

    # Ruta para el esquema (JSON del API)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),

    # Swagger UI con base en el esquema anterior
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    path('home/price-calc/', PriceCalculatorView.as_view(), name='price-calc'),
]