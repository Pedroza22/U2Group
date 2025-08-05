# home/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CalculatorEntryViewSet, ProjectViewSet,
    ProductViewSet, ProductImageViewSet,
    CustomTokenObtainPairView, register_user, OrderViewSet,
    password_reset_request, get_user_data, update_user_data,
    get_user_orders, create_payment_intent, confirm_payment,
    stripe_webhook, stripe_config, create_payment_method_view,
    create_customer_view, create_checkout_session_view, refund_payment_view,
    test_stripe_connection_view, test_payment_method_view
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
    # Stripe endpoints
    path('stripe/create-payment-intent/', create_payment_intent, name='create_payment_intent'),
    path('stripe/confirm-payment/', confirm_payment, name='confirm_payment'),
    path('stripe/webhook/', stripe_webhook, name='stripe_webhook'),
    path('stripe/config/', stripe_config, name='stripe_config'),
    path('stripe/create-payment-method/', create_payment_method_view, name='create_payment_method'),
    path('stripe/create-customer/', create_customer_view, name='create_customer'),
    path('stripe/create-checkout-session/', create_checkout_session_view, name='create_checkout_session'),
    path('stripe/refund-payment/', refund_payment_view, name='refund_payment'),
    # Stripe test endpoints
    path('stripe/test-connection/', test_stripe_connection_view, name='test_stripe_connection'),
    path('stripe/test-payment-method/', test_payment_method_view, name='test_payment_method'),
]