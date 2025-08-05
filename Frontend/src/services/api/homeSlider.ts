import axios from "axios";

const BASE_API = `${import.meta.env.VITE_API_URL}/api`;
const API = `${BASE_API}/home-slider`;

// Exemplo de tipagem (ajuste conforme sua interface)
export interface Slide {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  order: number;
}

export const getSlides = async (): Promise<Slide[]> => {
  const response = await axios.get(API);
  return response.data;
};

export const createSlide = async (data: Slide): Promise<Slide> => {
  const response = await axios.post(API, data);
  return response.data;
};

export const updateSlide = async (id: number, data: Slide): Promise<Slide> => {
  const response = await axios.put(`${API}/${id}`, data);
  return response.data;
};

export const deleteSlide = async (id: number): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};
