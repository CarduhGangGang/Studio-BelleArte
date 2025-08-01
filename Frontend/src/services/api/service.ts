import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ✅ Adiciona token JWT automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Obter todos os serviços
export const getServicos = () => api.get("/servico");

// 🔹 Criar novo serviço (requer role 1)
export const criarServico = (dados: {
  nome: string;
  duracao: number;
  preco: number;
}) => api.post("/servico", dados);

// 🔹 Apagar um serviço (requer role 1)
export const apagarServico = (id: number) => api.delete(`/servico/${id}`);
