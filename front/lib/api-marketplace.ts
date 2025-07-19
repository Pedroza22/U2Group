import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function getMarketplaceProducts() {
  const res = await axios.get(`${API_URL}/marketplace/`);
  return res.data;
}

export async function createMarketplaceProduct(data: any) {
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
  const res = await axios.post(`${API_URL}/marketplace/`, formData, {
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
  const res = await axios.patch(`${API_URL}/marketplace/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteMarketplaceProduct(id: number) {
  const res = await axios.delete(`${API_URL}/marketplace/${id}/`);
  return res.data;
} 