from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import DesignEntry
from .serializers import DesignEntrySerializer
from .services import calcular_datos_diseño

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