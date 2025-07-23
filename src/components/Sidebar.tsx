import React from "react";
import { motion } from "framer-motion";

type TabOption = "painel" | "agenda" | "indisponibilidades" | "horarios" | "ferias";

interface SidebarProps {
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onClose }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      className="bg-white border-end"
      initial={isMobile ? { x: "-100%" } : false}
      animate={isMobile ? { x: 0 } : false}
      exit={isMobile ? { x: "-100%" } : false}
      transition={{ duration: 0.3 }}
      style={{
        width: isMobile ? "100vw" : "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1040,
        overflowY: "auto",            // permite scroll vertical
        padding: "1.5rem",
        paddingTop: isMobile ? "120px" : "100px",  // conteúdo mais abaixo
      }}
    >
      {/* Botão fechar fixo no topo (mobile) */}
      {onClose && isMobile && (
        <button
          className="btn btn-sm btn-outline-secondary position-absolute"
          onClick={onClose}
          style={{
            top: 20,
            right: 20,
            zIndex: 1050,
          }}
        >
          ✖ Fechar
        </button>
      )}

      {/* Título */}
      <h4 className="fw-bold text-dark text-center mb-4">Menu</h4>

      {/* Botões de navegação */}
      <ul className="nav flex-column gap-3 text-center">
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${activeTab === "painel" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("painel")}
          >
            INÍCIO
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${activeTab === "agenda" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("agenda")}
          >
            AGENDA
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${activeTab === "indisponibilidades" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("indisponibilidades")}
          >
            INDISPONIBILIDADES
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${activeTab === "horarios" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("horarios")}
          >
            HORÁRIOS
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${activeTab === "ferias" ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("ferias")}
          >
            FÉRIAS
          </button>
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
