import { useEffect, useState } from "react";
import { getQuoteSection, updateQuoteSection } from "../services/api/quoteSection";
import { motion } from "framer-motion";
import { toast } from "sonner";

const HomeCardsEditor = () => {
  const [form, setForm] = useState<null | {
    title: string;
    subtitle: string;
    author: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getQuoteSection()
      .then((data) => setForm(data))
      .catch(() => toast.error("Erro ao carregar a secção de citação"));
  }, []);

  const handleChange = (field: "title" | "subtitle" | "author", value: string) => {
    if (!form) return;
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    if (!form) return;
    setLoading(true);
    try {
      await updateQuoteSection(form);
      setMessage("✅ Secção atualizada com sucesso.");
      toast.success("Citação atualizada!");
    } catch {
      setMessage("❌ Erro ao atualizar a citação.");
      toast.error("Erro ao atualizar.");
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <p>🔄 A carregar citação...</p>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="mb-4">Edição da Citação</h4>

      {/* Preview da Citação */}
      <motion.div
        className="text-white mb-4 rounded text-center"
        style={{ backgroundColor: "#000", padding: "30px 20px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <i className="flaticon-barber text-3xl mb-2 block"></i>
        <h2 className="text-xl font-bold">{form.title}</h2>
        <p className="mt-2 text-sm font-medium">
          {form.subtitle} — {form.author}
        </p>
      </motion.div>

      {message && <div className="alert alert-info py-2 mb-3">{message}</div>}

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

      <div className="mb-3">
        <label className="form-label">📜 Subtítulo</label>
        <textarea
          rows={3}
          className="form-control"
          value={form.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          placeholder="Ex: A excelência, portanto..."
        />
      </div>

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
