import api from "./api";

export const getQuoteSection = async () => {
  const res = await api.get("/quote-section");
  console.log("Resposta da API:", res.data); 
  return res.data;
};

export const updateQuoteSection = async (data: {
  title: string;
  subtitle: string;
  author?: string;
}) => {
  const res = await api.put("/quote-section", data);
  return res.data;
};
