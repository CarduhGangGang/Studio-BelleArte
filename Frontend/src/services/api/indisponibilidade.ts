import api from "./api";

// 🔄 Tipagem mais clara (opcional mas recomendado)
export interface IndisponibilidadePayload {
  data_hora: string;
  motivo: string;
  colaborador_id: number;
  coluna?: string;
}

// 📥 Buscar todas as indisponibilidades
export const getIndisponibilidades = () => api.get("/indisponibilidade");

// ➕ Criar nova indisponibilidade
export const criarIndisponibilidade = (dados: IndisponibilidadePayload) =>
  api.post("/indisponibilidade", dados);

// ✏️ Atualizar uma indisponibilidade
export const atualizarIndisponibilidade = (id: number, dados: Partial<IndisponibilidadePayload>) =>
  api.put(`/indisponibilidade/${id}`, dados);

// ❌ Apagar uma indisponibilidade
export const apagarIndisponibilidade = (id: number) =>
  api.delete(`/indisponibilidade/${id}`);
