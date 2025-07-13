import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

export async function getBlogs() {
  const res = await axios.get(`${API_URL}/blogs/`);
  return res.data;
}

export async function getBlog(id: number) {
  const res = await axios.get(`${API_URL}/blogs/${id}/`);
  return res.data;
}

export async function createBlog(data: FormData) {
  const res = await axios.post(`${API_URL}/blogs/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateBlog(id: number, data: FormData) {
  const res = await axios.patch(`${API_URL}/blogs/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteBlog(id: number) {
  const res = await axios.delete(`${API_URL}/blogs/${id}/`);
  return res.data;
}

// LIKE/FAVORITE API
export async function getBlogLikeFavorite(blogId: number) {
  const res = await axios.get(`${API_URL}/blog-likes-favorites/?blog=${blogId}`);
  return res.data[0]; // Solo uno por usuario+blog
}

export async function setBlogLikeFavorite(blogId: number, liked: boolean, favorited: boolean) {
  // Intenta obtener el registro existente
  const existing = await getBlogLikeFavorite(blogId);
  if (existing) {
    // Actualiza
    const res = await axios.patch(`${API_URL}/blog-likes-favorites/${existing.id}/`, { liked, favorited });
    return res.data;
  } else {
    // Crea
    const res = await axios.post(`${API_URL}/blog-likes-favorites/`, { blog: blogId, liked, favorited });
    return res.data;
  }
}

export async function getBlogLikeFavoriteCount(blogId: number) {
  // Obtiene el conteo de likes y favoritos para un blog
  const res = await axios.get(`${API_URL}/blog-likes-favorites/?blog=${blogId}`);
  const all = res.data;
  return {
    likes: all.filter((item: any) => item.liked).length,
    favorites: all.filter((item: any) => item.favorited).length,
  };
} 