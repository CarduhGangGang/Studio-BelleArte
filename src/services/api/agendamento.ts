import api from "./api";

// 📅 Obter todos os agendamentos
export const getAgendamentos = () => api.get("/agendamento");

// ➕ Criar novo agendamento (rota corrigida)
export const criarAgendamento = (dados: any) =>
  api.post("/agendamento", dados);

// ✏️ Atualizar agendamento por ID
export const atualizarAgendamento = (id: number, dados: any) =>
  api.put(`/agendamento/${id}`, dados);

// ❌ Apagar agendamento por ID
export const apagarAgendamento = (id: number) =>
  api.delete(`/agendamento/${id}`);