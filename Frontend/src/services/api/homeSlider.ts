import axios from "axios";

const BASE_API = `${import.meta.env.VITE_API_URL}/api`;
const API = `${BASE_API}/home-slider`;

export const getSlides = async () => (await axios.get(API)).data;

export const createSlide = async (data: any) => (await axios.post(API, data)).data;

export const updateSlide = async (id: number, data: any) =>
  (await axios.put(`${API}/${id}`, data)).data;

export const deleteSlide = async (id: number) =>
  await axios.delete(`${API}/${id}`);
