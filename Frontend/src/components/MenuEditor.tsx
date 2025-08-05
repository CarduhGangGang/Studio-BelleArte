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
        toast.error("Erro ao carregar menu");
      }
    };
    fetchData();
  }, []);

  const saveChanges = async () => {
    try {
      await updateMenuData({ logoUrl, titles: items });
      toast.success("Menu atualizado com sucesso!");
    } catch {
      toast.error("Erro ao salvar alterações");
    }
  };

  const updateItem = (index: number, field: keyof MenuItem, value: any) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    const newItem: MenuItem = {
      key: `item-${Date.now()}`,
      label: "",
      link: "",
      visible: true,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  return (
    <div className="container mt-4">
      <h2>Editor de Menu</h2>

      <div className="mb-3">
        <label className="form-label">Logo URL</label>
        <input
          type="text"
          className="form-control"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
      </div>

      {items.map((item, i) => (
        <div className="row mb-2" key={item.key}>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="Label"
              value={item.label}
              onChange={(e) => updateItem(i, "label", e.target.value)}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="/link"
              value={item.link}
              onChange={(e) => updateItem(i, "link", e.target.value)}
            />
          </div>
          <div className="col-2">
            <input
              type="checkbox"
              checked={item.visible}
              onChange={() => updateItem(i, "visible", !item.visible)}
            />
            <span className="ms-2">Visível</span>
          </div>
          <div className="col-3">
            <button className="btn btn-danger btn-sm" onClick={() => removeItem(i)}>
              Remover
            </button>
          </div>
        </div>
      ))}

      <button className="btn btn-secondary btn-sm mb-3" onClick={addItem}>
        ➕ Adicionar item
      </button>

      <div>
        <button className="btn btn-primary" onClick={saveChanges}>
          💾 Salvar
        </button>
      </div>

      <hr />
      <h4>Pré-visualização</h4>
      <Menu isAdmin logoUrl={logoUrl} customTitles={items} />
    </div>
  );
};

export default MenuEditor;
