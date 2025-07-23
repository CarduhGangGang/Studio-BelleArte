import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import '../App.css';
import Sidebar from "../components/Sidebar2";
import AdminPainel from "../components/AdminPainel";
import Users from "../components/Users";
import Settings from "../components/Settings";
import Pages from "../components/Pages";
import HeaderEditor from "../components/HeaderEditor";
import MenuEditor from "../components/MenuEditor";
import HomeSliderEditor from "../components/HomeSliderEditor";
import ServicesSliderEditor from "../components/ServicesSliderEditor";
import HomeCardsEditor from "../components/HomeCardsEditor";
import OurPortfolioEditor from "../components/OurPortfolioEditor";
import FooterEditor from "../components/FooterEditor";
import BannerEditor from "../components/Banner1Editor";
import Banner2Editor from "../components/Banner2Editor";
import Banner3Editor from "../components/Banner3Editor";
import Banner4Editor from "../components/Banner4Editor";
import ServiceEditor from "../components/ServiceEditor";
import AboutHistoryEditor from "../components/AboutHistoryEditor";
import PricingEditor from "../components/PricingEditor";
import TeamEditor from "../components/TeamEditor";
import LoginTextEditor from "../components/LoginTextEditor";
import RegisterEditor from "../components/RegisterEditor";
import ContactEditor from "../components/ContactEditor";
import BookingPage1Editor from "../components/BookingPage1Editor";
import BookingPage2Editor from "../components/BookingPage2Editor";
import BookingPage3Editor from "../components/BookingPage3Editor";
import Services from "../components/Services";
import Agenda from "../components/Agenda";
import Horarios from "../components/Horarios";
import Ferias from "../components/Ferias";


type AdminTab =
  | "painel"
  | "users"
  | "services"
  | "pages"
  | "settings"
  | "pages:header"
  | "pages:menu"
  | "pages:home_slider"
  | "pages:services_slider"
  | "pages:home_card"
  | "pages:our_portfolio"
  | "pages:footer"
  | "pages:services_admin"
  | "pages:services_editor"
  | "pages:services_banner2"
  | "pages:services_banner3"
  | "pages:services_banner4"
  | "pages:history"
  | "pages:pricing"
  | "pages:team_slider"
  | "pages:login_page"
  | "pages:registor_page"
  | "pages:contact_page"
  | "pages:contact_page"
  | "clientes:marcacoes1"
  | "clientes:marcacoes2"
  | "clientes:marcacoes3"
  | "colaboradores:agenda"
  | "colaboradores:horarios"
  | "colaboradores:ferias"
   

const AdminDashboard = () => {
  const [role, setRole] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("painel");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (!storedRole || Number(storedRole) !== 1) {
      navigate("/login");
    } else {
      setRole(Number(storedRole));
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
    localStorage.clear();
    navigate("/");
  };

  const renderAdminContent = () => {
    switch (activeTab) {
      case "painel":
        return <AdminPainel setActiveTab={setActiveTab} />;
      case "users":
        return <Users />;
      case "services":
        return <Services />;
      case "pages":
        return <Pages />;
      case "pages:header":
        return <HeaderEditor />;
      case "pages:menu":
        return <MenuEditor />;
      case "pages:home_slider":
        return <HomeSliderEditor />;
      case "pages:services_slider":
        return <ServicesSliderEditor />;
      case "pages:services_admin":
        return <BannerEditor />;
      case "pages:services_banner2":
        return <Banner2Editor />;
      case "pages:services_banner3":
        return <Banner3Editor />;
      case "pages:services_banner4":
        return <Banner4Editor />;
      case "pages:services_editor":
        return <ServiceEditor />;
      case "pages:home_card":
        return <HomeCardsEditor />;
      case "pages:history":
        return <AboutHistoryEditor />;
      case "pages:pricing":
        return <PricingEditor />;
      case "pages:our_portfolio":
        return <OurPortfolioEditor />;
      case "pages:login_page":
        return <LoginTextEditor />;
      case "pages:registor_page":
        return <RegisterEditor />;
      case "pages:team_slider":
        return <TeamEditor />;
      case "clientes:marcacoes1":
        return <BookingPage1Editor/>;
      case "clientes:marcacoes2":
        return <BookingPage2Editor/>;
      case "clientes:marcacoes3":
        return <BookingPage3Editor/>
      case "pages:contact_page":
        return <ContactEditor />;
      case "pages:footer":
        return <FooterEditor />;
      case "settings":
        return <Settings />;
      case "colaboradores:agenda":
        return <Agenda />;
      case "colaboradores:horarios":
        return <Horarios />;
      case "colaboradores:ferias":
        return <Ferias />;
      default:
        return <AdminPainel setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100vh", overflow: "hidden" }}>
      <div
        className="d-flex justify-content-between align-items-center px-4 py-2 border-bottom bg-white flex-shrink-0"
        style={{ height: "70px", zIndex: 1050 }}
      >
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          <i className="fa fa-sign-out-alt me-1" /> Sair
        </button>

        <div className="position-relative">
          <button className="btn btn-outline-secondary btn-sm" title="Notificações">
            <i className="fa fa-bell" />
          </button>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            5
          </span>
        </div>
      </div>

      <div className="d-flex flex-grow-1 position-relative" style={{ overflow: "hidden" }}>
        {(sidebarOpen || !isMobile) && (
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab as AdminTab);
              if (isMobile) setSidebarOpen(false);
            }}
            onClose={isMobile ? () => setSidebarOpen(false) : undefined}
            isAdminView={true}
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
            <button className="btn btn-outline-secondary mb-3" onClick={() => setSidebarOpen(true)}>
              ☰ Menu
            </button>
          )}

          {role === 1 ? (
            renderAdminContent()
          ) : (
            <p className="text-danger text-center mt-5">Acesso não autorizado</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;