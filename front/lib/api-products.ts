export interface Product {
  id: number;
  name: string;
  description: string;
  area_m2: number;
  area_sqft: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  price: number;
  architectural_style: string;
  main_image: string;
  images: Array<{
    id: number;
    image: string;
    order: number;
  }>;
  created_at: string;
  updated_at: string;
}

interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

export async function getProducts(filters: Record<string, any> = {}): Promise<ProductsResponse> {
  try {
    // Construir los parámetros de consulta
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`/api/products/?${queryParams.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al cargar los productos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`/api/products/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al cargar el producto');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function getFavoriteProducts(): Promise<Product[]> {
  const token = localStorage.getItem('token');
  if (!token) {
    return [];
  }

  try {
    const response = await fetch('/api/products/favorites/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Sesión expirada');
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al cargar los favoritos');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    throw error;
  }
}

export async function toggleFavorite(productId: number): Promise<void> {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Debes iniciar sesión para marcar favoritos');
  }

  try {
    const response = await fetch(`/api/products/${productId}/toggle_favorite/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Sesión expirada');
      }
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al actualizar favorito');
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
} 