import api from "./api";

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  title: string;
  content: string[];
}

export interface SocialMedia {
  platform: string;
  url: string;
}

export interface FooterData {
  logoUrl: string;
  phrase: string;
  sectionEmpresa: FooterSection;
  sectionLinks: FooterSection;
  sectionContactos: FooterContact;
  socialMedia: SocialMedia[];
  copyright: string;
}

export const getFooter = async (): Promise<FooterData> => {
  try {
    const res = await api.get<FooterData>("/footer");
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar o footer:", error);
    throw error;
  }
};

export const updateFooter = async (data: FooterData): Promise<void> => {
  try {
    await api.put("/footer", data);
  } catch (error) {
    console.error("Erro ao atualizar o footer:", error);
    throw error;
  }
};
