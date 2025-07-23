import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import '../App.css';

import Sidebar from "../components/Sidebar";
import Painel from "../components/Painel";
import Agenda from "../components/Agenda";
import Indisponibilidades from "../components/Indisponibilidades";
import Horarios from "../components/Horarios";
import Ferias from "../components/Ferias";

// Tipo das abas permitidas
type TabOption = "painel" | "agenda" | "indisponibilidades" | "horarios" | "ferias";

const Studio = () => {
  const [role, setRole] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<TabOption>("painel");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const roleFromStorage = localStorage.getItem("role");
    if (!roleFromStorage) {
      navigate("/login");
    } else {
      setRole(Number(roleFromStorage));
    }
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen && isMobile ? "hidden" : "auto";
  }, [sidebarOpen, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("nome");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "painel":
        return <Painel setActiveTab={setActiveTab} />;
      case "agenda":
        return <Agenda />;
      case "indisponibilidades":
        return <Indisponibilidades />;
      case "horarios":
        return <Horarios />;
      case "ferias":
        return <Ferias />;
      default:
        return <Painel setActiveTab={setActiveTab} />;
    }
  };

  const renderClientePainel = () => (
    <div className="container py-4">
      <h2 className="h5 fw-bold mb-4 text-center">🎯 Painel do Cliente</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📅 Meus Agendamentos</h5>
              <p className="card-text text-muted">Consulta os teus agendamentos ativos e futuros.</p>
              <button className="btn btn-outline-primary" onClick={() => setActiveTab("agenda")}>Ver Agenda</button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⛔ Minhas Indisponibilidades</h5>
              <p className="card-text text-muted">Informa quando estiveres indisponível.</p>
              <button className="btn btn-outline-danger" onClick={() => setActiveTab("indisponibilidades")}>Ver Indisponibilidades</button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🌴 Férias & Folgas</h5>
              <p className="card-text text-muted">Consulta ou edita as tuas férias e dias de folga.</p>
              <button className="btn btn-outline-success" onClick={() => setActiveTab("ferias")}>Ver Férias/Folgas</button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">⏰ Meu Horário</h5>
              <p className="card-text text-muted">Define ou atualiza o teu horário de trabalho.</p>
              <button className="btn btn-outline-secondary" onClick={() => setActiveTab("horarios")}>Ver Horário</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white flex-shrink-0" style={{ height: "70px", zIndex: 1050 }}>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          <i className="fa fa-sign-out-alt me-1" /> Sair
        </button>

        <div className="position-relative">
          <button className="btn btn-outline-secondary btn-sm">
            <i className="fa fa-bell" />
          </button>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </div>
      </div>

      <div className="d-flex flex-grow-1 position-relative" style={{ overflow: "hidden" }}>
        {(sidebarOpen || !isMobile) && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              if (isMobile) setSidebarOpen(false);
            }}
            onClose={isMobile ? () => setSidebarOpen(false) : undefined}
          />
        )}

        {sidebarOpen && isMobile && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
            style={{ opacity: 0.5, zIndex: 1030 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <motion.div
          className="flex-grow-1 overflow-auto"
          style={{
            marginLeft: !isMobile ? "250px" : "0",
            padding: "1.5rem",
            backgroundColor: "#f8f9fa",
            maxHeight: "calc(100vh - 70px)",
            zIndex: 1020,
            width: "100%",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isMobile && !sidebarOpen && (
            <button
              className="btn btn-outline-secondary mb-3"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Menu
            </button>
          )}

          {[1, 2].includes(role || 0)
            ? renderContent()
            : role === 3
            ? renderClientePainel()
            : <p className="text-danger text-center mt-5">Acesso inválido</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default Studio;
