import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFooter } from "../services/api/footer";
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const iconMap: Record<string, JSX.Element> = {
  instagram: <FaInstagram />,
  twitter: <FaTwitter />,
  tiktok: <FaTiktok />,
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Footer = () => {
  const [config, setConfig] = useState<any>(null);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    getFooter()
      .then(setConfig)
      .catch(() => {
        console.error("Erro ao carregar dados do footer.");
      });
  }, []);

  const getImage = (url: string) =>
    url?.startsWith("http") ? url : `${API_BASE}/${url.replace(/^\/?/, "")}`;

  if (!config) return null;

  return (
    <footer style={{ backgroundColor: "#1c1c1c" }} className="text-white py-5">
      <div className="container">
        {/* Seções principais */}
        <div className="row justify-content-center text-center text-md-start">
          {/* Logo e Frase */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start mb-4">
            {config.logoUrl && (
              <img
                src={getImage(config.logoUrl)}
                alt="Logo"
                style={{ maxHeight: "100px", objectFit: "contain" }}
              />
            )}
            <p className="mt-3 fst-italic">{config.phrase}</p>
          </div>

          {/* Empresa */}
          <div className="col-12 col-md-2 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h6 className="text-uppercase fw-bold">{config.sectionEmpresa?.title}</h6>
            <ul className="list-unstyled">
              {config.sectionEmpresa?.links?.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    to={link.url}
                    onClick={scrollToTop}
                    className="text-white text-decoration-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Úteis */}
          <div className="col-12 col-md-2 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h6 className="text-uppercase fw-bold">{config.sectionLinks?.title}</h6>
            <ul className="list-unstyled">
              {config.sectionLinks?.links?.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link
                    to={link.url}
                    onClick={scrollToTop}
                    className="text-white text-decoration-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contactos */}
          <div className="col-12 col-md-4 d-flex flex-column align-items-center align-items-md-start mb-4">
            <h6 className="text-uppercase fw-bold">{config.sectionContactos?.title}</h6>
            {config.sectionContactos?.content?.map((line: string, idx: number) => (
              <p key={idx} className="mb-1">{line}</p>
            ))}
          </div>
        </div>

        {/* Separador */}
        <hr className="my-4 border-secondary" />

        {/* Rodapé inferior */}
        <div className="d-flex justify-content-between align-items-center flex-column flex-md-row text-center text-md-start">
          <p className="m-0 mb-3 mb-md-0">
            {config?.copyright ||
              `© ${new Date().getFullYear()} Studio BelleArte. Todos os direitos reservados.`}
          </p>

          <div className="d-flex gap-3">
            {config.socialMedia?.map((media: any, i: number) => (
              <a
                key={i}
                href={media.url}
                target="_blank"
                rel="noreferrer"
                className="text-white fs-5"
                title={media.platform}
              >
                {iconMap[media.platform.toLowerCase()] ?? media.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
