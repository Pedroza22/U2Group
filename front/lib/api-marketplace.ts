import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getMarketplaceProducts() {
  try {
    console.log('Intentando conectar a:', `${API_URL}/admin/marketplace/`);
    const res = await axios.get(`${API_URL}/admin/marketplace/`);
    console.log('Respuesta exitosa:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error en getMarketplaceProducts:', error);
    console.error('URL intentada:', `${API_URL}/admin/marketplace/`);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
}

export async function createMarketplaceProduct(data: any) {
  try {
    console.log('Datos a enviar:', data);
    
    const formData = new FormData();
    
    // Manejar campos básicos
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'image' && key !== 'images') {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Manejar imagen principal si existe
    if (data.image && data.image.startsWith('blob:')) {
      try {
        const response = await fetch(data.image);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        formData.append("image", file);
      } catch (error: any) {
        console.error('Error convirtiendo imagen:', error);
      }
    }

    // Manejar múltiples imágenes si existen
    if (data.images && Array.isArray(data.images)) {
      for (let i = 0; i < data.images.length; i++) {
        const imageUrl = data.images[i];
        if (imageUrl && imageUrl.startsWith('blob:')) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `image_${i}.jpg`, { type: blob.type });
            formData.append(`images`, file);
          } catch (error: any) {
            console.error(`Error convirtiendo imagen ${i}:`, error);
          }
        }
      }
    }

    console.log('FormData preparado:', formData);
    
    const res = await axios.post(`${API_URL}/admin/marketplace/`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log('Respuesta exitosa:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error en createMarketplaceProduct:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
}

export async function updateMarketplaceProduct(id: number, data: any) {
  try {
    console.log('Actualizando producto:', id, data);
    
    const formData = new FormData();
    
    // Manejar campos básicos
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'image' && key !== 'images') {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Manejar imagen principal si existe
    if (data.image && data.image.startsWith('blob:')) {
      try {
        const response = await fetch(data.image);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type });
        formData.append("image", file);
      } catch (error: any) {
        console.error('Error convirtiendo imagen:', error);
      }
    }

    const res = await axios.patch(`${API_URL}/admin/marketplace/${id}/`, formData, {
      headers: { 
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log('Respuesta exitosa:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('Error en updateMarketplaceProduct:', error);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    throw error;
  }
}

export async function deleteMarketplaceProduct(id: number) {
  try {
    const res = await axios.delete(`${API_URL}/admin/marketplace/${id}/`);
    console.log('Producto eliminado exitosamente');
    return res.data;
  } catch (error: any) {
    console.error('Error en deleteMarketplaceProduct:', error);
    throw error;
  }
} 