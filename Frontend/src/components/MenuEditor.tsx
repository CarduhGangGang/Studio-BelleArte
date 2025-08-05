import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Menu from "../element/Menu";
import { useLogo } from "../context/LogoContext";
import { toast } from "react-toastify";
import {
  getMenuData,
  updateMenuData,
} from "../services/api/menu";

interface MenuItem {
  key: string;
  label: string;
  link: string;
  visible: boolean;
}

const MenuEditor = () => {
  const { setLogoUrl } = useLogo();
  const [preview, setPreview] = useState<string>("");
  const [titles, setTitles] = useState<MenuItem[]>([]);
  const [originalTitles, setOriginalTitles] = useState<MenuItem[]>([]);
  const [originalLogo, setOriginalLogo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuData();
        const currentLogo = data.logoUrl || "";
        setPreview(currentLogo);
        setLogoUrl(currentLogo);
        setOriginalLogo(currentLogo);
        setTitles(data.titles || []);
        setOriginalTitles(data.titles || []);
      } catch {
        toast.error("❌ Erro ao carregar dados do menu");
      }
    };

    fetchData();
  }, [setLogoUrl]);

  const handleSaveLogoOnly = async () => {
    try {
      await updateMenuData({ logoUrl: preview, titles: originalTitles });
      setOriginalLogo(preview);
      setLogoUrl(preview);
      toast.success("🖼️ Logo salvo com sucesso!");
    } catch {
      toast.error("❌ Erro ao salvar o logo");
    }
  };

  const handleSaveChanges = async () => {
    const hasEmpty = titles.some((item) => item.label.trim() === "");
    if (hasEmpty) {
      toast.error("⚠️ Todos os títulos devem estar preenchidos.");
      return;
    }

    try {
      await updateMenuData({ logoUrl: preview, titles });
      setOriginalTitles(titles);
      setOriginalLogo(preview);
      setLogoUrl(preview);
      toast.success("💾 Alterações salvas com sucesso!");
    } catch {
      toast.error("❌ Erro ao salvar alterações");
    }
  };

  const handleReset = () => {
    setTitles(originalTitles);
    setPreview(originalLogo);
    setLogoUrl(originalLogo);
    toast.info("↩️ Menu restaurado ao estado inicial.");
  };

  const hasLogoChanged = preview !== originalLogo;
  const hasTitlesChanged =
    JSON.stringify(titles) !== JSON.stringify(originalTitles);
  const hasAnyChanges = hasLogoChanged || hasTitlesChanged;

  return (
    <motion.div
      className="bg-white rounded shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ padding: "0", minHeight: "100%", overflow: "visible" }}
    >
      {/* Menu Preview com logo atual */}
      <div
        className="border-bottom bg-white w-100 py-4"
        style={{
          minHeight: "80px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
        }}
      >
        <Menu isAdmin logoUrl={preview} customTitles={titles} />
      </div>

      <div className="p-4">
        <h4 className="mb-4">Edição do Menu</h4>

        {/* CAMPO DE TEXTO PARA URL DO LOGO */}
        <div className="mb-4">
          <label className="form-label fw-semibold">🌐 URL do Logo</label>
          <input
            type="text"
            className="form-control"
            placeholder="https://exemplo.com/logo.png"
            value={preview}
            onChange={(e) => setPreview(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            className="btn btn-outline-primary"
            onClick={handleSaveLogoOnly}
            disabled={!hasLogoChanged}
          >
            💾 Salvar somente o logo
          </button>
        </div>

        <h5 className="mb-3">📝 Itens do Menu</h5>

        {titles.map((item, index) => (
          <div className="row align-items-center mb-3" key={item.key}>
            <div className="col-md-4">
              <input
                type="text"
                className={`form-control ${!item.label.trim() ? "is-invalid" : ""}`}
                value={item.label}
                onChange={(e) => {
                  const updated = [...titles];
                  updated[index].label = e.target.value;
                  setTitles(updated);
                }}
              />
            </div>

            <div className="col-md-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={item.visible}
                onChange={() => {
                  const updated = [...titles];
                  updated[index].visible = !updated[index].visible;
                  setTitles(updated);
                }}
              />{" "}
              Visível
            </div>

            <div className="col-md-3 d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                disabled={index === 0}
                onClick={() => {
                  const updated = [...titles];
                  [updated[index - 1], updated[index]] = [
                    updated[index],
                    updated[index - 1],
                  ];
                  setTitles(updated);
                }}
              >
                ⬆️
              </button>
              <button
                className="btn btn-outline-secondary"
                disabled={index === titles.length - 1}
                onClick={() => {
                  const updated = [...titles];
                  [updated[index + 1], updated[index]] = [
                    updated[index],
                    updated[index + 1],
                  ];
                  setTitles(updated);
                }}
              >
                ⬇️
              </button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-3 mt-4 flex-wrap">
          <button
            className="btn btn-success"
            onClick={handleSaveChanges}
            disabled={!hasAnyChanges}
          >
            💾 Salvar alterações
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={handleReset}
            disabled={!hasAnyChanges}
          >
            ↩️ Restaurar original
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuEditor;
