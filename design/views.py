from .models import DesignEntry, Category, Service, GeneralConfig
from .serializers import DesignEntrySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import calcular_datos_diseño
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import ServiceSerializer

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all().values('id', 'name', 'emoji')
        return Response(list(categories))

class ServiceListView(APIView):
    def get(self, request):
        category_id = request.query_params.get('category_id')
        qs = Service.objects.all()
        if category_id:
            qs = qs.filter(category_id=category_id)
        services = qs.values('id', 'category_id', 'name_en', 'name_es', 'price_min_usd', 'area_max_m2', 'max_units', 'notes')
        return Response(list(services))

class GeneralConfigListView(APIView):
    def get(self, request):
        configs = GeneralConfig.objects.all().values('key', 'value')
        return Response(list(configs))

class ServiceDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class DesignEntryView(APIView):
    def post(self, request):
        try:
            area_total = request.data.get("area_total")
            opciones = request.data.get("opciones", [])
            correo = request.data.get("correo", None)

            if area_total is None or not opciones:
                return Response({"error": "Faltan datos"}, status=status.HTTP_400_BAD_REQUEST)

            resultado = calcular_datos_diseño(float(area_total), opciones)

            data = {
                "area_total": area_total,
                "area_basica": resultado["area_basica"],
                "area_disponible": resultado["area_disponible"],
                "area_usada": resultado["area_usada"],
                "porcentaje_ocupado": resultado["porcentaje_ocupado"],
                "precio_total": resultado["precio_total"],
                "opciones": opciones,
                "correo": correo,
            }

            serializer = DesignEntrySerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ValueError as ve:
            return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Error interno"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)