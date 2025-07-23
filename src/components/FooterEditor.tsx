import { useEffect, useState } from "react";
import { getFooter, updateFooter, FooterData } from "../services/api/footer";

// Função para rolar para o topo
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Componente de pré-visualização do footer
const FooterPreview = ({ data }: { data: FooterData }) => {
  return (
    <footer style={{ backgroundColor: "#000", color: "#fff", padding: "2rem 0" }}>
      <div className="container text-center mb-4">
        {data.logoUrl && (
          <img
            src={data.logoUrl}
            alt="Logo"
            style={{ maxHeight: "80px", marginBottom: "1rem" }}
          />
        )}
        {data.phrase && <p className="fst-italic">{data.phrase}</p>}
      </div>

      <div className="container d-flex flex-wrap justify-content-around text-start text-md-start text-center">
        {[data.sectionEmpresa, data.sectionLinks].map((section, idx) => (
          <div key={idx} className="mb-3 col-12 col-md-auto">
            <h5 className="fw-bold">{section.title}</h5>
            {section.links.map((link, i) => (
              <div key={i}>
                <a
                  href={link.url}
                  onClick={scrollToTop}
                  className="text-white text-decoration-none d-block"
                >
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        ))}

        <div className="mb-3 col-12 col-md-auto">
          <h5 className="fw-bold">{data.sectionContactos.title}</h5>
          {data.sectionContactos.content.map((line, i) => (
            <p key={i} className="mb-1">{line}</p>
          ))}
        </div>
      </div>

      <hr style={{ borderColor: "#444" }} className="my-4" />

      <div className="container d-flex justify-content-between align-items-center flex-wrap text-center text-md-start">
        <small className="w-100 w-md-auto mb-2 mb-md-0">{data.copyright}</small>
        <div className="d-flex gap-3 justify-content-center w-100 w-md-auto">
          {data.socialMedia.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-5"
              onClick={scrollToTop}
            >
              {s.platform.toLowerCase().includes("instagram") && <i className="bi bi-instagram"></i>}
              {s.platform.toLowerCase().includes("tiktok") && <i className="bi bi-tiktok"></i>}
              {!["instagram", "tiktok"].includes(s.platform.toLowerCase()) && s.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const FooterEditor = () => {
  const [data, setData] = useState<FooterData>({
    logoUrl: "",
    phrase: "",
    sectionEmpresa: { title: "Empresa", links: [] },
    sectionLinks: { title: "Links Úteis", links: [] },
    sectionContactos: { title: "Contactos", content: [] },
    socialMedia: [],
    copyright: "",
  });

  useEffect(() => {
    getFooter()
      .then(setData)
      .catch(() => alert("❌ Erro ao carregar dados do footer."));
  }, []);

  const handleInput = (
    section: keyof FooterData,
    key: string,
    value: any
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleLinkChange = (
    section: "sectionEmpresa" | "sectionLinks",
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    const updatedLinks = [...data[section].links];
    updatedLinks[index][field] = value;
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], links: updatedLinks },
    }));
  };

  const handleSave = async () => {
    try {
      await updateFooter(data);
      alert("✅ Footer atualizado com sucesso!");
    } catch {
      alert("❌ Erro ao atualizar o footer.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">Edição do Footer</h2>

      {/* Logo via URL */}
      <div className="mb-4">
        <label className="form-label">URL do Logo</label>
        <input
          type="text"
          className="form-control"
          placeholder="https://exemplo.com/logo.png"
          value={data.logoUrl}
          onChange={(e) =>
            setData((prev) => ({ ...prev, logoUrl: e.target.value }))
          }
        />
      </div>

      {/* Frase */}
      <div className="mb-4">
        <label className="form-label">Frase</label>
        <textarea
          className="form-control"
          rows={2}
          value={data.phrase}
          onChange={(e) =>
            setData((prev) => ({ ...prev, phrase: e.target.value }))
          }
        />
      </div>

      {/* Empresa & Links Úteis */}
      {(["sectionEmpresa", "sectionLinks"] as const).map((section) => (
        <div key={section} className="mb-4">
          <h5 className="fw-bold">{data[section].title}</h5>
          <input
            type="text"
            className="form-control mb-2"
            value={data[section].title}
            onChange={(e) => handleInput(section, "title", e.target.value)}
          />
          {data[section].links.map((link, idx) => (
            <div className="d-flex gap-2 mb-2" key={idx}>
              <input
                className="form-control"
                placeholder="Texto"
                value={link.label}
                onChange={(e) =>
                  handleLinkChange(section, idx, "label", e.target.value)
                }
              />
              <input
                className="form-control"
                placeholder="URL"
                value={link.url}
                onChange={(e) =>
                  handleLinkChange(section, idx, "url", e.target.value)
                }
              />
            </div>
          ))}
          <button
            className="btn btn-sm btn-secondary mt-2"
            onClick={() =>
              setData((prev) => ({
                ...prev,
                [section]: {
                  ...prev[section],
                  links: [...prev[section].links, { label: "", url: "" }],
                },
              }))
            }
          >
            ➕ Adicionar Link
          </button>
        </div>
      ))}

      {/* Contactos */}
      <div className="mb-4">
        <h5 className="fw-bold">{data.sectionContactos.title}</h5>
        <input
          type="text"
          className="form-control mb-2"
          value={data.sectionContactos.title}
          onChange={(e) =>
            handleInput("sectionContactos", "title", e.target.value)
          }
        />
        {data.sectionContactos.content.map((line, i) => (
          <textarea
            key={i}
            className="form-control mb-2"
            rows={2}
            value={line}
            onChange={(e) => {
              const updated = [...data.sectionContactos.content];
              updated[i] = e.target.value;
              setData((prev) => ({
                ...prev,
                sectionContactos: {
                  ...prev.sectionContactos,
                  content: updated,
                },
              }));
            }}
          />
        ))}
        <button
          className="btn btn-sm btn-secondary"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              sectionContactos: {
                ...prev.sectionContactos,
                content: [...prev.sectionContactos.content, ""],
              },
            }))
          }
        >
          ➕ Adicionar Linha
        </button>
      </div>

      {/* Redes Sociais */}
      <div className="mb-4">
        <h5 className="fw-bold">Redes Sociais</h5>
        {data.socialMedia.map((media, i) => (
          <div className="d-flex gap-2 mb-2" key={i}>
            <input
              className="form-control"
              placeholder="Plataforma (ex: Instagram)"
              value={media.platform}
              onChange={(e) => {
                const updated = [...data.socialMedia];
                updated[i].platform = e.target.value;
                setData((prev) => ({ ...prev, socialMedia: updated }));
              }}
            />
            <input
              className="form-control"
              placeholder="URL"
              value={media.url}
              onChange={(e) => {
                const updated = [...data.socialMedia];
                updated[i].url = e.target.value;
                setData((prev) => ({ ...prev, socialMedia: updated }));
              }}
            />
          </div>
        ))}
        <button
          className="btn btn-sm btn-secondary"
          onClick={() =>
            setData((prev) => ({
              ...prev,
              socialMedia: [...prev.socialMedia, { platform: "", url: "" }],
            }))
          }
        >
          ➕ Adicionar Rede Social
        </button>
      </div>

      {/* Copyright */}
      <div className="mb-4">
        <label className="form-label">Texto do Rodapé Inferior (Copyright)</label>
        <textarea
          className="form-control"
          rows={2}
          value={data.copyright}
          onChange={(e) =>
            setData((prev) => ({ ...prev, copyright: e.target.value }))
          }
        />
      </div>

      <button className="btn btn-success mt-4" onClick={handleSave}>
        💾 Guardar Alterações
      </button>

      {/* Preview do Footer */}
      <div className="mt-5">
        <h4 className="fw-bold mb-3">🔍 Pré-visualização do Footer</h4>
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
          <FooterPreview data={data} />
        </div>
      </div>
    </div>
  );
};

export default FooterEditor;
