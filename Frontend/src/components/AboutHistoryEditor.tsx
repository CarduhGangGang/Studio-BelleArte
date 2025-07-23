import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { getAboutHistory, updateAboutHistory, AboutHistory } from "../services/api/history";

const defaultData: AboutHistory = {
  title: "Nossa História",
  description: "A Studio BelleArte nasceu da paixão por transformar o cuidado masculino em uma verdadeira arte...",
};

const AboutHistoryEditor = () => {
  const [data, setData] = useState<AboutHistory>(defaultData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAboutHistory()
      .then(setData)
      .catch(() => toast.warn("⚠️ Erro ao carregar texto da história."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field: keyof AboutHistory, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateAboutHistory(data);
      toast.success("✅ Conteúdo atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao salvar conteúdo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  // Animações alternadas por linha
  const renderAnimatedLines = (text: string) => {
    return text.split("\n").map((line, index) => (
      <motion.p
        key={index}
        initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="text-gray-700 text-lg leading-relaxed"
      >
        {line}
      </motion.p>
    ));
  };

  return (
    <div className="container py-4">
      <h3 className="mb-4 fw-bold">Edição - Nossa História</h3>

      <div className="mb-3">
        <label className="form-label fw-semibold">Título</label>
        <input
          className="form-control"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Descrição</label>
        <textarea
          className="form-control"
          rows={5}
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <button className="btn btn-success" onClick={handleSave} disabled={saving}>
        {saving ? "Salvando..." : "💾 Guardar"}
      </button>

      <hr className="my-5" />

      <h5 className="fw-bold">🔍 Pré-visualização</h5>
      <div
        className="section-full content-inner overlay-white-middle mt-3 p-4 border rounded"
        style={{
          backgroundImage: `url(/images/background/bg2.png), url(/images/banner/banner2.jpg)`,
          backgroundPosition: "bottom, top",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          opacity: 0.95,
        }}
      >
        <div className="container">
          <div className="section-head text-black text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-black m-b10"
            >
              {data.title}
            </motion.h2>

            <motion.div
              className="dlab-separator-outer m-b4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-[2px] bg-gold mx-auto my-4" />
            </motion.div>

            <div className="text-start">
              {renderAnimatedLines(data.description)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHistoryEditor;
