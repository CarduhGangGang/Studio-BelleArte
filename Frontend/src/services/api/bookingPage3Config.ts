import api from "./api";

// Interface para os dados da configuração
export interface BookingPage3Config {
  id?: number;
  titulo: string;
  descricao: string;
  texto_botao: string;
  createdAt?: string;
  updatedAt?: string;
}

// Buscar a configuração da página 3
export const getBookingPage3Config = async (): Promise<BookingPage3Config> => {
  const response = await api.get<BookingPage3Config>("/booking-page-3-config");
  return response.data;
};

// Atualizar a configuração da página 3
export const updateBookingPage3Config = async (
  data: BookingPage3Config
): Promise<BookingPage3Config> => {
  const response = await api.put<BookingPage3Config>("/booking-page-3-config", data);
  return response.data;
};
