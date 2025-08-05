#!/usr/bin/env python3
"""
Script de prueba para verificar los endpoints de Stripe
"""

import requests
import json

# Configuración
BASE_URL = "http://localhost:8000/api"

def test_stripe_endpoints():
    """Prueba todos los endpoints de Stripe"""
    print("🔍 Probando endpoints de Stripe...")
    print("=" * 50)
    
    # Test 1: Configuración de Stripe
    print("\n1️⃣ Test de Configuración de Stripe")
    try:
        response = requests.get(f"{BASE_URL}/stripe/config/")
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Stripe configurado: {data.get('stripe_configured')}")
            print(f"   Mensaje: {data.get('message')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en configuración: {e}")
    
    # Test 2: Probar conexión con Stripe
    print("\n2️⃣ Test de Conexión con Stripe")
    try:
        response = requests.get(f"{BASE_URL}/stripe/test-connection/")
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Éxito: {data.get('success')}")
            print(f"   Mensaje: {data.get('message')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en test de conexión: {e}")
    
    # Test 3: Crear PaymentMethod de prueba
    print("\n3️⃣ Test de PaymentMethod de Prueba")
    try:
        response = requests.post(f"{BASE_URL}/stripe/test-payment-method/")
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Éxito: {data.get('success')}")
            print(f"   PaymentMethod ID: {data.get('payment_method_id')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en test PaymentMethod: {e}")
    
    # Test 4: Crear PaymentIntent
    print("\n4️⃣ Test de Crear PaymentIntent")
    try:
        payment_data = {
            "amount": 1000,  # $10.00
            "currency": "usd",
            "order_id": "test_order_123",
            "customer_email": "test@example.com"
        }
        response = requests.post(f"{BASE_URL}/stripe/create-payment-intent/", json=payment_data)
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   PaymentIntent ID: {data.get('payment_intent_id')}")
            print(f"   Client Secret: {data.get('client_secret')[:20]}...")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en PaymentIntent: {e}")
    
    # Test 5: Crear Customer
    print("\n5️⃣ Test de Crear Customer")
    try:
        customer_data = {
            "email": "test@example.com",
            "name": "Test Customer",
            "metadata": {"source": "test"}
        }
        response = requests.post(f"{BASE_URL}/stripe/create-customer/", json=customer_data)
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Customer ID: {data.get('id')}")
            print(f"   Email: {data.get('email')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en Customer: {e}")
    
    # Test 6: Crear Checkout Session
    print("\n6️⃣ Test de Crear Checkout Session")
    try:
        checkout_data = {
            "line_items": [
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": "Test Product",
                        },
                        "unit_amount": 1000,
                    },
                    "quantity": 1,
                }
            ],
            "success_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel",
            "customer_email": "test@example.com"
        }
        response = requests.post(f"{BASE_URL}/stripe/create-checkout-session/", json=checkout_data)
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Session ID: {data.get('id')}")
            print(f"   URL: {data.get('url')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en Checkout Session: {e}")
    
    # Test 7: Crear PaymentMethod (usando token de prueba)
    print("\n7️⃣ Test de Crear PaymentMethod")
    try:
        payment_method_data = {
            "type": "card",
            "card": {
                "token": "tok_visa"  # Usar token de prueba en lugar de datos de tarjeta
            },
            "billing_details": {
                "name": "Test User",
                "email": "test@example.com"
            }
        }
        response = requests.post(f"{BASE_URL}/stripe/create-payment-method/", json=payment_method_data)
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   PaymentMethod ID: {data.get('id')}")
            print(f"   Type: {data.get('type')}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error en PaymentMethod: {e}")
    
    print("\n" + "=" * 50)
    print("🏁 Pruebas completadas!")

def test_single_endpoint(endpoint_name):
    """Prueba un endpoint específico"""
    print(f"🔍 Probando endpoint: {endpoint_name}")
    
    endpoints = {
        "config": {
            "method": "GET",
            "url": f"{BASE_URL}/stripe/config/",
            "data": None
        },
        "test-connection": {
            "method": "GET",
            "url": f"{BASE_URL}/stripe/test-connection/",
            "data": None
        },
        "test-payment-method": {
            "method": "POST",
            "url": f"{BASE_URL}/stripe/test-payment-method/",
            "data": None
        },
        "create-payment-intent": {
            "method": "POST",
            "url": f"{BASE_URL}/stripe/create-payment-intent/",
            "data": {
                "amount": 1000,
                "currency": "usd",
                "order_id": "test_order_123",
                "customer_email": "test@example.com"
            }
        },
        "create-customer": {
            "method": "POST",
            "url": f"{BASE_URL}/stripe/create-customer/",
            "data": {
                "email": "test@example.com",
                "name": "Test Customer",
                "metadata": {"source": "test"}
            }
        },
        "create-payment-method": {
            "method": "POST",
            "url": f"{BASE_URL}/stripe/create-payment-method/",
            "data": {
                "type": "card",
                "card": {
                    "token": "tok_visa"
                },
                "billing_details": {
                    "name": "Test User",
                    "email": "test@example.com"
                }
            }
        }
    }
    
    if endpoint_name not in endpoints:
        print(f"❌ Endpoint '{endpoint_name}' no encontrado")
        print("Endpoints disponibles:", list(endpoints.keys()))
        return
    
    endpoint = endpoints[endpoint_name]
    
    try:
        if endpoint["method"] == "GET":
            response = requests.get(endpoint["url"])
        else:
            response = requests.post(endpoint["url"], json=endpoint["data"])
        
        print(f"✅ Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"   Respuesta: {json.dumps(data, indent=2)}")
        else:
            print(f"   ❌ Error: {response.text}")
    except Exception as e:
        print(f"   ❌ Error: {e}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        # Probar endpoint específico
        endpoint_name = sys.argv[1]
        test_single_endpoint(endpoint_name)
    else:
        # Probar todos los endpoints
        test_stripe_endpoints() 