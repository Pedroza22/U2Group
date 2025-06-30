# home/urls.py
from django.urls import path
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from home.views import save_calculator_entry

urlpatterns = [
    path('calculator/', save_calculator_entry, name='price-calc'),  # POST desde el frontend
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]