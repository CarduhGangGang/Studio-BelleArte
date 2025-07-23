import { useEffect, useState } from "react";
import axios from "../services/api/api";
import { toast } from "react-toastify";

interface BannerData {
  title: string;
  image: string;
}

const Banner2Editor = () => {
  const [banner, setBanner] = useState<BannerData>({ title: "", image: "" });
  const [file, setFile] = useState<File | null>(null);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fullImageUrl = (url: string) =>
    url.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  useEffect(() => {
    axios
      .get("/banner/about-us")
      .then((res) => setBanner(res.data))
      .catch(() => toast.error("❌ Erro ao carregar o banner da página Sobre Nós."));
  }, []);

  const handleUpload = async () => {
    if (!file) return;

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
        setBanner((prev) => ({ ...prev, image: imagePath }));
        toast.success("🖼️ Imagem enviada com sucesso!");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao enviar imagem.");
    }
  };

  const handleSave = async () => {
    try {
      await axios.put("/banner/about-us", banner);
      toast.success("✅ Banner atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao salvar o banner.");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="mb-3 fw-bold">Edição do Banner - Sobre Nós</h3>

      <div className="mb-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={banner.title}
          onChange={(e) =>
            setBanner((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Upload da Imagem</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button onClick={handleUpload} className="btn btn-outline-primary mt-2">
          Enviar Imagem
        </button>
      </div>

      {/* Preview */}
      {banner.image && (
        <div className="my-4 border rounded overflow-hidden position-relative">
          <div
            style={{
              minHeight: "300px",
              backgroundImage: `url(${fullImageUrl(banner.image)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.5)",
            }}
          />
          <div className="position-absolute top-50 start-50 translate-middle text-white text-center">
            <h2 className="fw-bold">{banner.title}</h2>
            <p>Pré-visualização</p>
          </div>
        </div>
      )}

      <button className="btn btn-success" onClick={handleSave}>
        💾 Salvar Banner
      </button>
    </div>
  );
};

export default Banner2Editor;
