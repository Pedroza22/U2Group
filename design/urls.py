from django.urls import path
from .views import (
    DesignEntryView, CategoryListView, ServiceListView,
    GeneralConfigListView, ServiceDetailView, MarketplaceView,
    FilterConfigurationListView, send_invoice, send_contact_message
)

urlpatterns = [
    path('marketplace/', MarketplaceView.as_view(), name='marketplace'),
    path('marketplace/filters/', FilterConfigurationListView.as_view(), name='marketplace-filters'),
    path('diseno/', DesignEntryView.as_view(), name='crear-diseno'),
    path('categorias/', CategoryListView.as_view(), name='listar-categorias'),
    path('servicios/', ServiceListView.as_view(), name='listar-servicios'),
    path('servicios/<int:pk>/', ServiceDetailView.as_view(), name='detalle-servicio'),
    path('configuracion/', GeneralConfigListView.as_view(), name='listar-configuracion'),
    path('api/send-invoice/', send_invoice, name='send-invoice'),
    path('api/send-contact-message/', send_contact_message, name='send-contact-message'),
]