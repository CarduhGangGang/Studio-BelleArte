// services/api/history.ts
import api from "./api";

export interface AboutHistory {
  title: string;
  description: string;
}

// GET - Buscar conteúdo da história
export const getAboutHistory = async (): Promise<AboutHistory> => {
  const response = await api.get<AboutHistory>("/about/history");
  return response.data;
};

// PUT - Atualizar conteúdo da história
export const updateAboutHistory = async (data: AboutHistory): Promise<void> => {
  await api.put("/about/history", data);
};
