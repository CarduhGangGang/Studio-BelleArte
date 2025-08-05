import { useEffect, useState } from "react";
import {
  getPortfolioSection,
  updatePortfolioSection,
  getPortfolioImages,
  uploadPortfolioImage,
  deletePortfolioImage,
} from "../services/api/portfolio";

export default function OurPortfolioEditor() {
  const [section, setSection] = useState<null | {
    title: string;
    subtitle: string;
    description: string;
  }>(null);

  const [images, setImages] = useState<{ id: number; imageUrl: string }[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL;

  const getImage = (url?: string) =>
    url?.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url?.replace(/^\//, "")}`;

  useEffect(() => {
    getPortfolioSection()
      .then((data) => {
        if (data) setSection(data);
        else console.error("❌ Nenhum dado recebido da seção.");
      })
      .catch(() => alert("Erro ao carregar a secção"));

    getPortfolioImages()
      .then(setImages)
      .catch(() => alert("Erro ao carregar imagens"));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!section) return;
    setSection((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!section) return;
    setLoading(true);
    try {
      await updatePortfolioSection(section);
      alert("✅ Seção atualizada com sucesso!");
    } catch (err) {
      alert("❌ Erro ao atualizar a seção.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadByUrl = async () => {
    if (!urlInput.trim()) return;

    try {
      await uploadPortfolioImage({ imageUrl: urlInput.trim() });
      setUrlInput("");
      const updated = await getPortfolioImages();
      setImages(updated);
    } catch {
      alert("❌ Erro ao adicionar imagem por URL.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta imagem?")) return;
    try {
      await deletePortfolioImage(id);
      const updated = await getPortfolioImages();
      setImages(updated);
    } catch {
      alert("Erro ao excluir imagem.");
    }
  };

  if (!section) return <p>🔄 A carregar secção do portfólio...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-dark">Edição do Portfólio</h2>

      <div className="mb-5 bg-light p-4 rounded shadow-sm border">
        <h5 className="mb-4">📋 Texto da Seção</h5>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="title"
            value={section.title}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subtítulo</label>
          <input
            type="text"
            name="subtitle"
            value={section.subtitle}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <textarea
            name="description"
            value={section.description}
            onChange={handleChange}
            rows={3}
            className="form-control"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "A guardar..." : "💾 Guardar Alterações"}
        </button>
      </div>

      <div className="mb-4 bg-light p-4 rounded shadow-sm border">
        <h5 className="mb-3">🔗 Adicionar Imagem por URL</h5>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="https://exemplo.com/imagem.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={handleUploadByUrl}
            disabled={!urlInput.trim()}
          >
            📤 Adicionar Imagem
          </button>
        </div>
      </div>

      <div className="row mt-4">
        {images.map((img) => (
          <div className="col-md-4 mb-3" key={img.id}>
            <div className="position-relative border rounded shadow-sm">
              <img
                src={getImage(img.imageUrl)}
                alt="Portfolio"
                className="img-fluid rounded"
                style={{
                  height: "220px",
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                onClick={() => handleDelete(img.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
