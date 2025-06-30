
def calculate_price(num_pages, design_level, has_multilanguage):
    base_price = 200_000  # precio base
    price_per_page = 50_000
    design_multiplier = {
        'básico': 1.0,
        'intermedio': 1.5,
        'avanzado': 2.0,
    }

    total = base_price + (num_pages * price_per_page * design_multiplier[design_level])

    if has_multilanguage:
        total += 150_000  # costo adicional por multilenguaje

    return total
