import api from "./api";

// Buscar todos os clientes (role_id = 3)
export const getClientes = () => api.get("/utilizador?role=3");

// Buscar todos os colaboradores (role_id = 2)
export const getColaboradores = () => api.get("/utilizador?role=2");

// Buscar todos (admin + colaborador + cliente)
export const getTodosUtilizadores = () => api.get("/utilizador");

// Criar novo utilizador
export const criarUtilizador = (dados: any) => api.post("/utilizador", dados);

// Atualizar utilizador
export const atualizarUtilizador = (id: number, dados: any) =>
  api.put(`/utilizador/${id}`, dados);

// Remover utilizador
export const removerUtilizador = (id: number) => api.delete(`/utilizador/${id}`);
