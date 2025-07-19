from django.urls import path
from .views import (
    DesignEntryView, CategoryListView, ServiceListView,
    GeneralConfigListView, ServiceDetailView, MarketplaceView,
    FilterConfigurationListView
)

urlpatterns = [
    path('marketplace/', MarketplaceView.as_view(), name='marketplace'),
    path('marketplace/filters/', FilterConfigurationListView.as_view(), name='marketplace-filters'),
    path('diseno/', DesignEntryView.as_view(), name='crear-diseno'),
    path('categorias/', CategoryListView.as_view(), name='listar-categorias'),
    path('servicios/', ServiceListView.as_view(), name='listar-servicios'),
    path('servicios/<int:pk>/', ServiceDetailView.as_view(), name='detalle-servicio'),
    path('configuracion/', GeneralConfigListView.as_view(), name='listar-configuracion'),
]