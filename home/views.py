from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .models import CalculatorEntry, Project, Product, ProductImage, Order, OrderItem
from .filters import ProductFilter
from .serializer import (
    CalculatorEntrySerializer, ProjectSerializer,
    ProductSerializer, ProductImageSerializer,
    UserSerializer, OrderSerializer
)
from django.core.mail import send_mail
from django.conf import settings
import jwt
import datetime
import logging

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    try:
        # Obtener y validar los datos
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        accepted_policies = request.data.get('profile', {}).get('accepted_policies', False)

        # Validaciones básicas
        if not username or not email or not password:
            return Response({
                'error': 'Datos incompletos',
                'details': 'Username, email y password son requeridos'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validar email único
        if User.objects.filter(email=email).exists():
            return Response({
                'error': 'Email ya registrado',
                'details': 'Este email ya está en uso'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Validar username único
        if User.objects.filter(username=username).exists():
            return Response({
                'error': 'Username ya registrado',
                'details': 'Este nombre de usuario ya está en uso'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Crear el usuario
        serializer = UserSerializer(data={
            'username': username,
            'email': email,
            'password': password,
            'profile': {
                'accepted_policies': accepted_policies
            }
        })

        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'user': UserSerializer(user).data,
                'message': 'Usuario registrado exitosamente',
            }, status=status.HTTP_201_CREATED)
        
        return Response({
            'error': 'Datos inválidos',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    except ValueError as e:
        return Response({
            'error': 'Error de validación',
            'details': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        import traceback
        return Response({
            'error': 'Error en el servidor',
            'details': str(e),
            'trace': traceback.format_exc()
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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

class CalculatorEntryViewSet(viewsets.ModelViewSet):
    queryset = CalculatorEntry.objects.all()
    serializer_class = CalculatorEntrySerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().prefetch_related('images')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'area_m2', 'created_at']

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Asegurar que los usuarios solo puedan ver sus propias órdenes
        return Order.objects.filter(user=self.request.user).prefetch_related('items__product')

    def perform_create(self, serializer):
        # Asignar el usuario actual a la orden al crearla
        serializer.save(user=self.request.user)

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    try:
        email = request.data.get('email')
        User = get_user_model()
        user = User.objects.filter(email=email).first()
        
        if user:
            # Generate reset token
            token = jwt.encode({
                'user_id': user.id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            }, settings.SECRET_KEY, algorithm='HS256')
            
            # Send reset email
            reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
            send_mail(
                'Password Reset Request',
                f'Click the following link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            return Response({
                'message': 'If the email exists, password reset instructions have been sent.'
            })
        
        # Return same message even if user doesn't exist (security)
        return Response({
            'message': 'If the email exists, password reset instructions have been sent.'
        })
        
    except Exception as e:
        return Response({
            'error': 'Could not process reset request'
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    """
    Endpoint para obtener los datos del usuario autenticado
    """
    try:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except Exception as e:
        return Response({
            'error': 'Error al obtener datos del usuario',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_data(request):
    """
    Endpoint para actualizar los datos del usuario
    """
    try:
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        # Si se está intentando cambiar la contraseña, verificar la actual
        if new_password:
            if not current_password:
                return Response({
                    'error': 'Se requiere la contraseña actual para cambiar la contraseña'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if not user.check_password(current_password):
                return Response({
                    'error': 'La contraseña actual es incorrecta'
                }, status=status.HTTP_400_BAD_REQUEST)

        # Preparar los datos para actualizar
        update_data = {
            'username': request.data.get('username', user.username),
            'email': request.data.get('email', user.email),
        }

        # Verificar si el email ya existe para otro usuario
        if update_data['email'] != user.email and User.objects.filter(email=update_data['email']).exists():
            return Response({
                'error': 'Este email ya está en uso'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Verificar si el username ya existe para otro usuario
        if update_data['username'] != user.username and User.objects.filter(username=update_data['username']).exists():
            return Response({
                'error': 'Este nombre de usuario ya está en uso'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(user, data=update_data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            
            # Actualizar la contraseña si se proporcionó una nueva
            if new_password:
                user.set_password(new_password)
                user.save()

            return Response({
                'message': 'Datos actualizados correctamente',
                'user': UserSerializer(user).data
            })
        
        return Response({
            'error': 'Datos inválidos',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({
            'error': 'Error al actualizar datos del usuario',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    """
    Endpoint para obtener los pedidos del usuario autenticado
    """
    logger = logging.getLogger(__name__)
    
    try:
        logger.info(f"Intentando obtener pedidos para el usuario: {request.user.username}")
        
        # Verificar que el usuario está autenticado
        if not request.user.is_authenticated:
            logger.error("Usuario no autenticado")
            return Response({
                'error': 'Usuario no autenticado'
            }, status=status.HTTP_401_UNAUTHORIZED)

        # Obtener los pedidos con sus items y productos relacionados
        logger.info("Consultando pedidos en la base de datos")
        orders = Order.objects.filter(
            user=request.user
        ).prefetch_related(
            'items',
            'items__product'
        ).order_by('-created_at')

        logger.info(f"Encontrados {orders.count()} pedidos")

        # Si no hay pedidos, devolver lista vacía
        if not orders.exists():
            logger.info("No se encontraron pedidos")
            return Response([])

        # Serializar los pedidos
        logger.info("Serializando pedidos")
        serializer = OrderSerializer(orders, many=True)
        logger.info("Pedidos serializados correctamente")
        
        return Response(serializer.data)

    except Exception as e:
        logger.error(f"Error al obtener pedidos: {str(e)}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        return Response({
            'error': 'Error al cargar los pedidos',
            'details': str(e),
            'trace': traceback.format_exc()
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
