from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, BlogViewSet, BlogLikeFavoriteViewSet, MarketplaceProductViewSet
from .views import create_stripe_checkout_session, stripe_webhook

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'blog-interactions', BlogLikeFavoriteViewSet)
router.register(r'marketplace-products', MarketplaceProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('stripe/create-checkout-session/', create_stripe_checkout_session, name='create_stripe_checkout_session'),
    path('stripe/webhook/', stripe_webhook, name='stripe_webhook'),
] 