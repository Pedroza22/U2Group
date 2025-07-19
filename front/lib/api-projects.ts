import axios from "axios";
import type { Project } from "@/data/projects";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

export async function getProjects(): Promise<Project[]> {
  const res = await axios.get<Project[]>(`${API_URL}/projects/`);
  return res.data;
}

export async function getProject(id: number): Promise<Project> {
  const res = await axios.get<Project>(`${API_URL}/projects/${id}/`);
  return res.data;
}

export async function createProject(data: FormData): Promise<Project> {
  const res = await axios.post<Project>(`${API_URL}/projects/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProject(id: number, data: FormData): Promise<Project> {
  const res = await axios.put<Project>(`${API_URL}/projects/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteProject(id: number): Promise<void> {
  await axios.delete(`${API_URL}/projects/${id}/`);
}

export async function uploadProjectImage(projectId: number, file: File): Promise<{ id: number; image: string }> {
  const formData = new FormData();
  formData.append("project", projectId.toString());
  formData.append("image", file);
  const res = await axios.post<{ id: number; image: string }>(`${API_URL}/project-images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
} 