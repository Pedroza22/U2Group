from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Project, ProjectImage, Blog, BlogLikeFavorite, MarketplaceProduct, Order
from .serializers import ProjectSerializer, ProjectImageSerializer, BlogSerializer, BlogLikeFavoriteSerializer, MarketplaceProductSerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from django.db.models import F
from django.db import transaction
import stripe
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse

# Create your views here.

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-id')
    serializer_class = ProjectSerializer
    parser_classes = (MultiPartParser, FormParser)

class ProjectImageViewSet(viewsets.ModelViewSet):
    queryset = ProjectImage.objects.all()
    serializer_class = ProjectImageSerializer
    parser_classes = (MultiPartParser, FormParser)

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all().order_by('-date')
    serializer_class = BlogSerializer
    parser_classes = (MultiPartParser, FormParser)

    @method_decorator(csrf_exempt, name='dispatch')
    @action(detail=True, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def like(self, request, pk=None):
        print(f"[LIKE] Petición recibida para blog id={pk}, método={request.method}, user={request.user}, data={request.data}")
        blog = self.get_object()
        blog.like_count += 1
        blog.save()
        print(f"[LIKE] Nuevo contador: {blog.like_count}")
        return Response({'like_count': blog.like_count})

    @method_decorator(csrf_exempt, name='dispatch')
    @action(detail=True, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def favorite(self, request, pk=None):
        print(f"[FAVORITE] Petición recibida para blog id={pk}, método={request.method}, user={request.user}, data={request.data}")
        blog = self.get_object()
        blog.favorite_count += 1
        blog.save()
        print(f"[FAVORITE] Nuevo contador: {blog.favorite_count}")
        return Response({'favorite_count': blog.favorite_count})

class BlogLikeFavoriteViewSet(viewsets.ModelViewSet):
    queryset = BlogLikeFavorite.objects.all()
    serializer_class = BlogLikeFavoriteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        blog_id = self.request.query_params.get('blog')
        visitor_id = self.request.query_params.get('visitor_id')
        
        queryset = BlogLikeFavorite.objects.all()
        
        if blog_id:
            queryset = queryset.filter(blog=blog_id)
        if visitor_id:
            queryset = queryset.filter(visitor_id=visitor_id)
            
        return queryset

    def create(self, request, *args, **kwargs):
        blog_id = request.data.get('blog')
        visitor_id = request.data.get('visitor_id')
        action_type = request.data.get('action_type')  # 'like' o 'favorite'
        
        if not all([blog_id, visitor_id, action_type]):
            return Response(
                {'error': 'Se requiere blog_id, visitor_id y action_type'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Obtener o crear el registro
        like_favorite, created = BlogLikeFavorite.objects.get_or_create(
            blog_id=blog_id,
            visitor_id=visitor_id,
            defaults={'liked': False, 'favorited': False}
        )

        # Actualizar el estado según la acción
        if action_type == 'like':
            like_favorite.liked = not like_favorite.liked
        elif action_type == 'favorite':
            like_favorite.favorited = not like_favorite.favorited

        like_favorite.save()

        # Actualizar los contadores en el blog
        blog = like_favorite.blog
        blog.like_count = BlogLikeFavorite.objects.filter(blog=blog, liked=True).count()
        blog.favorite_count = BlogLikeFavorite.objects.filter(blog=blog, favorited=True).count()
        blog.save()

        # Devolver el nuevo estado
        return Response({
            'id': like_favorite.id,
            'blog': blog_id,
            'visitor_id': visitor_id,
            'liked': like_favorite.liked,
            'favorited': like_favorite.favorited,
            'like_count': blog.like_count,
            'favorite_count': blog.favorite_count
        })

class MarketplaceProductViewSet(viewsets.ModelViewSet):
    queryset = MarketplaceProduct.objects.all()
    serializer_class = MarketplaceProductSerializer

    def get_queryset(self):
        queryset = MarketplaceProduct.objects.all()
        
        # Filtros
        category = self.request.query_params.get('category', None)
        style = self.request.query_params.get('style', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        min_area = self.request.query_params.get('min_area', None)
        max_area = self.request.query_params.get('max_area', None)
        rooms = self.request.query_params.get('rooms', None)
        bathrooms = self.request.query_params.get('bathrooms', None)
        is_featured = self.request.query_params.get('is_featured', None)
        is_active = self.request.query_params.get('is_active', None)

        if category:
            queryset = queryset.filter(category=category)
        if style:
            queryset = queryset.filter(style=style)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if min_area:
            queryset = queryset.filter(area_m2__gte=min_area)
        if max_area:
            queryset = queryset.filter(area_m2__lte=max_area)
        if rooms:
            queryset = queryset.filter(rooms=rooms)
        if bathrooms:
            queryset = queryset.filter(bathrooms=bathrooms)
        if is_featured is not None:
            queryset = queryset.filter(is_featured=is_featured.lower() == 'true')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')

        # Ordenamiento
        ordering = self.request.query_params.get('ordering', '-created_at')
        return queryset.order_by(ordering)

    def create(self, request, *args, **kwargs):
        print(f"[MarketplaceProductViewSet] Datos recibidos: {request.data}")
        print(f"[MarketplaceProductViewSet] Files: {request.FILES}")
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            print(f"[MarketplaceProductViewSet] Error en create: {e}")
            raise

    @action(detail=True, methods=['post'])
    def toggle_featured(self, request, pk=None):
        product = self.get_object()
        product.is_featured = not product.is_featured
        product.save()
        return Response({'status': 'success', 'is_featured': product.is_featured})

    @action(detail=True, methods=['post'])
    def toggle_active(self, request, pk=None):
        product = self.get_object()
        product.is_active = not product.is_active
        product.save()
        return Response({'status': 'success', 'is_active': product.is_active})

@api_view(['POST'])
def create_stripe_checkout_session(request):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    items = request.data.get('items', [])
    line_items = []
    for item in items:
        line_items.append({
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': item['name'],
                },
                'unit_amount': int(float(item['price']) * 100),
            },
            'quantity': item.get('quantity', 1),
        })
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=request.build_absolute_uri('/cart?success=true'),
            cancel_url=request.build_absolute_uri('/cart?canceled=true'),
        )
        return Response({'id': session.id, 'url': session.url})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
def stripe_webhook(request):
    import stripe
    from django.conf import settings
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')
    event = None
    endpoint_secret = settings.STRIPE_WEBHOOK_SECRET
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except Exception as e:
        return HttpResponse(status=400)
    # Maneja el evento de pago exitoso
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        Order.objects.get_or_create(
            stripe_session_id=session['id'],
            defaults={
                'email': session.get('customer_details', {}).get('email'),
                'amount_total': float(session['amount_total']) / 100,
                'status': 'paid',
                'raw_data': session,
            }
        )
    return HttpResponse(status=200)
