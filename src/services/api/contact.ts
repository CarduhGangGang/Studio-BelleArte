import axios from "./api";

export interface ContactSectionConfig {
  title: string;
  subtitle: string; // 🔁 Corrigido de "description"
  whatsappNumber: string;
  address: string;
  email: string;
  phone: string;
  mapsEmbedUrl: string;
}

// 🔹 GET config
export const getContactSectionConfig = async (): Promise<ContactSectionConfig> => {
  const response = await axios.get("/contact-section");
  return response.data;
};

// 🔹 PUT update config
export const updateContactSectionConfig = async (
  config: ContactSectionConfig
): Promise<ContactSectionConfig> => {
  const response = await axios.put("/contact-section", config);
  return response.data;
};
