import api from "../api/api"; 

export interface ServiceItem {
  name: string;
  desc: string;
  img: string;
}

export interface ServicePageData {
  title: string;
  description: string;
  services: ServiceItem[];
}

// ✅ Buscar dados da página de serviços
export const getServicePageData = async (): Promise<ServicePageData> => {
  const res = await api.get("/service-list");
  return res.data;
};

// ✅ Salvar os dados da página de serviços
export const saveServicePageData = async (data: ServicePageData) => {
  return api.post("/service-list", data);
};
