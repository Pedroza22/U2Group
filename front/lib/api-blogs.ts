import axios from "axios";
import { getVisitorId } from "./utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

interface BlogLikeFavoriteResponse {
  id: number;
  blog: number;
  visitor_id: string;
  liked: boolean;
  favorited: boolean;
  like_count: number;
  favorite_count: number;
}

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
export async function getBlogLikeFavorite(blogId: number): Promise<BlogLikeFavoriteResponse | null> {
  const visitorId = getVisitorId();
  const res = await axios.get<BlogLikeFavoriteResponse[]>(`${API_URL}/blog-likes-favorites/?blog=${blogId}&visitor_id=${visitorId}`);
  return res.data[0] || null;
}

export async function toggleBlogLike(blogId: number): Promise<BlogLikeFavoriteResponse> {
  const visitorId = getVisitorId();
  const res = await axios.post<BlogLikeFavoriteResponse>(`${API_URL}/blog-likes-favorites/`, {
    blog: blogId,
    visitor_id: visitorId,
    action_type: 'like'
  });
  return res.data;
}

export async function toggleBlogFavorite(blogId: number): Promise<BlogLikeFavoriteResponse> {
  const visitorId = getVisitorId();
  const res = await axios.post<BlogLikeFavoriteResponse>(`${API_URL}/blog-likes-favorites/`, {
    blog: blogId,
    visitor_id: visitorId,
    action_type: 'favorite'
  });
  return res.data;
}

export async function getBlogLikeFavoriteCount(blogId: number) {
  const res = await axios.get(`${API_URL}/blog-likes-favorites/?blog=${blogId}`);
  const all = res.data;
  return {
    likes: all.filter((item: any) => item.liked).length,
    favorites: all.filter((item: any) => item.favorited).length,
  };
} 