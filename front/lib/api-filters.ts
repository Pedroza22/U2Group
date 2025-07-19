import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface FilterOption {
  label: string;
  params: Record<string, any>;
}

export interface FilterConfig {
  name: string;
  key: string;
  options: FilterOption[];
}

export const getFilterConfigs = async (): Promise<FilterConfig[]> => {
  try {
    const response = await axios.get(`${API_URL}/marketplace/filters/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching filter configurations:', error);
    throw error;
  }
}; 