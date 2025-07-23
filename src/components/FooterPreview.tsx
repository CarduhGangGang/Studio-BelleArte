import { FooterData } from "../services/api/footer";

interface Props {
  data: FooterData;
}

const FooterPreview = ({ data }: Props) => {
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

      <div className="container d-flex flex-wrap justify-content-around text-start">
        {[data.sectionEmpresa, data.sectionLinks].map((section, idx) => (
          <div key={idx} className="mb-3">
            <h5 className="fw-bold">{section.title}</h5>
            {section.links.map((link, i) => (
              <div key={i}>
                <a href={link.url} className="text-white text-decoration-none d-block">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        ))}

        <div>
          <h5 className="fw-bold">{data.sectionContactos.title}</h5>
          {data.sectionContactos.content.map((line, i) => (
            <p key={i} className="mb-1">{line}</p>
          ))}
        </div>
      </div>

      <hr style={{ borderColor: "#444" }} className="my-4" />

      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <small>{data.copyright}</small>
        <div className="d-flex gap-3">
          {data.socialMedia.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.platform === "Instagram" && <i className="bi bi-instagram"></i>}
              {s.platform === "TikTok" && <i className="bi bi-tiktok"></i>}
              {/* Adicione outros ícones conforme necessário */}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterPreview;
