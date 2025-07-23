import api from "./api";

// Interface para tipar os dados da configuração
export interface BookingPage3Config {
  titulo: string;
  descricao: string;
  texto_botao: string;
}

// Buscar configuração da página 3
export const getBookingPage3Config = async (): Promise<BookingPage3Config> => {
  const res = await api.get("/booking-page-3-config");
  return res.data;
};

// Atualizar a configuração da página 3
export const updateBookingPage3Config = async (
  data: BookingPage3Config
): Promise<BookingPage3Config> => {
  const res = await api.put("/booking-page-3-config", data);
  return res.data;
};
