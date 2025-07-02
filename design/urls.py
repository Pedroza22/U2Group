from django.urls import path
from .views import DesignEntryView

urlpatterns = [
    path('api/diseno/', DesignEntryView.as_view(), name='crear-diseno'),
]