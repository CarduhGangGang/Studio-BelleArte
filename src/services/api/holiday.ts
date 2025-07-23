import api from "./api";

// Para admin: buscar todos os holidays
export const getTodosHolidays = () => api.get("/holiday");

// Para colaborador: buscar apenas os seus holidays
export const getHolidays = (id: number) => api.get(`/holiday/${id}`);

// Criar novo holiday
export const adicionarHoliday = (dados: any) => api.post("/holiday/adicionar", dados);

// Remover holiday
export const removerHoliday = (id: number) => api.delete(`/holiday/${id}`);

// Atualizar holiday
export const atualizarHoliday = (id: number, payload: any) =>
  api.put(`/holiday/editar/${id}`, payload);
