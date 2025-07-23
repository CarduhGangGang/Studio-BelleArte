import { useEffect, useState } from "react";
import { useHeader } from "../context/HeaderContext";
import { motion } from "framer-motion";

const HeaderEditor = () => {
  const { header, updateHeader } = useHeader();
  const [localData, setLocalData] = useState({ phone: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (header) setLocalData(header);
  }, [header]);

  const handleChange = (field: "phone" | "address", value: string) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateHeader(localData);
      setMessage("✅ Alterações guardadas com sucesso.");
    } catch {
      setMessage("❌ Erro ao guardar as alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (!header) return <p>🔄 A carregar dados...</p>;

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h4 className="mb-4">Edição do Header</h4>

      {/* ✅ Preview do Header */}
      <motion.div
        className="text-white mb-4 rounded"
        style={{ backgroundColor: "#c6a661", padding: "10px 0" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container text-center">
          <ul className="list-inline d-flex flex-wrap justify-content-center align-items-center gap-4 fs-6 m-0 p-0">
            <li><i className="fa fa-phone me-2"></i>{localData.phone}</li>
            <li><i className="fa fa-map-marker me-2"></i>{localData.address}</li>
          </ul>
        </div>
      </motion.div>

      {message && <div className="alert alert-info py-2">{message}</div>}

      <div className="mb-3">
        <label className="form-label">📞 Telefone</label>
        <input
          type="text"
          className="form-control"
          value={localData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">📍 Morada</label>
        <textarea
          rows={3}
          className="form-control"
          value={localData.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "💾 A guardar..." : "💾 Guardar alterações"}
      </button>
    </div>
  );
};

export default HeaderEditor;
