import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/menu`;

export const getMenuData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateMenuData = async (data: {
  logoUrl: string;
  titles: { key: string; label: string; link: string; visible: boolean }[];
}) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
