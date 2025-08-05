import { useEffect, useState } from "react";
import { getMenuData, updateMenuData } from "../services/api/menu";
import { toast } from "react-toastify";

const MenuEditor = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMenuData();
        setLogoUrl(data.logoUrl);
        setTitles(data.titles);
      } catch {
        toast.error("Erro ao carregar menu");
      }
    };
    load();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateMenuData({ logoUrl, titles });
      toast.success("Salvo com sucesso!");
    } catch {
      toast.error("Erro ao salvar alterações");
    }
  };

  return (
    <div className="p-4">
      <h4>Editor de Menu</h4>

      <label>Logo URL</label>
      <input
        className="form-control mb-3"
        type="text"
        value={logoUrl}
        onChange={(e) => setLogoUrl(e.target.value)}
      />

      {titles.map((item, index) => (
        <div key={item.key} className="row mb-2">
          <div className="col">
            <input
              className="form-control"
              type="text"
              value={item.label}
              onChange={(e) => {
                const newTitles = [...titles];
                newTitles[index].label = e.target.value;
                setTitles(newTitles);
              }}
            />
          </div>
          <div className="col">
            <input
              className="form-control"
              type="text"
              value={item.link}
              onChange={(e) => {
                const newTitles = [...titles];
                newTitles[index].link = e.target.value;
                setTitles(newTitles);
              }}
            />
          </div>
        </div>
      ))}

      <button className="btn btn-success mt-3" onClick={handleUpdate}>
        Salvar
      </button>
    </div>
  );
};

export default MenuEditor;
