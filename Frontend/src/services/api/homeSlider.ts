import axios from "axios";

const BASE_API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API = `${BASE_API}/home-slider`;

export const getSlides = async () => (await axios.get(API)).data;

export const createSlide = async (data: any) => (await axios.post(API, data)).data;

export const updateSlide = async (id: number, data: any) =>
  (await axios.put(`${API}/${id}`, data)).data;

export const deleteSlide = async (id: number) =>
  await axios.delete(`${API}/${id}`);

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);
  const response = await axios.post(`${API}/upload`, formData);
  return response.data.imageUrl;
};
