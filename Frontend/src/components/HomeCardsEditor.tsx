import { useEffect, useState } from "react";
import { getQuoteSection, updateQuoteSection } from "../services/api/quoteSection";
import { motion } from "framer-motion";
import { toast } from "sonner";

const HomeCardsEditor = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    author: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuoteSection()
      .then((data) => {
        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          author: data.author || "",
          imageUrl: data.imageUrl || "",
        });
      })
      .catch(() => toast.error("❌ Erro ao carregar a citação."));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.subtitle.trim() || !form.author.trim()) {
      toast.warning("⚠️ Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await updateQuoteSection(form);
      toast.success("✅ Citação atualizada com sucesso!");
    } catch {
      toast.error("❌ Erro ao atualizar a citação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="mb-4 fw-bold">📝 Editor de Citação</h4>

      {/* Preview da citação */}
      <motion.div
        className="text-white mb-4 rounded text-center"
        style={{ backgroundColor: "#000", padding: "30px 20px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Citação"
            style={{ maxHeight: "120px", objectFit: "contain", marginBottom: "10px" }}
            onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
          />
        )}
        <h2 className="text-xl fw-bold">{form.title || "Título da citação..."}</h2>
        <p className="mt-2 text-sm">
          {form.subtitle || "Subtítulo aqui..."} — <em>{form.author || "Autor..."}</em>
        </p>
      </motion.div>

      {/* Campo: URL da imagem */}
      <div className="mb-3">
        <label className="form-label">🖼️ URL da imagem (opcional)</label>
        <input
          type="text"
          className="form-control"
          value={form.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          placeholder="https://example.com/imagem.png"
        />
      </div>

      {/* Campo: Título */}
      <div className="mb-3">
        <label className="form-label">📝 Título</label>
        <input
          type="text"
          className="form-control"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Ex: Somos o que repetidamente fazemos"
        />
      </div>

      {/* Campo: Subtítulo */}
      <div className="mb-3">
        <label className="form-label">📜 Subtítulo</label>
        <textarea
          rows={3}
          className="form-control"
          value={form.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          placeholder="Ex: A excelência, portanto, não é um ato, mas um hábito"
        />
      </div>

      {/* Campo: Autor */}
      <div className="mb-3">
        <label className="form-label">✍️ Autor</label>
        <input
          type="text"
          className="form-control"
          value={form.author}
          onChange={(e) => handleChange("author", e.target.value)}
          placeholder="Ex: Aristóteles"
        />
      </div>

      <button
        className="btn btn-dark"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "💾 A guardar..." : "💾 Guardar alterações"}
      </button>
    </div>
  );
};

export default HomeCardsEditor;
