import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  TeamMember,
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamImage,
  getTeamSectionConfig,
  updateTeamSectionConfig,
  TeamSectionConfig,
} from "../services/api/team";

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
      const [members, sectionData] = await Promise.all([
        getTeamMembers(),
        getTeamSectionConfig(),
      ]);
      setList(members);
      setSection(sectionData);
    } catch (err) {
      toast.error("Erro ao carregar dados da equipa");
    }
  };

  const handleChange = (i: number, field: keyof TeamMember, value: string) => {
    setList((prev) => {
      const newList = [...prev];
      newList[i] = { ...newList[i], [field]: value };
      return newList;
    });
  };

  const handleImageChange = async (i: number, file: File) => {
    try {
      const url = await uploadTeamImage(file);
      const fullUrl = url.startsWith("http")
        ? url
        : `${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"}${url}`;
      handleChange(i, "imageUrl", fullUrl);
      toast.success("Imagem carregada!");
    } catch (err) {
      console.error("❌ Erro ao enviar imagem:", err);
      toast.error("Erro ao fazer upload da imagem");
    }
  };

  const add = () => {
    setList((prev) => [...prev, { name: "", role: "", imageUrl: "" }]);
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
    }
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      for (const member of list) {
        if (!member.name.trim() || !member.role.trim() || !member.imageUrl.trim()) {
          toast.warn("Todos os campos dos membros são obrigatórios");
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
        toast.warn("Título e descrição da secção são obrigatórios");
        setSaving(false);
        return;
      }

      await updateTeamSectionConfig({
        title: section.title.trim(),
        description: section.description.trim(),
      });

      toast.success("Equipa atualizada com sucesso");
      await loadTeamData();
    } catch (err) {
      console.error("❌ Erro ao guardar equipa:", err);
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
            {member.imageUrl && (
              <img
                src={member.imageUrl}
                alt="Preview"
                style={{ width: 60, height: 60, objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/60?text=Erro";
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
