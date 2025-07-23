import React, { useEffect, useState } from "react";
import {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  uploadImage,
} from "../services/api/homeSlider";
import { toast } from "react-toastify";

interface Slide {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  order: number;
}

const HomeSliderEditor = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(false);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const fullImageUrl = (url: string) =>
    url.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  const fetchSlides = async () => {
    setLoading(true);
    try {
      const data = await getSlides();
      if (Array.isArray(data)) {
        setSlides(data);
        preloadImages(data.map((s) => fullImageUrl(s.imageUrl)));
      } else {
        toast.error("Erro: dados inválidos");
      }
    } catch {
      toast.error("Erro ao carregar slides");
    } finally {
      setLoading(false);
    }
  };

  const preloadImages = (urls: string[]) => {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleInputChange = (
    index: number,
    field: keyof Slide,
    value: string
  ) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      toast.error("❌ Tipo de imagem inválido.");
      return;
    }

    try {
      const uploadedUrl = await uploadImage(file);
      const updated = [...slides];
      updated[index].imageUrl = uploadedUrl;
      setSlides(updated);
      preloadImages([fullImageUrl(uploadedUrl)]);
      toast.success("Imagem enviada!");
    } catch {
      toast.error("Erro ao enviar imagem.");
    }
  };

  const handleAddSlide = () => {
    if (slides.length >= 3) {
      toast.warning("Máximo de 3 slides.");
      return;
    }

    const newSlide: Slide = {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      order: slides.length,
    };
    setSlides((prev) => [...prev, newSlide]);
    setActivePreviewIndex(slides.length);
  };

  const handleSaveSlide = async (index: number) => {
    const slide = slides[index];

    if (!slide.title || !slide.subtitle || !slide.description || !slide.imageUrl) {
      toast.error("Preenche todos os campos.");
      return;
    }

    try {
      if (slide.id) {
        await updateSlide(slide.id, slide);
      } else {
        const saved = await createSlide(slide);
        const updated = [...slides];
        updated[index] = saved;
        setSlides(updated);
      }
      toast.success("Slide salvo!");
    } catch {
      toast.error("Erro ao salvar slide.");
    }
  };

  const handleDeleteSlide = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Deseja apagar este slide?")) return;

    try {
      await deleteSlide(id);
      fetchSlides();
      toast.success("Slide apagado.");
    } catch {
      toast.error("Erro ao apagar slide.");
    }
  };

  const activeSlide = slides[activePreviewIndex];

  return (
    <div className="container-fluid py-4">
      <h4 className="mb-4">Edição de Slides da Home</h4>
      {loading && <p className="text-muted">⏳ Carregando slides...</p>}

      <div className="row g-4">
        {/* Editor */}
        <div className="col-12 col-md-5">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`card shadow-sm mb-4 ${
                activePreviewIndex === index ? "border-primary border-2" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <h6>Slide #{index + 1}</h6>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => setActivePreviewIndex(index)}
                  >
                    👁️ Preview
                  </button>
                </div>

                {["title", "subtitle", "description"].map((field) => (
                  <div className="mb-2" key={field}>
                    <label className="form-label text-capitalize fw-semibold">
                      {field}
                    </label>
                    {field === "description" ? (
                      <textarea
                        className="form-control"
                        rows={2}
                        value={slide[field]}
                        onChange={(e) =>
                          handleInputChange(index, field as keyof Slide, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        className="form-control"
                        value={slide[field]}
                        onChange={(e) =>
                          handleInputChange(index, field as keyof Slide, e.target.value)
                        }
                      />
                    )}
                  </div>
                ))}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Imagem</label>
                  {slide.imageUrl && (
                    <img
                      src={fullImageUrl(slide.imageUrl)}
                      className="img-fluid rounded mb-2"
                      style={{ maxHeight: 160, objectFit: "cover" }}
                      alt="preview"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => handleImageUpload(e, index)}
                  />
                </div>

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveSlide(index)}
                  >
                    💾 Salvar
                  </button>
                  {slide.id && (
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleDeleteSlide(slide.id)}
                    >
                      🗑️ Apagar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button
            className="btn btn-primary mt-2 w-100"
            onClick={handleAddSlide}
            disabled={slides.length >= 3}
          >
            ➕ Novo Slide
          </button>
        </div>

        {/* Preview */}
        <div className="col-12 col-md-7">
          {activeSlide ? (
            <div
              className="rounded shadow position-relative overflow-hidden"
              style={{
                height: "500px",
                backgroundImage: `url(${fullImageUrl(activeSlide.imageUrl)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              ></div>

              <div
                className="d-flex align-items-center h-100"
                style={{ position: "relative", zIndex: 1, padding: "1rem" }}
              >
                <div
                  className="bg-white bg-opacity-75 rounded p-4 w-100"
                  style={{ maxWidth: "600px", margin: "0 auto" }}
                >
                  <h2 className="fw-bold">{activeSlide.title}</h2>
                  <h4>{activeSlide.subtitle}</h4>
                  <p>{activeSlide.description}</p>
                  <div className="d-flex gap-2 flex-wrap mt-3">
                    <button className="btn btn-warning text-white fw-bold">
                      Contacte-nos
                    </button>
                    <button className="btn btn-outline-warning fw-bold">
                      Sobre Nós
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-muted">Nenhum slide selecionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSliderEditor;
