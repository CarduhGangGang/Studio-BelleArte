import { useEffect, useState } from "react";
import { getMenuData, updateMenuData } from "../services/api/menu";
import { toast } from "react-toastify";
import Sortable from "react-sortablejs";

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
        setTitles(data.titles || []);
      } catch {
        toast.error("❌ Erro ao carregar menu");
      }
    };
    load();
  }, []);

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

  const handleUpdate = async () => {
    if (!logoUrl.trim()) {
      toast.warning("⚠️ Preencha o URL do logo.");
      return;
    }

    const hasEmpty = titles.some(
      (item) => !item.label.trim() || !item.link.trim()
    );
    if (hasEmpty) {
      toast.warning("⚠️ Preencha todos os campos de texto e link.");
      return;
    }

    try {
      await updateMenuData({ logoUrl, titles });
      toast.success("✅ Menu salvo com sucesso!");
    } catch {
      toast.error("❌ Erro ao salvar alterações");
    }
  };

  const onSort = (order: string[]) => {
    const sorted = order.map((key) => titles.find((item) => item.key === key)!);
    setTitles(sorted);
  };

  return (
    <div className="p-4">
      <h4 className="mb-4">🧭 Editor de Menu</h4>

      <div className="mb-4">
        <label htmlFor="logoUrlInput" className="form-label">🖼️ URL do Logo</label>
        <input
          id="logoUrlInput"
          name="logoUrl"
          className="form-control"
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://exemplo.com/logo.png"
        />
        {logoUrl && (
          <img
            src={logoUrl}
            alt="Preview do Logo"
            className="mt-3 rounded border"
            style={{ maxWidth: "200px", maxHeight: "80px" }}
          />
        )}
      </div>

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h5 className="m-0">Itens do Menu</h5>
        <button className="btn btn-outline-primary btn-sm" onClick={handleAddItem}>
          ➕ Adicionar Item
        </button>
      </div>

      <Sortable
        tag="div"
        list={titles}
        setList={setTitles}
        onChange={(order) => onSort(order)}
      >
        {titles.map((item, index) => (
          <div
            key={item.key}
            data-id={item.key}
            className="row align-items-end mb-3 border rounded p-3 bg-light"
          >
            <div className="col-md-3">
              <label htmlFor={`label-${item.key}`} className="form-label">Texto</label>
              <input
                id={`label-${item.key}`}
                name={`label-${item.key}`}
                type="text"
                className="form-control"
                value={item.label}
                onChange={(e) => handleChange(index, "label", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor={`link-${item.key}`} className="form-label">Link</label>
              <input
                id={`link-${item.key}`}
                name={`link-${item.key}`}
                type="text"
                className="form-control"
                value={item.link}
                onChange={(e) => handleChange(index, "link", e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <div className="form-check mt-4">
                <input
                  id={`visible-${item.key}`}
                  name={`visible-${item.key}`}
                  type="checkbox"
                  className="form-check-input"
                  checked={item.visible}
                  onChange={(e) => handleChange(index, "visible", e.target.checked)}
                />
                <label className="form-check-label" htmlFor={`visible-${item.key}`}>
                  Visível
                </label>
              </div>
            </div>
            <div className="col-md-3 text-end">
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
      </Sortable>

      <div className="text-end mt-4">
        <button className="btn btn-success" onClick={handleUpdate}>
          💾 Salvar Menu
        </button>
      </div>
    </div>
  );
};

export default MenuEditor;
