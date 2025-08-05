import axios from "./api";

export interface PortfolioImage {
  id?: number;
  imageUrl?: string;
}

// 🔹 GET imagens do portfólio
export const getPortfolioImages = async (): Promise<PortfolioImage[]> => {
  const res = await axios.get("/portfolio/images");
  return res.data;
};

// 🔹 POST nova imagem via URL
export const uploadPortfolioImage = async (data: { imageUrl: string }) => {
  return axios.post("/portfolio/images", data);
};

// 🔹 DELETE imagem
export const deletePortfolioImage = async (id: number) => {
  return axios.delete(`/portfolio/images/${id}`);
};

// 🔹 GET dados da seção (título, subtítulo, descrição)
export const getPortfolioSection = async (): Promise<{
  title: string;
  subtitle: string;
  description: string;
}> => {
  const res = await axios.get("/portfolio/section");
  return res.data;
};

// 🔹 PUT atualizar texto da seção
export const updatePortfolioSection = async (data: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return axios.put("/portfolio/section", data);
};
