import axios from "./api";

export interface ServicoData {
  id?: number;
  nome: string;
  descricao?: string;
  preco?: number;
  duracao?: number;
  imageUrl?: string;
}

// 📥 Obter todos os serviços
export const getServicos = async (): Promise<ServicoData[]> => {
  const res = await axios.get("/servico");
  return res.data;
};

// ➕ Criar novo serviço (com URL da imagem)
export const createServico = async (data: ServicoData) => {
  return axios.post("/servico", {
    nome: data.nome,
    descricao: data.descricao,
    preco: data.preco,
    duracao: data.duracao,
    imageUrl: data.imageUrl,
  });
};

// ✏️ Atualizar serviço existente (com URL da imagem)
export const updateServico = async (id: number, data: ServicoData) => {
  return axios.put(`/servico/${id}`, {
    nome: data.nome,
    descricao: data.descricao,
    preco: data.preco,
    duracao: data.duracao,
    imageUrl: data.imageUrl,
  });
};

// ❌ Apagar serviço
export const deleteServico = async (id: number) => {
  return axios.delete(`/servico/${id}`);
};

// ℹ️ Obter conteúdo da seção
export const getServicesSection = async () => {
  const res = await axios.get("/servico/section/info");
  return res.data;
};

// 🔄 Atualizar conteúdo da seção
export const updateServicesSection = async (data: {
  title: string;
  subtitle: string;
  description: string;
}) => {
  return axios.put("/servico/section/info", data);
};
