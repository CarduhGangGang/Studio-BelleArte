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

  useEffect(() => {
    loadTeamData();
  }, []);

  const loadTeamData = async () => {
    try {
      const [membersRes, sectionRes] = await Promise.all([
        axios.get("/team"),
        axios.get("/team/section"),
      ]);
      setList(membersRes.data);
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

  const add = () => {
    setList((prev) => [...prev, { name: "", role: "", imageUrl: "" }]);
  };

  const remove = (i: number) => {
    const member = list[i];
    const name = member?.name || "este membro";

    if (window.confirm(`Tem certeza que deseja remover ${name}?`)) {
      if (member?.id && typeof member.id === "number") {
        axios
          .delete(`/team/${member.id}`)
          .then(() => toast.success("Removido"))
          .catch(() => toast.error("Erro ao remover membro"));
      }
      setList((prev) => prev.filter((_, idx) => idx !== i));
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
          await axios.put(`/team/${member.id}`, member);
        } else {
          await axios.post("/team", member);
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

      {/* Secção da equipa */}
      <div className="mb-4">
        <label htmlFor="team-title" className="form-label">Título da Secção</label>
        <input
          id="team-title"
          name="team-title"
          className="form-control mb-2"
          placeholder="Título da Secção"
          value={section.title}
          onChange={(e) => setSection({ ...section, title: e.target.value })}
        />

        <label htmlFor="team-description" className="form-label">Descrição da Secção</label>
        <textarea
          id="team-description"
          name="team-description"
          className="form-control"
          placeholder="Descrição da Secção"
          value={section.description}
          onChange={(e) =>
            setSection({ ...section, description: e.target.value })
          }
        />
      </div>

      {/* Membros da equipa */}
      {list.map((member, i) => (
        <div key={member.id ?? i} className="row mb-3 align-items-center">
          <div className="col-md-3">
            <label htmlFor={`name-${i}`} className="form-label">Nome</label>
            <input
              id={`name-${i}`}
              name={`name-${i}`}
              placeholder="Nome"
              className="form-control"
              value={member.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor={`role-${i}`} className="form-label">Função</label>
            <input
              id={`role-${i}`}
              name={`role-${i}`}
              placeholder="Função"
              className="form-control"
              value={member.role}
              onChange={(e) => handleChange(i, "role", e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <label htmlFor={`imageUrl-${i}`} className="form-label">URL da Imagem</label>
            <input
              id={`imageUrl-${i}`}
              name={`imageUrl-${i}`}
              placeholder="https://exemplo.com/imagem.jpg"
              className="form-control"
              value={member.imageUrl}
              onChange={(e) => handleChange(i, "imageUrl", e.target.value)}
            />
          </div>

          <div className="col-md-2">
            {member.imageUrl && (
              <img
                src={fullImageUrl(member.imageUrl)}
                alt="Preview"
                style={{ width: 60, height: 60, objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `${API_BASE}/uploads/fallback.jpg`;
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
