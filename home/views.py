from rest_framework import viewsets
from .models import Blog, Project
from .serializer import BlogSerializer, PriceCalculatorSerializer, ProjectSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .services import calculate_price
from rest_framework.views import APIView

class PriceCalculatorView(APIView):
        def post(self, request):
                serializer = PriceCalculatorSerializer(data=request.data)
                if serializer.is_valid():
                        data = serializer.validated_data
                        total_price = calculate_price(
                                num_pages=data['num_pages'],
                                design_level=data['design_level'],
                                has_multilanguage=data['has_multilanguage']
                        )
                        return Response({'total_price': total_price})
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Blog.objects.all().order_by('-date')
        serializer_class = BlogSerializer
@action(detail=False)
def featured(self, request):
        blogs = self.queryset.filter(featured=True)[:4]
        serializer = self.get_serializer(blogs, many=True)
        return Response(serializer.data)

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
        queryset = Project.objects.all()
        serializer_class = ProjectSerializer
