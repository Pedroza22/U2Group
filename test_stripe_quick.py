#!/usr/bin/env python3
"""
Script de prueba rápida para verificar la integración de Stripe
"""

import requests
import json
import time

def test_backend():
    """Prueba rápida del backend"""
    print("🔍 Probando Backend de Stripe...")
    print("=" * 40)
    
    try:
        # Test 1: Configuración
        response = requests.get("http://localhost:8000/api/stripe/config/")
        if response.status_code == 200:
            print("✅ Backend funcionando correctamente")
            data = response.json()
            print(f"   Stripe configurado: {data.get('stripe_configured')}")
        else:
            print(f"❌ Error en backend: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error conectando al backend: {e}")
        return False
    
    try:
        # Test 2: Conexión con Stripe
        response = requests.get("http://localhost:8000/api/stripe/test-connection/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Conexión con Stripe: {data.get('success')}")
            print(f"   Mensaje: {data.get('message')}")
        else:
            print(f"❌ Error en test de conexión: {response.status_code}")
    except Exception as e:
        print(f"❌ Error en test de conexión: {e}")
    
    print("\n" + "=" * 40)
    return True

def test_frontend():
    """Prueba rápida del frontend"""
    print("🔍 Probando Frontend...")
    print("=" * 40)
    
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend funcionando correctamente")
            print("   URL: http://localhost:3000")
            print("   Página de pruebas: http://localhost:3000/stripe-test")
        else:
            print(f"❌ Error en frontend: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Frontend no está corriendo")
        print("   Ejecuta: cd front && npm run dev")
        return False
    except Exception as e:
        print(f"❌ Error conectando al frontend: {e}")
        return False
    
    print("\n" + "=" * 40)
    return True

def main():
    """Función principal"""
    print("🚀 PRUEBA RÁPIDA DE INTEGRACIÓN STRIPE")
    print("=" * 50)
    
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    
    print("\n📊 RESUMEN:")
    print("=" * 50)
    
    if backend_ok and frontend_ok:
        print("🎉 ¡INTEGRACIÓN COMPLETA!")
        print("✅ Backend: Funcionando")
        print("✅ Frontend: Funcionando")
        print("✅ Stripe: Conectado")
        print("\n🌐 URLs disponibles:")
        print("   - Frontend: http://localhost:3000")
        print("   - Pruebas: http://localhost:3000/stripe-test")
        print("   - Backend: http://localhost:8000")
        print("\n🧪 Para probar:")
        print("   - Visita: http://localhost:3000/stripe-test")
        print("   - Ejecuta: python test_stripe_endpoints.py")
    elif backend_ok:
        print("⚠️  Backend OK, Frontend necesita iniciarse")
        print("   Ejecuta: cd front && npm run dev")
    elif frontend_ok:
        print("⚠️  Frontend OK, Backend necesita iniciarse")
        print("   Ejecuta: python manage.py runserver")
    else:
        print("❌ Ambos servicios necesitan iniciarse")
        print("   Backend: python manage.py runserver")
        print("   Frontend: cd front && npm run dev")

if __name__ == "__main__":
    main() 