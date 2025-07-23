import api from "./api";

// Interface para um item da tabela de preços
export interface PricingItem {
  id?: number;
  title: string;
  duration: string;
  price: string;
}

// Interface para resposta do GET completo (com título + lista)
export interface PricingData {
  title: string;
  items: PricingItem[];
}

// GET - Buscar título e todos os serviços de preçário
export const getAllPricingData = async (): Promise<PricingData> => {
  const response = await api.get<PricingData>("/pricing");
  return {
    title: response.data.title || "Tabela de Preços",
    items: response.data.items || [],
  };
};

// PUT - Atualizar título e itens em lote
export const updatePricingData = async (data: PricingData): Promise<void> => {
  await api.put("/pricing", data);
};

// POST - Criar um novo item
export const createPricing = async (
  item: Omit<PricingItem, "id">
): Promise<void> => {
  await api.post("/pricing/items", item);
};

// PUT - Atualizar item existente
export const updatePricing = async (
  id: number,
  item: Omit<PricingItem, "id">
): Promise<void> => {
  await api.put(`/pricing/items/${id}`, item);
};

// DELETE - Remover item
export const deletePricing = async (id: number): Promise<void> => {
  await api.delete(`/pricing/items/${id}`);
};
