import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getAllPricingData,
  updatePricingData,
  deletePricing,
  PricingData,
  PricingItem,
} from "../services/api/pricing";

const PricingEditor = () => {
  const [data, setData] = useState<PricingData>({ title: "", items: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllPricingData();
        setData(res);
      } catch {
        toast.error("⚠️ Erro ao carregar dados do preçário");
      }
    })();
  }, []);

  const handleItemChange = (index: number, field: keyof PricingItem, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const handleAdd = () => {
    setData({
      ...data,
      items: [...data.items, { title: "", duration: "", price: "" }],
    });
  };

  const handleDelete = async (index: number) => {
    const item = data.items[index];
    if (item.id) {
      try {
        await deletePricing(item.id);
        toast.success("🗑️ Item removido");
      } catch {
        toast.error("❌ Erro ao remover item");
        return;
      }
    }
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    if (!data.title.trim()) {
      toast.warn("⚠️ O título da tabela é obrigatório");
      return;
    }

    const hasEmpty = data.items.some(
      (item) => !item.title || !item.duration || !item.price
    );
    if (hasEmpty) {
      toast.warn("⚠️ Todos os campos dos itens são obrigatórios");
      return;
    }

    setSaving(true);
    try {
      await updatePricingData(data);
      toast.success("✅ Preçário atualizado");
    } catch (err) {
      console.error(err);
      toast.error("❌ Erro ao guardar dados");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Edição do Preçário</h3>

      <div className="mb-4">
        <label className="form-label">Título da Tabela</label>
        <input
          className="form-control"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      {data.items.map((item, index) => (
        <div key={index} className="row mb-3 g-2 align-items-center">
          <div className="col-md-4">
            <input
              className="form-control"
              value={item.title}
              placeholder="Título"
              onChange={(e) => handleItemChange(index, "title", e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              value={item.duration}
              placeholder="Duração"
              onChange={(e) => handleItemChange(index, "duration", e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              value={item.price}
              placeholder="Preço"
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <button className="btn btn-outline-danger" onClick={() => handleDelete(index)}>
              ❌
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex gap-2 mt-4 mb-5">
        <button className="btn btn-primary" onClick={handleAdd}>
          ➕ Adicionar
        </button>
        <button className="btn btn-success" onClick={handleSave} disabled={saving}>
          {saving ? "Salvando..." : "💾 Guardar Tudo"}
        </button>
      </div>

      <div className="bg-dark text-white p-4 rounded">
        <h4 className="text-center">{data.title}</h4>
        <hr style={{ borderTop: "2px solid #fff", width: "80%", margin: "auto" }} />
        <div className="row g-4 mt-3">
          {data.items.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <div>
                  <h5 className="text-white mb-1">{item.title}</h5>
                  <p className="text-light mb-0">{item.duration}</p>
                </div>
                <div className="text-end">
                  <span className="fw-bold">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingEditor;
