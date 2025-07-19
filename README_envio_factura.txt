
README: Envío de Factura HTML por Gmail usando Next.js + Django
---------------------------------------------------------------

Tecnologías usadas:
- Frontend: Next.js
- Backend: Django + Django REST Framework
- Email: SMTP Gmail
- Formato de factura: HTML en el cuerpo del correo

Flujo General:
1. El usuario ingresa su correo en una caja de texto.
2. Al hacer clic en "Enviar factura", el frontend envía el correo y los productos al backend.
3. Django genera una tabla HTML con los productos.
4. El backend envía un email HTML usando Gmail.

1. Frontend (Next.js)
---------------------

Formulario de envío:

import { useState } from 'react';
import axios from 'axios';

export default function EmailForm() {
  const [email, setEmail] = useState('');

  const handleSend = async () => {
    const products = [
      { name: 'Camiseta', price: 25000 },
      { name: 'Gorra', price: 15000 },
    ];

    try {
      await axios.post('http://localhost:8000/api/send-invoice/', {
        email,
        products,
      });
      alert('Factura enviada con éxito');
    } catch (err) {
      alert('Error al enviar la factura');
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Correo del cliente"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend}>Enviar factura</button>
    </div>
  );
}

2. Backend (Django)
--------------------

Configurar Gmail en settings.py:

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'tu_correo@gmail.com'
EMAIL_HOST_PASSWORD = 'tu_app_password'  # No uses la contraseña normal

(Usa una App Password de Gmail si tienes 2FA)

Endpoint send_invoice en views.py:

from django.core.mail import EmailMessage
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def send_invoice(request):
    email = request.data.get('email')
    products = request.data.get('products', [])

    product_rows = ""
    total = 0

    for p in products:
        product_rows += f"<tr><td>{p['name']}</td><td>${p['price']:,}</td></tr>"
        total += p['price']

    html_content = f"""
    <html>
      <body>
        <h2>Gracias por cotizar con nosotros 🛒</h2>
        <p>Estos son los productos que seleccionaste:</p>
        <table border="1" cellspacing="0" cellpadding="5">
          <tr>
            <th>Producto</th>
            <th>Precio</th>
          </tr>
          {product_rows}
          <tr>
            <td><strong>Total</strong></td>
            <td><strong>${total:,}</strong></td>
          </tr>
        </table>
        <br />
        <p>Esperamos que pronto realices tu compra 😊</p>
        <p><em>¡Gracias por confiar en nosotros!</em></p>
      </body>
    </html>
    """

    email_msg = EmailMessage(
        subject='Tu cotización con nosotros',
        body=html_content,
        to=[email]
    )
    email_msg.content_subtype = "html"
    email_msg.send()

    return Response({'status': 'enviado'})

Agregar la URL:

# urls.py
from django.urls import path
from .views import send_invoice

urlpatterns = [
    path('api/send-invoice/', send_invoice),
]

Resultado Esperado:
-------------------
El usuario recibe un correo HTML como este:
- Asunto: Tu cotización con nosotros
- Contenido: tabla de productos + total + mensaje de agradecimiento
