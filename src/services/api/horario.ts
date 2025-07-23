import api from "./api";

export interface HorarioPayload {
  dia: string;
  entrada: string;
  saida: string;
  colaborador_id: number;
}

export const getHorarios = (colaborador_id: number) =>
  api.get(`/horarios/${colaborador_id}`);

export const salvarHorarios = (
  colaborador_id: number,
  horarios: { dia: string; entrada: string; saida: string }[]
) => api.post("/horarios/salvar", { colaborador_id, horarios });
