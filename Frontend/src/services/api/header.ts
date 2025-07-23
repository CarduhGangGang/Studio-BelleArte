import api from "./api"; // usa o axios com baseURL

export type HeaderData = {
  phone: string;
  address: string;
};

export const getHeader = async (): Promise<HeaderData> => {
  const response = await api.get("/header"); // 👈 NÃO repitas /api aqui
  return response.data;
};

export const updateHeader = async (data: HeaderData): Promise<void> => {
  await api.put("/header", data); // 👈 Só "/header", porque já está em baseURL
};
