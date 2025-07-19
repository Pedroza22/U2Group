from .models import DesignEntry, Category, Service, GeneralConfig, FilterConfiguration
from .serializers import DesignEntrySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import calcular_datos_diseño
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from .serializers import ServiceSerializer, FilterConfigurationSerializer
from home.models import Product
from home.serializer import ProductSerializer
from django.core.mail import EmailMessage
from rest_framework.decorators import api_view
import datetime
from django.conf import settings

class FilterConfigurationListView(ListAPIView):
    queryset = FilterConfiguration.objects.all()
    serializer_class = FilterConfigurationSerializer

class MarketplaceView(ListAPIView):
    queryset = Product.objects.all().prefetch_related('images')
    serializer_class = ProductSerializer
    filterset_fields = ['bedrooms', 'bathrooms', 'garage', 'architectural_style']
    search_fields = ['name', 'description']
    ordering_fields = ['price', 'area_m2', 'created_at']

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
        # Incluye el campo 'image' en la respuesta
        services = qs.values('id', 'category_id', 'name_en', 'name_es', 'price_min_usd', 'area_max_m2', 'max_units', 'notes', 'image')
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

@api_view(['POST'])
def send_invoice(request):
    email = request.data.get('email')
    products = request.data.get('products', [])
    remitente = settings.EMAIL_HOST_USER
    print('Destinatarios del correo:', [email, remitente])

    # Si se envía 'test' en el request, enviar un correo simple de texto plano
    if request.data.get('test'):
        email_msg = EmailMessage(
            subject="Prueba simple desde Django",
            body="Esto es un correo de prueba enviado desde Django.",
            from_email="u2@u2.group",
            to=[email, remitente],
        )
        email_msg.send()
        return Response({"ok": True, "test": True})

    product_rows = ""
    total = 0
    for p in products:
        product_rows += f"<tr><td style='padding:8px 12px;border-bottom:1px solid #e0e7ef;font-size:15px;'>{p['name']}</td><td style='padding:8px 12px;border-bottom:1px solid #e0e7ef;font-size:15px;text-align:right;'>${p['price']:,}</td></tr>"
        total += p['price']

    # Construir la URL absoluta del logo
    logo_url = request.build_absolute_uri('/media/u2-logo.png')

    html_content = f"""
    <html>
      <body style='background:#f4f7fa;padding:0;margin:0;font-family:Segoe UI,Arial,sans-serif;'>
        <div style='max-width:480px;margin:40px auto;background:#fff;border-radius:16px;box-shadow:0 2px 12px #0001;padding:32px 24px;'>
          <div style='text-align:center;margin-bottom:24px;'>
            <img src='{logo_url}' alt='U2 Group' style='height:64px;margin-bottom:8px;'/>
            <h2 style='color:#1a38e3;margin:0;font-size:2rem;font-weight:800;letter-spacing:-1px;'>¡Gracias por cotizar con U2 Group!</h2>
            <p style='color:#222;font-size:1.1rem;margin:8px 0 0 0;'>Estos son los productos que seleccionaste:</p>
          </div>
          <table style='width:100%;border-collapse:collapse;margin:24px 0 8px 0;'>
            <thead>
              <tr style='background:#1a38e3;color:#fff;'>
                <th style='padding:10px 12px;text-align:left;font-size:15px;border-radius:8px 0 0 8px;'>Producto</th>
                <th style='padding:10px 12px;text-align:right;font-size:15px;border-radius:0 8px 8px 0;'>Precio</th>
              </tr>
            </thead>
            <tbody>
              {product_rows}
              <tr>
                <td style='padding:12px 12px 0 12px;font-weight:700;font-size:16px;color:#1a38e3;border:none;'>Total</td>
                <td style='padding:12px 12px 0 12px;font-weight:700;font-size:16px;text-align:right;color:#1a38e3;border:none;'>${total:,}</td>
              </tr>
            </tbody>
          </table>
          <div style='margin-top:32px;text-align:center;'>
            <p style='color:#222;font-size:1rem;margin-bottom:0;'>¿Tienes dudas? Responde a este correo o contáctanos en <b>U2 Group</b>.</p>
            <p style='color:#1a38e3;font-size:1.1rem;font-weight:700;margin:8px 0 0 0;'>¡Estamos para ayudarte!</p>
          </div>
        </div>
        <div style='text-align:center;color:#b0b8c9;font-size:13px;margin-top:24px;'>
          U2 Group &copy; {datetime.datetime.now().year}
        </div>
      </body>
    </html>
    """

    email_msg = EmailMessage(
        subject="Factura de cotización - U2 Group",
        body=html_content,
        from_email="u2@u2.group",
        to=[email, remitente],
    )
    email_msg.content_subtype = "html"
    email_msg.send()
    return Response({"ok": True})

@api_view(['POST'])
def send_contact_message(request):
    data = request.data
    user_email = data.get('email')
    print('Correo recibido en el backend:', user_email) 
    remitente = settings.EMAIL_HOST_USER
    nombre = data.get('firstName', '') + ' ' + data.get('lastName', '')
    telefono = data.get('phone', '')
    ubicacion = data.get('projectLocation', '')
    tiempo = data.get('timeline', '')
    comentarios = data.get('comments', '')

    logo_url = 'https://u2.group/u2-logo.png'

    html_content = f"""
    <html>
      <body style='background:#f4f7fa;padding:0;margin:0;font-family:Segoe UI,Arial,sans-serif;'>
        <div style='max-width:480px;margin:40px auto;background:#fff;border-radius:16px;box-shadow:0 2px 12px #0001;padding:32px 24px;'>
          <div style='text-align:center;margin-bottom:24px;'>
            <img src='{logo_url}' alt='U2 Group' style='height:64px;margin-bottom:8px;'/>
            <h2 style='color:#1a38e3;margin:0;font-size:2rem;font-weight:800;letter-spacing:-1px;'>¡Gracias por contactarnos en U2 Group!</h2>
            <p style='color:#222;font-size:1.1rem;margin:8px 0 0 0;'>Hemos recibido tu mensaje y te responderemos pronto.</p>
          </div>
          <table style='width:100%;border-collapse:collapse;margin:24px 0 8px 0;'>
            <tbody>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Nombre:</td><td style='padding:8px 0;'>{nombre}</td></tr>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Correo:</td><td style='padding:8px 0;'>{user_email}</td></tr>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Teléfono:</td><td style='padding:8px 0;'>{telefono}</td></tr>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Ubicación:</td><td style='padding:8px 0;'>{ubicacion}</td></tr>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Tiempo estimado:</td><td style='padding:8px 0;'>{tiempo}</td></tr>
              <tr><td style='font-weight:700;color:#1a38e3;padding:8px 0;'>Comentarios:</td><td style='padding:8px 0;'>{comentarios}</td></tr>
            </tbody>
          </table>
          <div style='margin-top:32px;text-align:center;'>
            <p style='color:#222;font-size:1rem;margin-bottom:0;'>¿Tienes dudas? Responde a este correo o contáctanos en <b>U2 Group</b>.</p>
            <p style='color:#1a38e3;font-size:1.1rem;font-weight:700;margin:8px 0 0 0;'>¡Estamos para ayudarte!</p>
          </div>
        </div>
        <div style='text-align:center;color:#b0b8c9;font-size:13px;margin-top:24px;'>
          U2 Group &copy; {datetime.datetime.now().year}
        </div>
      </body>
    </html>
    """

    email_msg = EmailMessage(
        subject="Nuevo mensaje de contacto - U2 Group",
        body=html_content,
        from_email=None,
        to=[user_email, remitente],
    )
    email_msg.content_subtype = "html"
    email_msg.send()
    return Response({"ok": True})