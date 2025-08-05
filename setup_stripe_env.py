#!/usr/bin/env python3
"""
Script para configurar las variables de entorno de Stripe
"""

import os
import requests
import json

def get_stripe_config():
    """Obtener configuración de Stripe desde el backend"""
    try:
        response = requests.get("http://localhost:8000/api/stripe/config/")
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error obteniendo configuración: {response.status_code}")
            return None
    except Exception as e:
        print(f"❌ Error conectando al backend: {e}")
        return None

def create_env_file():
    """Crear archivo .env.local para el frontend"""
    config = get_stripe_config()
    
    if not config:
        print("❌ No se pudo obtener la configuración del backend")
        print("   Asegúrate de que el backend esté corriendo: python manage.py runserver")
        return False
    
    # Claves reales de Stripe (extraídas del código de ejemplo)
    stripe_publishable_key = "pk_test_51Rb6okFKGZAnibj3dR4FU4Qn1CVmwJgmrJceKOJiDYb8OXfpvRpAmiGcBHU3g6mTaAPemCjVJAvCSHV5kHC1sB3G00ELkY2F7Z"
    stripe_secret_key = "sk_test_51Rb6okFKGZAnibj3tr3imYeOmAqNggG4nvCKscyKJc7LbLr9ZtPxcS1VrhsAKT2FoqjdIbtpDJ05yB3JtLctc92E00RgBPAm2a"
    
    # Crear contenido del archivo .env.local
    env_content = f"""# Configuración de Stripe para el Frontend
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY={stripe_publishable_key}
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Configuración de la aplicación
NEXT_PUBLIC_APP_NAME=U2Group
NEXT_PUBLIC_APP_URL=http://localhost:3000
"""
    
    # Crear archivo .env.local en el frontend
    frontend_env_path = "front/.env.local"
    try:
        with open(frontend_env_path, 'w') as f:
            f.write(env_content)
        print(f"✅ Archivo {frontend_env_path} creado exitosamente")
        return True
    except Exception as e:
        print(f"❌ Error creando archivo {frontend_env_path}: {e}")
        return False

def create_backend_env():
    """Crear archivo .env para el backend"""
    # Claves reales de Stripe (extraídas del código de ejemplo)
    stripe_secret_key = "sk_test_51Rb6okFKGZAnibj3tr3imYeOmAqNggG4nvCKscyKJc7LbLr9ZtPxcS1VrhsAKT2FoqjdIbtpDJ05yB3JtLctc92E00RgBPAm2a"
    stripe_publishable_key = "pk_test_51Rb6okFKGZAnibj3dR4FU4Qn1CVmwJgmrJceKOJiDYb8OXfpvRpAmiGcBHU3g6mTaAPemCjVJAvCSHV5kHC1sB3G00ELkY2F7Z"
    
    env_content = f"""# Configuración de Stripe para el Backend
STRIPE_SECRET_KEY={stripe_secret_key}
STRIPE_PUBLISHABLE_KEY={stripe_publishable_key}

# Configuración de Django
DEBUG=True
SECRET_KEY=tu-secret-key-aqui
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos
DATABASE_URL=sqlite:///db.sqlite3
"""
    
    backend_env_path = ".env"
    try:
        with open(backend_env_path, 'w') as f:
            f.write(env_content)
        print(f"✅ Archivo {backend_env_path} creado exitosamente")
        return True
    except Exception as e:
        print(f"❌ Error creando archivo {backend_env_path}: {e}")
        return False

def main():
    """Función principal"""
    print("🔧 Configurando variables de entorno de Stripe...")
    print("=" * 50)
    
    # Verificar backend
    print("🔍 Verificando backend...")
    config = get_stripe_config()
    if config:
        print("✅ Backend funcionando correctamente")
        print(f"   Stripe configurado: {config.get('stripe_configured')}")
    else:
        print("⚠️  Backend no está corriendo")
        print("   Ejecuta: python manage.py runserver")
    
    # Crear archivos de configuración
    print("\n📝 Creando archivos de configuración...")
    
    backend_ok = create_backend_env()
    frontend_ok = create_env_file()
    
    print("\n📊 RESUMEN:")
    print("=" * 50)
    
    if backend_ok and frontend_ok:
        print("✅ Archivos de configuración creados con las claves reales de Stripe")
        print("\n⚠️  IMPORTANTE:")
        print("   1. Reinicia el frontend: cd front && npm run dev")
        print("   2. Reinicia el backend: python manage.py runserver")
        print("   3. Las claves de Stripe ya están configuradas correctamente")
    else:
        print("❌ Error creando archivos de configuración")
    
    print("\n🧪 Para probar:")
    print("   - Backend: python test_stripe_endpoints.py")
    print("   - Frontend: Visita http://localhost:3000/stripe-test")

if __name__ == "__main__":
    main() 