import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../services/api/api";

interface TeamMember {
  id?: number;
  name: string;
  role: string;
  imageUrl: string;
}

interface TeamSectionConfig {
  title: string;
  description: string;
}

const API_BASE = import.meta.env.VITE_API_URL;
const fullImageUrl = (url: string) => {
  if (!url) return `${API_BASE}/uploads/fallback.jpg`;
  return url.startsWith("http")
    ? url
    : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
};

const TeamEditor = () => {
  const [list, setList] = useState<TeamMember[]>([]);
  const [section, setSection] = useState<TeamSectionConfig>({
    title: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [fileInputs, setFileInputs] = useState<(File | null)[]>([]);

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      const [membersRes, sectionRes] = await Promise.all([
        axios.get("/team/members"),
        axios.get("/team/section"),
      ]);
      setList(membersRes.data);
      setFileInputs(membersRes.data.map(() => null));
      setSection(sectionRes.data);
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

  const handleImageUpload = async (i: number) => {
    const file = fileInputs[i];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imagePath = res.data?.url;
      handleChange(i, "imageUrl", imagePath);
      toast.success("Imagem carregada com sucesso!");
    } catch {
      toast.error("Erro ao enviar imagem");
    }
  };

  const add = () => {
    setList((prev) => [...prev, { name: "", role: "", imageUrl: "" }]);
    setFileInputs((prev) => [...prev, null]);
  };

  const remove = (i: number) => {
    const member = list[i];
    const name = member?.name || "este membro";

    if (window.confirm(`Tem certeza que deseja remover ${name}?`)) {
      if (member?.id) {
        axios
          .delete(`/team/members/${member.id}`)
          .then(() => toast.success("Removido"))
          .catch(() => toast.error("Erro ao remover membro"));
      }
      setList((prev) => prev.filter((_, idx) => idx !== i));
      setFileInputs((prev) => prev.filter((_, idx) => idx !== i));
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const member of list) {
        if (!member.name || !member.role || !member.imageUrl) {
          toast.warn("Todos os campos dos membros são obrigatórios");
          setSaving(false);
          return;
        }

        if (member.id) {
          await axios.put(`/team/members/${member.id}`, member);
        } else {
          await axios.post("/team/members", member);
        }
      }

      if (!section.title.trim() || !section.description.trim()) {
        toast.warn("Título e descrição são obrigatórios");
        setSaving(false);
        return;
      }

      await axios.put("/team/section", section);
      toast.success("Equipa atualizada com sucesso");
      await loadTeamData();
    } catch {
      toast.error("Erro ao guardar dados");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4">Edição da Equipa</h3>

      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Título da Secção"
          value={section.title}
          onChange={(e) => setSection({ ...section, title: e.target.value })}
        />
        <textarea
          className="form-control"
          placeholder="Descrição da Secção"
          value={section.description}
          onChange={(e) =>
            setSection({ ...section, description: e.target.value })
          }
        />
      </div>

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
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFileInputs((prev) => {
                  const updated = [...prev];
                  updated[i] = file;
                  return updated;
                });
              }}
            />
            <button
              className="btn btn-sm btn-outline-primary mt-1"
              onClick={() => handleImageUpload(i)}
            >
              Enviar imagem
            </button>
          </div>
          <div className="col-md-2">
            <img
              src={fullImageUrl(member.imageUrl)}
              alt="Preview"
              style={{ width: 60, height: 60, objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `${API_BASE}/uploads/fallback.jpg`;
              }}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-danger" onClick={() => remove(i)}>
              ✕
            </button>
          </div>
        </div>
      ))}

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
