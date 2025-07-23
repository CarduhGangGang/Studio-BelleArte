import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import { logoutUser } from "../utils/auth";

const MenuCliente = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser("studio");
    navigate("/");
  };

  return (
    <header className="site-header header center mo-left" style={{ backgroundColor: "#fff", borderBottom: "1px solid #eee", zIndex: 999, padding: "10px 0" }}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Utilizador dropdown à esquerda */}
        <div className="position-relative" style={{ cursor: "pointer" }}>
          <i
            className="fa fa-user-circle fa-2x text-dark"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Menu utilizador"
          />
          {dropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{
                position: "absolute",
                left: 0,
                top: "120%",
                minWidth: "180px",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                zIndex: 1000,
              }}
            >
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}
        </div>

        {/* Logo centrado */}
        <div className="text-center">
          <img src={IMAGE.logoBlack} alt="Studio BelleArte" style={{ height: "60px", objectFit: "contain" }} />
        </div>

        {/* Espaço à direita */}
        <div style={{ width: "32px" }} />
      </div>
    </header>
  );
};

export default MenuCliente;
