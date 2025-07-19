# home/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CalculatorEntryViewSet, ProjectViewSet,
    ProductViewSet, ProductImageViewSet,
    CustomTokenObtainPairView, register_user, OrderViewSet,
    password_reset_request, get_user_data, update_user_data,
    get_user_orders
)

router = DefaultRouter()
router.register(r'calculator-entries', CalculatorEntryViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'products', ProductViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'orders', OrderViewSet, basename='order')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/password/reset/', password_reset_request, name='password_reset'),
    path('auth/user/', get_user_data, name='get_user_data'),
    path('auth/user/update/', update_user_data, name='update_user_data'),
    path('auth/user/orders/', get_user_orders, name='get_user_orders'),
]