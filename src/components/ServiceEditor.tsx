import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../services/api/api";

import {
  getServicePageData,
  saveServicePageData,
  ServiceItem,
  ServicePageData,
} from "../services/api/service2";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
const fullImageUrl = (path: string) =>
  path.startsWith("http") ? path : `${API_BASE}/${path.replace(/^\/+/, "")}`;

const ServiceEditor = () => {
  const [data, setData] = useState<ServicePageData>({
    title: "",
    description: "",
    services: [],
  });

  const [loading, setLoading] = useState(false);

  // Carregar dados da API
  useEffect(() => {
    setLoading(true);
    getServicePageData()
      .then((res) => setData(res))
      .catch((err) => {
        toast.error("❌ Erro ao carregar serviços.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Alterações nos campos
  const handleInputChange = (
    index: number,
    field: keyof ServiceItem,
    value: string
  ) => {
    const updated = [...data.services];
    updated[index][field] = value;
    setData((prev) => ({ ...prev, services: updated }));
  };

  const handleTitleChange = (value: string) =>
    setData((prev) => ({ ...prev, title: value }));

  const handleDescriptionChange = (value: string) =>
    setData((prev) => ({ ...prev, description: value }));

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updated = [...data.services];
      updated[index].img = res.data.url;
      setData((prev) => ({ ...prev, services: updated }));
      toast.success("✅ Imagem enviada!");
    } catch {
      toast.error("❌ Erro ao enviar imagem.");
    }
  };

  const handleSave = async () => {
    try {
      await saveServicePageData(data);
      toast.success("💾 Alterações salvas com sucesso!");
    } catch (err) {
      toast.error("❌ Erro ao salvar alterações.");
      console.error(err);
    }
  };

  const handleAddService = () => {
    const newService: ServiceItem = {
      name: "",
      desc: "",
      img: "",
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const handleRemoveService = (index: number) => {
    const confirmDelete = confirm("Deseja mesmo remover este serviço?");
    if (!confirmDelete) return;

    const updated = [...data.services];
    updated.splice(index, 1);
    setData((prev) => ({ ...prev, services: updated }));
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Edição da Página de Serviços</h3>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          {/* Título e descrição */}
          <div className="card mb-4 p-3 shadow-sm">
            <div className="mb-3">
              <label className="form-label">Título da Página</label>
              <input
                type="text"
                className="form-control"
                value={data.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descrição da Página</label>
              <textarea
                className="form-control"
                rows={3}
                value={data.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
              />
            </div>
          </div>

          {/* Lista de serviços */}
          {data.services.map((item, index) => (
            <div key={index} className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="fw-bold">Serviço #{index + 1}</h5>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleRemoveService(index)}
                  >
                    🗑️ Remover
                  </button>
                </div>

                <div className="mb-3 mt-3">
                  <label className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={item.desc}
                    onChange={(e) =>
                      handleInputChange(index, "desc", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  {item.img && (
                    <img
                      src={fullImageUrl(item.img)}
                      className="img-fluid mb-2 rounded"
                      style={{ maxHeight: 200 }}
                      alt={`Preview ${item.name}`}
                    />
                  )}
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary" onClick={handleAddService}>
              ➕ Adicionar Novo Serviço
            </button>

            <button className="btn btn-success" onClick={handleSave}>
              💾 Salvar Tudo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceEditor;
