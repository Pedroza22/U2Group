import os
import stripe
from django.conf import settings

# Configurar Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY

# Configuración de Stripe
STRIPE_CONFIG = {
    'publishable_key': settings.STRIPE_PUBLISHABLE_KEY,
    'secret_key': settings.STRIPE_SECRET_KEY,
    'webhook_secret': os.getenv('STRIPE_WEBHOOK_SECRET', ''),
    'currency': 'usd',
    'payment_method_types': ['card'],
}

def validate_stripe_config():
    """Valida que Stripe esté configurado correctamente"""
    if not settings.STRIPE_SECRET_KEY or settings.STRIPE_SECRET_KEY == 'sk_test_placeholder':
        return False, "Stripe no está configurado. Configura STRIPE_SECRET_KEY en tu .env"
    
    if not settings.STRIPE_PUBLISHABLE_KEY or settings.STRIPE_PUBLISHABLE_KEY == 'pk_test_placeholder':
        return False, "Stripe no está configurado. Configura STRIPE_PUBLISHABLE_KEY en tu .env"
    
    return True, "Stripe configurado correctamente"

def create_payment_intent(amount, currency='usd', metadata=None):
    """Crea un PaymentIntent de Stripe"""
    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Stripe usa centavos
            currency=currency,
            metadata=metadata or {},
            automatic_payment_methods={
                'enabled': True,
            },
        )
        return payment_intent
    except stripe.error.StripeError as e:
        raise e

def create_payment_method(type='card', card_data=None, billing_details=None):
    """
    Crea un PaymentMethod de Stripe
    
    Args:
        type: Tipo de método de pago ('card', 'sepa_debit', etc.)
        card_data: Datos de la tarjeta (número, exp_month, exp_year, cvc)
        billing_details: Detalles de facturación (name, email, address)
    """
    try:
        payment_method_data = {
            'type': type,
        }
        
        if type == 'card' and card_data:
            payment_method_data['card'] = card_data
        
        if billing_details:
            payment_method_data['billing_details'] = billing_details
        
        payment_method = stripe.PaymentMethod.create(**payment_method_data)
        return payment_method
    except stripe.error.StripeError as e:
        raise e

def attach_payment_method_to_customer(payment_method_id, customer_id):
    """
    Adjunta un PaymentMethod a un Customer
    
    Args:
        payment_method_id: ID del PaymentMethod
        customer_id: ID del Customer
    """
    try:
        payment_method = stripe.PaymentMethod.attach(
            payment_method_id,
            customer=customer_id,
        )
        return payment_method
    except stripe.error.StripeError as e:
        raise e

def create_customer(email, name=None, metadata=None):
    """
    Crea un Customer de Stripe
    
    Args:
        email: Email del cliente
        name: Nombre del cliente
        metadata: Metadatos adicionales
    """
    try:
        customer_data = {
            'email': email,
        }
        
        if name:
            customer_data['name'] = name
        
        if metadata:
            customer_data['metadata'] = metadata
        
        customer = stripe.Customer.create(**customer_data)
        return customer
    except stripe.error.StripeError as e:
        raise e

def create_checkout_session(line_items, success_url, cancel_url, customer_email=None, metadata=None):
    """
    Crea una sesión de checkout de Stripe
    
    Args:
        line_items: Lista de items a pagar
        success_url: URL de éxito
        cancel_url: URL de cancelación
        customer_email: Email del cliente
        metadata: Metadatos adicionales
    """
    try:
        session_data = {
            'payment_method_types': ['card'],
            'line_items': line_items,
            'mode': 'payment',
            'success_url': success_url,
            'cancel_url': cancel_url,
        }
        
        if customer_email:
            session_data['customer_email'] = customer_email
        
        if metadata:
            session_data['metadata'] = metadata
        
        session = stripe.checkout.Session.create(**session_data)
        return session
    except stripe.error.StripeError as e:
        raise e

def confirm_payment(payment_intent_id):
    """Confirma un pago de Stripe"""
    try:
        payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        return payment_intent
    except stripe.error.StripeError as e:
        raise e

def refund_payment(payment_intent_id, amount=None, reason='requested_by_customer'):
    """
    Reembolsa un pago
    
    Args:
        payment_intent_id: ID del PaymentIntent
        amount: Cantidad a reembolsar (en centavos, opcional)
        reason: Razón del reembolso
    """
    try:
        refund_data = {
            'payment_intent': payment_intent_id,
            'reason': reason,
        }
        
        if amount:
            refund_data['amount'] = amount
        
        refund = stripe.Refund.create(**refund_data)
        return refund
    except stripe.error.StripeError as e:
        raise e

def get_payment_method(payment_method_id):
    """Obtiene un PaymentMethod por ID"""
    try:
        payment_method = stripe.PaymentMethod.retrieve(payment_method_id)
        return payment_method
    except stripe.error.StripeError as e:
        raise e

def list_customer_payment_methods(customer_id, type='card'):
    """Lista los PaymentMethods de un Customer"""
    try:
        payment_methods = stripe.PaymentMethod.list(
            customer=customer_id,
            type=type
        )
        return payment_methods
    except stripe.error.StripeError as e:
        raise e

def detach_payment_method(payment_method_id):
    """Desvincula un PaymentMethod de un Customer"""
    try:
        payment_method = stripe.PaymentMethod.detach(payment_method_id)
        return payment_method
    except stripe.error.StripeError as e:
        raise e 

def test_stripe_connection():
    """
    Prueba la conexión con Stripe y verifica que las claves funcionen
    """
    try:
        # Verificar configuración
        is_valid, message = validate_stripe_config()
        if not is_valid:
            return False, message
        
        # Intentar crear un PaymentMethod de prueba
        test_payment_method = stripe.PaymentMethod.create(
            type="card",
            card={"token": "tok_visa"}  # Token de prueba de Stripe
        )
        
        # Verificar que se creó correctamente
        if test_payment_method and test_payment_method.id:
            # Solo intentar desvincular si está adjunto a un customer
            try:
                if hasattr(test_payment_method, 'customer') and test_payment_method.customer:
                    stripe.PaymentMethod.detach(test_payment_method.id)
                    return True, f"✅ Conexión exitosa con Stripe. PaymentMethod de prueba creado y eliminado: {test_payment_method.id}"
                else:
                    return True, f"✅ Conexión exitosa con Stripe. PaymentMethod de prueba creado: {test_payment_method.id}"
            except stripe.error.StripeError:
                # Si no se puede desvincular, no es un problema
                return True, f"✅ Conexión exitosa con Stripe. PaymentMethod de prueba creado: {test_payment_method.id}"
        else:
            return False, "❌ Error: No se pudo crear el PaymentMethod de prueba"
            
    except stripe.error.AuthenticationError:
        return False, "❌ Error de autenticación: Verifica tu STRIPE_SECRET_KEY"
    except stripe.error.InvalidRequestError as e:
        return False, f"❌ Error de solicitud inválida: {str(e)}"
    except stripe.error.StripeError as e:
        return False, f"❌ Error de Stripe: {str(e)}"
    except Exception as e:
        return False, f"❌ Error inesperado: {str(e)}"

def create_test_payment_method():
    """
    Crea un PaymentMethod de prueba para verificar la funcionalidad
    """
    try:
        payment_method = stripe.PaymentMethod.create(
            type="card",
            card={"token": "tok_visa"}
        )
        print(f"Método de pago creado con ID: {payment_method.id}")
        return payment_method.id
    except stripe.error.StripeError as e:
        print(f"Error al crear PaymentMethod: {e}")
        return None 