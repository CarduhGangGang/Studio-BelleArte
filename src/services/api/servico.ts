import axios from "./api";

export interface ServicoData {
  id?: number;
  nome: string;
  descricao?: string;
  preco?: number;
  duracao?: number;
  image?: File | null;
  imageUrl?: string;
}

export const getServicos = async (): Promise<ServicoData[]> => {
  const res = await axios.get("/servico");
  return res.data;
};

export const createServico = async (data: ServicoData) => {
  const formData = new FormData();
  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao || "");
  formData.append("preco", String(data.preco || 0));
  formData.append("duracao", String(data.duracao || 0));
  if (data.image) formData.append("image", data.image);

  return axios.post("/servico", formData);
};

export const updateServico = async (id: number, data: ServicoData) => {
  const formData = new FormData();
  formData.append("nome", data.nome);
  formData.append("descricao", data.descricao || "");
  formData.append("preco", String(data.preco || 0));
  formData.append("duracao", String(data.duracao || 0));
  if (data.image) formData.append("image", data.image);

  return axios.put(`/servico/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteServico = async (id: number) => {
  return axios.delete(`/servico/${id}`);
};

// Seção
export const getServicesSection = async () => {
  const res = await axios.get("/servico/section/info");
  return res.data;
};

export const updateServicesSection = async (data: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return axios.put("/servico/section/info", data);
};
