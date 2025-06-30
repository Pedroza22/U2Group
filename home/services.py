def calculate_price(num_pages, design_level='básico', has_multilanguage=False):
    base_price = 200_000
    price_per_page = 50_000
    design_multiplier = {
        'básico': 1.0,
        'intermedio': 1.5,
        'avanzado': 2.0,
    }

    total = base_price + (num_pages * price_per_page * design_multiplier.get(design_level, 1.0))

    if has_multilanguage:
        total += 150_000

    return total