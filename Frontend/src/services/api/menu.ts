import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/menu`;

export interface MenuItem {
  key: string;
  label: string;
  link: string;
  visible: boolean;
}

export interface MenuData {
  logoUrl: string;
  titles: MenuItem[];
}

// 📥 GET: Buscar dados do menu (inclui logo por URL)
export const getMenuData = async (): Promise<MenuData> => {
  const { data } = await axios.get<MenuData>(API_URL);
  return data;
};

// 💾 POST: Atualizar dados do menu (logo + títulos)
export const updateMenuData = async (data: MenuData): Promise<MenuData> => {
  const response = await axios.post<MenuData>(API_URL, data);
  return response.data;
};
