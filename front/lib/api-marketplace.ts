import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getMarketplaceProduct(id: number) {
  console.log(`[getMarketplaceProduct] Intentando obtener producto con ID: ${id}`);
  console.log(`[getMarketplaceProduct] URL: ${API_URL}/admin/marketplace-products/${id}/`);
  
  try {
    const res = await axios.get(`${API_URL}/admin/marketplace-products/${id}/`);
    console.log(`[getMarketplaceProduct] Respuesta exitosa:`, res.data);
    return res.data;
  } catch (error: any) {
    console.error(`[getMarketplaceProduct] Error al obtener producto ${id}:`, error);
    console.error(`[getMarketplaceProduct] Status:`, error.response?.status);
    console.error(`[getMarketplaceProduct] URL intentada:`, error.config?.url);
    throw error;
  }
}

export async function getMarketplaceProducts() {
  const res = await axios.get(`${API_URL}/admin/marketplace-products/`);
  console.log('Respuesta completa de getMarketplaceProducts:', res);
  console.log('res.data:', res.data);
  
  // Si la respuesta es un objeto con 'results', usar eso
  if (res.data && typeof res.data === 'object' && 'results' in res.data) {
    return res.data.results;
  }
  
  // Si es un array, devolverlo directamente
  if (Array.isArray(res.data)) {
    return res.data;
  }
  
  // Si no es ninguno de los anteriores, devolver array vacío
  console.error('getMarketplaceProducts devolvió algo inesperado:', res.data);
  return [];
}

export async function createMarketplaceProduct(data: any) {
  console.log('Datos a enviar:', data);
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });
  
  // Log del FormData
  for (let [key, value] of formData.entries()) {
    console.log(`FormData - ${key}:`, value);
  }
  
  const res = await axios.post(`${API_URL}/admin/marketplace-products/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateMarketplaceProduct(id: number, data: any) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value);
      }
    }
  });
  const res = await axios.patch(`${API_URL}/admin/marketplace-products/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteMarketplaceProduct(id: number) {
  const res = await axios.delete(`${API_URL}/admin/marketplace-products/${id}/`);
  return res.data;
} 