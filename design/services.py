def calcular_datos_diseño(area_total, opciones):
    area_basica = area_total * 0.5
    area_disponible = area_total - area_basica

    area_usada = 0
    precio_total = 0

    for opcion in opciones:
        area_usada += opcion.get('area', 0)
        precio_total += opcion.get('precio', 0)

    if area_usada > area_disponible:
        raise ValueError(f"Área insuficiente. Faltan {area_usada - area_disponible:.2f} m²")

    porcentaje_ocupado = (area_usada / area_disponible) * 100 if area_disponible > 0 else 0

    return {
        "area_basica": area_basica,
        "area_disponible": area_disponible,
        "area_usada": area_usada,
        "porcentaje_ocupado": porcentaje_ocupado,
        "precio_total": precio_total
    }