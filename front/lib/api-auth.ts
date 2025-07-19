import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email: string;
  accepted_policies: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}

export interface UserResponse {
  user: {
    id: number;
    username: string;
    email: string;
  };
  message: string;
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    // Store tokens in localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<UserResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, data);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const refreshToken = async (): Promise<AuthResponse> => {
  try {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) throw new Error('No refresh token available');

    const response = await axios.post(`${API_URL}/auth/refresh/`, {
      refresh,
    });
    localStorage.setItem('accessToken', response.data.access);
    return response.data;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}; 