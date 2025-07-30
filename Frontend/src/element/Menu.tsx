import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { logoutUser } from "../utils/auth";
import { toast } from "react-toastify";
import { getMenuData } from "../services/api/menu";
import { useLogo } from "../context/LogoContext";

interface MenuItem {
  key: string;
  label: string;
  link: string;
  visible: boolean;
}

interface MenuProps {
  hideLogo?: boolean;
  isAdmin?: boolean;
  customTitles?: MenuItem[];
  logoUrl?: string;
}

const Menu = ({
  hideLogo = false,
  isAdmin = false,
  customTitles,
  logoUrl: logoUrlProp,
}: MenuProps) => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [resolvedLogo, setResolvedLogo] = useState<string>(IMAGE.logoBlack);
  const [header, setHeader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logoUrl: contextLogoUrl, setLogoUrl: updateLogoContext } = useLogo();

  const path = location.pathname;
  const API_BASE = import.meta.env.VITE_API_URL;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const tipo = localStorage.getItem("tipo") as
      | "admin"
      | "studio"
      | "cliente";
    const prevPath = sessionStorage.getItem("prevPath");
    const privatePaths = ["/admin", "/studio", "/booking"];

    if (
      prevPath &&
      privatePaths.includes(prevPath) &&
      !privatePaths.includes(path) &&
      tipo
    ) {
      logoutUser(tipo);
      toast.info("👋 Sessão terminada automaticamente", {
        position: "top-center",
        autoClose: 2000,
      });
    }

    sessionStorage.setItem("prevPath", path);
  }, [path]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (customTitles) {
          setMenuItems(customTitles);
        } else {
          const data = await getMenuData();
          setMenuItems(data.titles || []);
        }
      } catch {
        toast.error("❌ Erro ao carregar menu.");
      }
    };

    fetchMenu();
  }, [customTitles]);

  useEffect(() => {
    const selectedLogo = contextLogoUrl || logoUrlProp || IMAGE.logoBlack;
    const fullLogo = selectedLogo.startsWith("/uploads")
      ? `${API_BASE}${selectedLogo}`
      : selectedLogo;

    setResolvedLogo(fullLogo);
    updateLogoContext(fullLogo);
  }, [contextLogoUrl, logoUrlProp, API_BASE, updateLogoContext]);

  useEffect(() => {
    const handleScroll = () => setHeader(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goldenColor = "#C8A047";

  const renderMenuItem = (item: MenuItem) => {
    if (!item.visible && !isAdmin) return null;

    return (
      <li key={item.key} className={`nav-item px-2 ${path === item.link ? "active" : ""}`}>
        {isAdmin ? (
          <span className="nav-link" style={{ color: goldenColor }}>
            {item.label}
          </span>
        ) : (
          <Link
            to={item.link}
            className="nav-link"
            style={{ color: goldenColor }}
            onClick={() => {
              scrollToTop();
              setIsMenuOpen(false);
            }}
          >
            {item.label}
          </Link>
        )}
      </li>
    );
  };

  return (
    <div className={`sticky-header main-bar-wraper navbar-expand-lg ${header ? "is-fixed" : ""} fade-in`}>
      <div className="main-bar clearfix">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center py-2 position-relative">
            {/* Logo mobile (esquerda) */}
            {!hideLogo && (
              <div
                className="logo-header d-lg-none"
                style={{
                  marginLeft: "-20px",
                  marginTop: "15px",
                  marginRight: "auto",
                }}
              >
                {isAdmin ? (
                  <div>
                    <img
                      src={resolvedLogo}
                      alt="Studio BelleArte"
                      style={{
                        height: "60px",
                        objectFit: "contain",
                        cursor: "default",
                      }}
                    />
                  </div>
                ) : (
                  <Link to="/" className="d-block">
                    <img
                      src={resolvedLogo}
                      alt="Studio BelleArte"
                      style={{ height: "60px", objectFit: "contain" }}
                    />
                  </Link>
                )}
              </div>
            )}

            {/* Botão menu mobile */}
            <button
              className="navbar-toggler d-lg-none ms-auto"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                fontSize: "1.5rem",
                border: "none",
                background: "transparent",
                color: goldenColor,
              }}
            >
              <i className={`fa ${isMenuOpen ? "fa-times" : "fa-bars"}`} />
            </button>

            {/* Logo desktop */}
            {!hideLogo && (
              <div
                className="d-none d-lg-flex justify-content-center w-100 position-absolute"
                style={{ left: 0, right: 0 }}
              >
                {isAdmin ? (
                  <div>
                    <img
                      src={resolvedLogo}
                      alt="Studio BelleArte"
                      style={{
                        height: "70px",
                        objectFit: "contain",
                        cursor: "default",
                        marginLeft: "12px",
                        marginTop: "45px",
                      }}
                    />
                  </div>
                ) : (
                  <Link to="/" className="d-block">
                    <img
                      src={resolvedLogo}
                      alt="Studio BelleArte"
                      style={{
                        height: "70px",
                        objectFit: "contain",
                        marginLeft: "12px",
                        marginTop: "90px",
                      }}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Menu */}
          <div
            className={`header-nav navbar-collapse justify-content-between mt-0.5 ${
              isMenuOpen ? "show d-block" : "d-none d-lg-flex"
            }`}
          >
            <ul className="nav navbar-nav flex-column flex-lg-row align-items-start align-items-lg-center">
              {menuItems.slice(0, 3).map(renderMenuItem)}
            </ul>

            <ul className="nav navbar-nav flex-column flex-lg-row align-items-start align-items-lg-center">
              {menuItems.slice(3).map(renderMenuItem)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
