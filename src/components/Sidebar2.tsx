import React, { useState } from "react";
import { motion } from "framer-motion";

type TabOption =
  | "inicio"
  | "users"
  | "services"
  | "settings"
  | "colaboradores"
  | "colaboradores:agenda"
  | "colaboradores:horarios"
  | "colaboradores:ferias"
  | "clientes"
  // CLIENTES
  | "clientes:marcacoes1"
  | "clientes:marcacoes2"
  | "clientes:marcacoes3"
  // HOME
  | "pages:header"
  | "pages:menu"
  | "pages:home_slider"
  | "pages:services_slider"
  | "pages:home_card"
  | "pages:our_portfolio"
  | "pages:footer"
  // SERVIÇOS
  | "pages:services_admin"
  | "pages:services_editor"
  // SOBRE
  | "pages:services_banner2"
  | "pages:history"
  | "pages:pricing"
  | "pages:team_slider"
  // LOGIN
  | "pages:services_banner3"
  | "pages:login_page"
  // REGISTER
  | "pages:services_banner4"
  | "pages:registor_page"
  // CONTACTOS
  | "pages:contact_page";

interface SidebarProps {
  activeTab: TabOption;
  setActiveTab: (tab: TabOption) => void;
  onClose?: () => void;
  isAdminView?: boolean;
}

const Sidebar2: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onClose,
}) => {
  const [pagesOpen, setPagesOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [clientesOpen, setClientesOpen] = useState(false);
  const [colaboradoresOpen, setColaboradoresOpen] = useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isActive = (tab: TabOption) => activeTab === tab;

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
        zIndex: 1040,
        top: 0,
        left: 0,
        overflowY: "auto",
        padding: "20px",
        paddingTop: isMobile ? "100px" : "80px",
      }}
    >
      {onClose && isMobile && (
        <button
          className="btn btn-sm btn-outline-secondary mb-3 position-absolute"
          style={{ top: 20, right: 20 }}
          onClick={onClose}
        >
          ✖ Fechar
        </button>
      )}

      <h4 className="fw-bold text-dark text-center mb-4">Menu</h4>

      <ul className="nav flex-column gap-3 text-center">
        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${isActive("inicio") ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("inicio")}
          >
            INÍCIO
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${isActive("users") ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            USERS
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link btn text-dark ${isActive("services") ? "fw-bold text-primary" : ""}`}
            onClick={() => setActiveTab("services")}
          >
            SERVIÇOS
          </button>
        </li>

        {/* ✅ COLABORADORES Dropdown */}
        <li className="nav-item text-start">
          <button
            className={`nav-link btn text-dark d-flex justify-content-between align-items-center w-100 ${
              activeTab.startsWith("colaboradores:") ? "fw-bold text-primary" : ""
            }`}
            onClick={() => setColaboradoresOpen(!colaboradoresOpen)}
          >
            COLABORADORES <span>{colaboradoresOpen ? "▲" : "▼"}</span>
          </button>

          {colaboradoresOpen && (
            <ul className="list-unstyled ps-3 pt-2">
              <li>
                <button
                  className={`btn text-start w-100 ${isActive("colaboradores:agenda") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("colaboradores:agenda");
                    setColaboradoresOpen(false);
                  }}
                >
                  Agenda 
                </button>
              </li>
              <li>
                <button
                  className={`btn text-start w-100 ${isActive("colaboradores:horarios") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("colaboradores:horarios");
                    setColaboradoresOpen(false);
                  }}
                >
                  Horários
                </button>
              </li>
              <li>
                <button
                  className={`btn text-start w-100 ${isActive("colaboradores:ferias") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("colaboradores:ferias");
                    setColaboradoresOpen(false);
                  }}
                >
                  Férias
                </button>
              </li>
            </ul>
          )}
        </li>

         {/* ✅ CLIENTES Dropdown */}
        <li className="nav-item text-start">
          <button
            className={`nav-link btn text-dark d-flex justify-content-between align-items-center w-100 ${
              activeTab.startsWith("clientes") ? "fw-bold text-primary" : ""
            }`}
            onClick={() => setClientesOpen(!clientesOpen)}
          >
            BOOKING <span>{clientesOpen ? "▲" : "▼"}</span>
          </button>

          {clientesOpen && (
            <ul className="list-unstyled ps-3 pt-2">
              <li>
                <button
                  className={`btn text-start w-100 ${isActive("clientes:marcacoes1") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("clientes:marcacoes1");
                    setClientesOpen(false);
                  }}
                >
                  Booking 1
                </button>
              </li>
                 <li>
                <button
                  className={`btn text-start w-100 ${isActive("clientes:marcacoes2") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("clientes:marcacoes2");
                    setClientesOpen(false);
                  }}
                >
                  Booking 2
                </button>
              </li>
              <li>
                <button
                  className={`btn text-start w-100 ${isActive("clientes:marcacoes3") ? "fw-bold text-primary" : ""}`}
                  onClick={() => {
                    setActiveTab("clientes:marcacoes3");
                    setClientesOpen(false);
                  }}
                >
                  Booking 3
                </button>
              </li>
            </ul>
          )}
        </li>

        {/* PÁGINAS Dropdown */}
        <li className="nav-item text-start">
          <button
            className={`nav-link btn text-dark d-flex justify-content-between align-items-center w-100 ${
              activeTab.startsWith("pages") ? "fw-bold text-primary" : ""
            }`}
            onClick={() => setPagesOpen(!pagesOpen)}
          >
            PÁGINAS <span>{pagesOpen ? "▲" : "▼"}</span>
          </button>

          {pagesOpen && (
            <ul className="list-unstyled ps-3 pt-2">
              {/* HOME */}
              <li>
                <button className="btn text-start w-100" onClick={() => setHomeOpen(!homeOpen)}>
                  Home
                </button>
                {homeOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:home_slider") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:home_slider")}>
                        Home Slider
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_slider") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_slider")}>
                        Services Slider
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:home_card") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:home_card")}>
                        Home Card
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:our_portfolio") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:our_portfolio")}>
                        Our Portfolio
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* SERVIÇOS */}
              <li>
                <button className="btn text-start w-100" onClick={() => setServicesOpen(!servicesOpen)}>
                  Serviços
                </button>
                {servicesOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                     <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_admin") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_admin")}>
                        Banner 1
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_editor") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_editor")}>
                        Editar Serviços
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* SOBRE */}
              <li>
                <button className="btn text-start w-100" onClick={() => setAboutOpen(!aboutOpen)}>
                  Sobre
                </button>
                {aboutOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                     <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_banner2") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_banner2")}>
                        Banner 2
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:history") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:history")}>
                        História
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:pricing") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:pricing")}>
                        Tabela de Preços
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:team_slider") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:team_slider")}>
                        Equipa
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* LOGIN */}
              <li>
                <button className="btn text-start w-100" onClick={() => setLoginOpen(!loginOpen)}>
                  Login
                </button>
                {loginOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                     <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_banner3") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_banner3")}>
                        Banner 3
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:login_page") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:login_page")}>
                        Página de Login
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* REGISTAR */}
              <li>
                <button className="btn text-start w-100" onClick={() => setRegisterOpen(!registerOpen)}>
                  Registar
                </button>
                {registerOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                     <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:services_banner4") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:services_banner4")}>
                        Banner 4
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:registor_page") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:registor_page")}>
                        Página de Registo
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              {/* CONTACTOS */}
              <li>
                <button className="btn text-start w-100" onClick={() => setContactOpen(!contactOpen)}>
                  Contactos
                </button>
                {contactOpen && (
                  <ul className="list-unstyled ps-3 pt-2">
                     <li>
                      <button className={`btn text-start w-100 ${isActive("pages:header") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:header")}>
                        Header
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:menu") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:menu")}>
                        Menu
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:contact_page") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:contact_page")}>
                        Página de Contacto
                      </button>
                    </li>
                    <li>
                      <button className={`btn text-start w-100 ${isActive("pages:footer") ? "fw-bold text-primary" : ""}`} onClick={() => setActiveTab("pages:footer")}>
                        Footer
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </motion.div>
  );
};

export default Sidebar2;
