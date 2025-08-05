import { useEffect, useState } from "react";
import Menu from "../element/Menu";
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
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuData();
        setLogoUrl(data.logoUrl || "");
        setItems(data.titles || []);
      } catch {
        toast.error("❌ Erro ao carregar dados do menu");
      }
    };

    fetchData();
  }, []);

  const saveChanges = async () => {
    const hasEmpty = items.some((item) => !item.label.trim() || !item.link.trim());
    if (!logoUrl.trim()) {
      toast.error("⚠️ URL do logo está vazia.");
      return;
    }

    if (hasEmpty) {
      toast.error("⚠️ Todos os campos devem estar preenchidos.");
      return;
    }

    try {
      await updateMenuData({ logoUrl, titles: items });
      toast.success("💾 Menu salvo com sucesso!");
    } catch {
      toast.error("❌ Erro ao salvar alterações");
    }
  };

  const updateItem = (index: number, field: keyof MenuItem, value: any) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([
      ...items,
      { key: `item-${Date.now()}`, label: "", link: "", visible: true },
    ]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="container mt-4">
      <h2>Editor de Menu</h2>

      <div className="mb-4">
        <label className="form-label fw-semibold">🌐 URL do Logo</label>
        <input
          type="text"
          className="form-control"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://meu-site.com/logo.png"
        />
      </div>

      <div className="mb-4">
        <h5>📝 Itens do Menu</h5>
        {items.map((item, index) => (
          <div className="row mb-3" key={item.key}>
            <div className="col-md-3">
              <input
                type="text"
                className={`form-control ${!item.label.trim() ? "is-invalid" : ""}`}
                placeholder="Texto"
                value={item.label}
                onChange={(e) => updateItem(index, "label", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className={`form-control ${!item.link.trim() ? "is-invalid" : ""}`}
                placeholder="/url"
                value={item.link}
                onChange={(e) => updateItem(index, "link", e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label className="form-check-label me-2">Visível</label>
              <input
                type="checkbox"
                className="form-check-input"
                checked={item.visible}
                onChange={() => updateItem(index, "visible", !item.visible)}
              />
            </div>
            <div className="col-md-3">
              <button className="btn btn-outline-danger" onClick={() => removeItem(index)}>
                🗑️ Remover
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-sm btn-secondary" onClick={addItem}>
          ➕ Adicionar item
        </button>
      </div>

      <button className="btn btn-success" onClick={saveChanges}>
        💾 Salvar Menu
      </button>

      <hr />
      <h5>🔍 Pré-visualização</h5>
      <Menu isAdmin logoUrl={logoUrl} customTitles={items} />
    </div>
  );
};

export default MenuEditor;
