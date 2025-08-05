# 🔗 Configuración de Webhooks de Stripe

## 📋 Pasos para Configurar Webhooks

### 1. **Acceder al Dashboard de Stripe**
- Ve a [dashboard.stripe.com](https://dashboard.stripe.com)
- Inicia sesión con tu cuenta de Stripe

### 2. **Crear un Webhook**
1. En el menú lateral, ve a **Developers** → **Webhooks**
2. Haz clic en **"Add endpoint"**
3. Configura el webhook:
   - **Endpoint URL**: `http://localhost:8000/api/stripe/webhook/` (para desarrollo)
   - **Events to send**: Selecciona los siguientes eventos:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`
     - `checkout.session.completed`
     - `customer.created`
     - `payment_method.attached`

### 3. **Obtener el Webhook Secret**
1. Después de crear el webhook, haz clic en el endpoint creado
2. En la sección **"Signing secret"**, haz clic en **"Reveal"**
3. Copia el secret (empieza con `whsec_`)

### 4. **Configurar el Secret en el Backend**
1. Abre tu archivo `.env` en el backend
2. Agrega la siguiente línea:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui
   ```

### 5. **Para Producción**
- Cambia la URL del webhook a tu dominio de producción
- Ejemplo: `https://tudominio.com/api/stripe/webhook/`

## 🧪 Probar los Webhooks

### Usando Stripe CLI (Recomendado)
1. Instala Stripe CLI: https://stripe.com/docs/stripe-cli
2. Ejecuta: `stripe listen --forward-to localhost:8000/api/stripe/webhook/`
3. Esto te dará un webhook secret para desarrollo

### Usando el Dashboard de Stripe
1. Ve a tu webhook en el dashboard
2. Haz clic en **"Send test webhook"**
3. Selecciona un evento (ej: `payment_intent.succeeded`)
4. Haz clic en **"Send test webhook"**

## 📊 Eventos que Maneja el Backend

### `payment_intent.succeeded`
- Actualiza el estado de la orden a "paid"
- Guarda el ID del PaymentIntent
- Envía confirmación al usuario

### `payment_intent.payment_failed`
- Actualiza el estado de la orden a "failed"
- Registra el error para debugging

### `checkout.session.completed`
- Procesa órdenes completadas via Checkout
- Actualiza inventario si es necesario

## 🔧 Configuración del Backend

El backend ya está configurado para manejar estos eventos en:
- `home/views.py` → `stripe_webhook()`
- `Back/stripe_config.py` → Funciones de manejo

## 🚨 Troubleshooting

### Error: "Webhook secret no configurado"
- Verifica que `STRIPE_WEBHOOK_SECRET` esté en tu `.env`
- Reinicia el servidor Django

### Error: "Invalid signature"
- Verifica que el webhook secret sea correcto
- Asegúrate de que la URL del webhook sea exacta

### Error: "Invalid payload"
- Verifica que el webhook esté enviando JSON válido
- Revisa los logs del servidor para más detalles

## 📝 Logs de Webhook

Los webhooks se registran en los logs de Django. Puedes verlos en:
- Consola del servidor Django
- Archivo de logs (si está configurado)

## 🔒 Seguridad

- **Nunca** compartas tu webhook secret
- Usa HTTPS en producción
- Verifica las firmas de los webhooks (ya implementado)
- Monitorea los webhooks fallidos en el dashboard de Stripe 