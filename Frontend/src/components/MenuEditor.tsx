import { useEffect, useState } from "react";
import { getMenuData, updateMenuData } from "../services/api/menu";
import { toast } from "react-toastify";

interface MenuItem {
  key: string;
  label: string;
  link: string;
  visible: boolean;
}

const MenuEditor = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [titles, setTitles] = useState<MenuItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMenuData();
        setLogoUrl(data.logoUrl);
        setTitles(data.titles);
      } catch {
        toast.error("❌ Erro ao carregar menu");
      }
    };
    load();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateMenuData({ logoUrl, titles });
      toast.success("✅ Menu salvo com sucesso!");
    } catch {
      toast.error("❌ Erro ao salvar alterações");
    }
  };

  const handleChange = (index: number, field: keyof MenuItem, value: string | boolean) => {
    setTitles((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleAddItem = () => {
    const key = `item-${Date.now()}`;
    setTitles((prev) => [...prev, { key, label: "", link: "", visible: true }]);
  };

  const handleRemoveItem = (index: number) => {
    setTitles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4">
      <h4 className="mb-4">🧭 Editor de Menu</h4>

      <label className="form-label">🖼️ URL do Logo</label>
      <input
        className="form-control mb-4"
        type="text"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
        placeholder="https://exemplo.com/logo.png"
      />

      {titles.map((item, index) => (
        <div key={item.key} className="row align-items-center mb-3">
          <div className="col-md-3">
            <label className="form-label">Texto</label>
            <input
              type="text"
              className="form-control"
              value={item.label}
              onChange={(e) => handleChange(index, "label", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Link</label>
            <input
              type="text"
              className="form-control"
              value={item.link}
              onChange={(e) => handleChange(index, "link", e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label d-block">Visível</label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={item.visible}
              onChange={(e) => handleChange(index, "visible", e.target.checked)}
            />
          </div>
          <div className="col-md-3">
            <button
              type="button"
              className="btn btn-outline-danger mt-4"
              onClick={() => handleRemoveItem(index)}
            >
              🗑️ Remover
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-outline-primary" onClick={handleAddItem}>
          ➕ Adicionar Item
        </button>
        <button className="btn btn-success" onClick={handleUpdate}>
          💾 Salvar Menu
        </button>
      </div>
    </div>
  );
};

export default MenuEditor;
