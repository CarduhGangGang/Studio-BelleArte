import { useEffect, useState } from "react";
import {
  getPortfolioSection,
  updatePortfolioSection,
  getPortfolioImages,
  uploadPortfolioImage,
  deletePortfolioImage,
} from "../services/api/portfolio";

export default function OurPortfolioEditor() {
  const [section, setSection] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const [images, setImages] = useState<{ id: number; imageUrl: string }[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const getImage = (url?: string) =>
    url?.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url?.replace(/^\//, "")}`;

  useEffect(() => {
    getPortfolioSection()
      .then(setSection)
      .catch(() => alert("Erro ao carregar a secção"));

    getPortfolioImages()
      .then(setImages)
      .catch(() => alert("Erro ao carregar imagens"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSection((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
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

  const handleUpload = async () => {
    if (!files.length) return;

    try {
      for (const file of files) {
        await uploadPortfolioImage({ image: file });
      }
      setFiles([]);
      const updated = await getPortfolioImages();
      setImages(updated);
    } catch {
      alert("❌ Erro ao carregar imagens.");
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
        <h5 className="mb-3">📸 Upload de Imagens</h5>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="form-control mb-2"
        />
        <button
          className="btn btn-success"
          onClick={handleUpload}
          disabled={!files.length}
        >
          📤 Upload Imagem{files.length > 1 ? "s" : ""}
        </button>
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
