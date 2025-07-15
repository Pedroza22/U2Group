from django.urls import path
from .views import DesignEntryView, CategoryListView, ServiceListView, GeneralConfigListView, ServiceDetailView, send_invoice, send_contact_message

urlpatterns = [
    path('api/diseno/', DesignEntryView.as_view(), name='crear-diseno'),
    path('api/categorias/', CategoryListView.as_view(), name='listar-categorias'),
    path('api/servicios/', ServiceListView.as_view(), name='listar-servicios'),
    path('api/servicios/<int:pk>/', ServiceDetailView.as_view(), name='detalle-servicio'),
    path('api/configuracion/', GeneralConfigListView.as_view(), name='listar-configuracion'),
    path('api/send-invoice/', send_invoice, name='send-invoice'),
    path('api/send-contact-message/', send_contact_message, name='send-contact-message'),
]