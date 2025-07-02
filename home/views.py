from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import CalculatorEntrySerializer, ProjectSerializer
from .models import Project

@api_view(['POST'])
def save_calculator_entry(request):
    try:
        data = request.data.copy()
        area = int(data.get('area_m2', 0))

        if area <= 0:
            return Response({"error": "Área inválida"}, status=status.HTTP_400_BAD_REQUEST)

        price = area * 4
        data['price'] = price

        serializer = CalculatorEntrySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET','POST'])
def list_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
