from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, BlogViewSet, BlogLikeFavoriteViewSet, MarketplaceProductViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'blog-interactions', BlogLikeFavoriteViewSet)
router.register(r'marketplace', MarketplaceProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 