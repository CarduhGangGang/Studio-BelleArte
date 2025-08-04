import api from "./api";

// 🔹 Tipos
export interface TeamMember {
  id?: number;
  name: string;
  role: string;
  imageUrl: string;
}

export interface TeamSectionConfig {
  title: string;
  description: string;
}

// 🔸 Obter membros
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const res = await api.get("/team");
    return res.data;
  } catch (error) {
    console.error("❌ Erro ao obter membros da equipa:", error);
    throw error;
  }
};

// 🔸 Criar membro
export const createTeamMember = async (data: TeamMember): Promise<TeamMember> => {
  try {
    const res = await api.post("/team", data);
    return res.data;
  } catch (error) {
    console.error("❌ Erro ao criar membro:", error);
    throw error;
  }
};

// 🔸 Atualizar membro
export const updateTeamMember = async (id: number, data: TeamMember): Promise<TeamMember> => {
  try {
    const res = await api.put(`/team/${id}`, data);
    return res.data;
  } catch (error) {
    console.error(`❌ Erro ao atualizar membro com ID ${id}:`, error);
    throw error;
  }
};

// 🔸 Apagar membro
export const deleteTeamMember = async (id: number): Promise<void> => {
  try {
    await api.delete(`/team/${id}`);
  } catch (error) {
    console.error(`❌ Erro ao apagar membro com ID ${id}:`, error);
    throw error;
  }
};

// 🔹 Obter configuração da secção
export const getTeamSectionConfig = async (): Promise<TeamSectionConfig> => {
  try {
    const res = await api.get("/team/section");
    return res.data;
  } catch (error) {
    console.error("❌ Erro ao obter configuração da secção:", error);
    throw error;
  }
};

// 🔹 Atualizar configuração da secção
export const updateTeamSectionConfig = async (
  data: TeamSectionConfig
): Promise<TeamSectionConfig> => {
  if (!data.title?.trim() || !data.description?.trim()) {
    throw new Error("Título e descrição são obrigatórios.");
  }

  try {
    const res = await api.put("/team/section", {
      title: data.title.trim(),
      description: data.description.trim(),
    });
    return res.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar configuração da secção:", error);
    throw error;
  }
};

// 🔹 Upload de imagem do membro
export const uploadTeamImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.post("/team/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const url = res.data?.url;
    if (!url) {
      throw new Error("URL não retornada pelo servidor");
    }

    // Garante que a URL é absoluta
    const base = import.meta.env.VITE_API_URL;
    return url.startsWith("http") ? url : `${base}${url}`;
  } catch (error) {
    console.error("❌ Erro no upload da imagem:", error);
    throw error;
  }
};
