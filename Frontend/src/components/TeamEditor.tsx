import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../services/api/api";
import {
  TeamMember,
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamSectionConfig,
  updateTeamSectionConfig,
  TeamSectionConfig,
} from "../services/api/team";

const API_BASE = import.meta.env.VITE_API_URL;

const fullImageUrl = (url: string) =>
  url.startsWith("http") ? url : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

const fallbackFromBackend = () => {
  const rand = Math.floor(Math.random() * 5) + 1;
  return `${API_BASE}/uploads/fallbacks/fallback${rand}.jpg`;
};

const TeamEditor = () => {
  const [list, setList] = useState<TeamMember[]>([]);
  const [section, setSection] = useState<TeamSectionConfig>({ title: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      const [members, sectionData] = await Promise.all([
        getTeamMembers(),
        getTeamSectionConfig(),
      ]);
      setList(members);
      setPreviews(members.map((m) => fullImageUrl(m.imageUrl || fallbackFromBackend())));
      setSection(sectionData);
    } catch (err) {
      toast.error("Erro ao carregar dados da equipa");
    }
  };

  const handleChange = (i: number, field: keyof TeamMember, value: string) => {
    setList((prev) => {
      const updated = [...prev];
      updated[i] = { ...updated[i], [field]: value };
      return updated;
    });
  };

  const handleImageChange = async (i: number, file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("❌ Tipo de imagem inválido.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imagePath = res.data?.url;
      if (imagePath) {
        const full = fullImageUrl(imagePath);
        handleChange(i, "imageUrl", imagePath);
        setPreviews((prev) => {
          const updated = [...prev];
          updated[i] = full;
          return updated;
        });
        toast.success("✅ Imagem enviada com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao fazer upload da imagem:", err);
      toast.error("❌ Falha ao fazer upload");
    }
  };

  const add = () => {
    const fallback = fallbackFromBackend();
    setList((prev) => [...prev, { name: "", role: "", imageUrl: fallback }]);
    setPreviews((prev) => [...prev, fallback]);
  };

  const remove = (i: number) => {
    const member = list[i];
    const name = member?.name || "este membro";

    if (window.confirm(`Tem certeza que deseja remover ${name}?`)) {
      if (member?.id && typeof member.id === "number") {
        deleteTeamMember(member.id)
          .then(() => toast.success("Removido"))
          .catch(() => toast.error("Erro ao remover membro"));
      }
      setList((prev) => prev.filter((_, idx) => idx !== i));
      setPreviews((prev) => prev.filter((_, idx) => idx !== i));
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const member of list) {
        if (!member.name.trim() || !member.role.trim() || !member.imageUrl.trim()) {
          toast.warn("⚠️ Todos os campos dos membros são obrigatórios");
          setSaving(false);
          return;
        }

        if (typeof member.id === "number") {
          await updateTeamMember(member.id, member);
        } else {
          await createTeamMember(member);
        }
      }

      if (!section.title.trim() || !section.description.trim()) {
        toast.warn("⚠️ Título e descrição da secção são obrigatórios");
        setSaving(false);
        return;
      }

      await updateTeamSectionConfig({
        title: section.title.trim(),
        description: section.description.trim(),
      });

      toast.success("✅ Equipa atualizada com sucesso");
      await loadTeamData();
    } catch (err) {
      console.error("Erro ao guardar equipa:", err);
      toast.error("❌ Erro ao guardar dados");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Edição da Equipa</h3>

      {/* Secção da equipa */}
      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Título da Secção"
          value={section.title}
          onChange={(e) =>
            setSection((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          className="form-control"
          placeholder="Descrição da Secção"
          rows={3}
          value={section.description}
          onChange={(e) =>
            setSection((prev) => ({ ...prev, description: e.target.value }))
          }
        />
      </div>

      {/* Membros da equipa */}
      {list.map((member, i) => (
        <div key={member.id ?? i} className="row mb-3 align-items-center">
          <div className="col-md-3">
            <input
              placeholder="Nome"
              className="form-control"
              value={member.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              placeholder="Função"
              className="form-control"
              value={member.role}
              onChange={(e) => handleChange(i, "role", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                e.target.files?.[0] && handleImageChange(i, e.target.files[0])
              }
            />
          </div>
          <div className="col-md-2">
            {previews[i] && (
              <img
                src={previews[i]}
                alt="Preview"
                style={{ width: 60, height: 60, objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = fallbackFromBackend();
                }}
              />
            )}
          </div>
          <div className="col-md-1">
            <button className="btn btn-danger" onClick={() => remove(i)}>
              ✕
            </button>
          </div>
        </div>
      ))}

      {/* Ações */}
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={add}>
          + Adicionar membro
        </button>
        <button
          className="btn btn-success"
          onClick={saveAll}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar tudo"}
        </button>
      </div>
    </div>
  );
};

export default TeamEditor;
