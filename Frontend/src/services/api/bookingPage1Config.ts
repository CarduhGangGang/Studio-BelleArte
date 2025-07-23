import api from "./api"; 

// Buscar configuração atual da página de marcação
export const getBookingConfig = async () => {
  const response = await api.get("/booking-page-1-config");
  return response.data;
};

// Atualizar os textos personalizados da página de marcação
export const updateBookingConfig = async (data: {
  titulo: string;
  descricao: string;
  label_servico: string;
  label_colaborador: string;
  label_data: string;
  label_hora_disponivel: string;
  btn_agendar: string;
}) => {
  const response = await api.put("/booking-page-1-config", data);
  return response.data;
};
