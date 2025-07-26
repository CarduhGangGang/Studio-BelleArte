import { useEffect, useState } from "react";
import {
  getServicos,
  createServico,
  updateServico,
  deleteServico,
  getServicesSection,
  updateServicesSection,
  ServicoData,
} from "../services/api/servico";

const initialForm: ServicoData = {
  nome: "",
  descricao: "",
  preco: 0,
  duracao: 0,
  image: null,
  imageUrl: "",
};

const ServicesSliderEditor = () => {
  const [servicos, setServicos] = useState<ServicoData[]>([]);
  const [form, setForm] = useState<ServicoData>(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSubtitle, setSectionSubtitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const loadServicos = async () => {
    const data = await getServicos();
    setServicos(data);
  };

  const loadSection = async () => {
    const section = await getServicesSection();
    setSectionTitle(section.title || "");
    setSectionSubtitle(section.subtitle || "");
    setSectionDescription(section.description || "");
  };

  useEffect(() => {
    loadServicos();
    loadSection();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const parsed = ["duracao", "preco"].includes(name) ? parseFloat(value) || 0 : value;
    setForm((prev) => ({ ...prev, [name]: parsed }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verifica tipo da imagem
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecione um ficheiro de imagem válido.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      image: file,
      imageUrl: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateServico(editId, form);
        alert("Serviço atualizado com sucesso.");
      } else {
        await createServico(form);
        alert("Serviço criado com sucesso.");
      }

      setForm(initialForm);
      setEditId(null);
      await loadServicos();
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      alert("Erro ao salvar serviço.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (servico: ServicoData) => {
    setForm({
      nome: servico.nome,
      descricao: servico.descricao || "",
      preco: servico.preco,
      duracao: servico.duracao,
      image: null,
      imageUrl: servico.imageUrl || "",
    });
    setEditId(servico.id!);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      await deleteServico(id);
      await loadServicos();
    }
  };

  const handleSectionUpdate = async () => {
    try {
      await updateServicesSection({
        title: sectionTitle,
        subtitle: sectionSubtitle,
        description: sectionDescription,
      });
      alert("Cabeçalho atualizado com sucesso!");
    } catch {
      alert("Erro ao atualizar cabeçalho.");
    }
  };

  const handleSaveAll = async () => {
    await handleSectionUpdate();
    if (form.nome) {
      await handleSubmit(new Event("submit") as any);
    }
  };

  const getImage = (url?: string) =>
    url?.startsWith("http") ? url : `${API_BASE.replace(/\/$/, "")}/${url?.replace(/^\//, "")}`;

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Edição de Services Slider</h2>
        <button className="btn btn-primary" onClick={handleSaveAll} disabled={loading}>
          💾 Guardar Tudo
        </button>
      </div>

      {/* Cabeçalho da seção */}
      <div className="mb-5 bg-light p-4 rounded shadow-sm">
        <h5 className="mb-3">Texto do Cabeçalho</h5>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subtítulo</label>
          <input
            type="text"
            className="form-control"
            value={sectionSubtitle}
            onChange={(e) => setSectionSubtitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            className="form-control"
            rows={3}
            value={sectionDescription}
            onChange={(e) => setSectionDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Formulário de serviço */}
      <form onSubmit={handleSubmit} className="mb-5 p-4 border rounded bg-white shadow-sm">
        <h5 className="mb-3">{editId ? "Editar Serviço" : "Adicionar Novo Serviço"}</h5>

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleInputChange}
            className="form-control"
            rows={3}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Duração (min)</label>
            <input
              type="number"
              name="duracao"
              value={form.duracao}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Preço (€)</label>
            <input
              type="number"
              name="preco"
              value={form.preco}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagem</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          {form.imageUrl && (
            <div className="mt-2 d-inline-block position-relative">
              <img
                src={getImage(form.imageUrl)}
                alt="Preview"
                className="rounded border"
                style={{ width: "150px", height: "100px", objectFit: "cover" }}
              />
              <button
                type="button"
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                onClick={() => setForm((prev) => ({ ...prev, image: null, imageUrl: "" }))}
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Salvando..." : editId ? "Atualizar" : "Criar"}
          </button>
          {editId && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditId(null);
                setForm(initialForm);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de serviços existentes */}
      <div className="row">
        {servicos.map((servico) => (
          <div className="col-md-4 mb-4" key={servico.id}>
            <div className="card h-100 shadow-sm border-0">
              <img
                src={getImage(servico.imageUrl)}
                className="card-img-top"
                alt={servico.nome}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{servico.nome}</h5>
                <p className="card-text text-muted">{servico.descricao}</p>
                <p className="card-text">
                <strong>Duração:</strong> {servico.duracao} min <br />
                <strong>Preço:</strong> €{!isNaN(Number(servico.preco)) ? Number(servico.preco).toFixed(2) : "0.00"}
                </p>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(servico)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(servico.id!)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSliderEditor;
