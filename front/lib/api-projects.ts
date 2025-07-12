import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/admin";

export async function getProjects() {
  const res = await axios.get(`${API_URL}/projects/`);
  return res.data;
}

export async function getProject(id: number) {
  const res = await axios.get(`${API_URL}/projects/${id}/`);
  return res.data;
}

export async function createProject(data: FormData) {
  const res = await axios.post(`${API_URL}/projects/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateProject(id: number, data: FormData) {
  const res = await axios.put(`${API_URL}/projects/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteProject(id: number) {
  const res = await axios.delete(`${API_URL}/projects/${id}/`);
  return res.data;
}

export async function uploadProjectImage(projectId: number, file: File) {
  const formData = new FormData();
  formData.append("project", projectId.toString());
  formData.append("image", file);
  const res = await axios.post(`${API_URL}/project-images/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
} 