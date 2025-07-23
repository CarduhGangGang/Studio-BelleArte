import 'bootstrap-icons/font/bootstrap-icons.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { HeaderProvider } from "./context/HeaderContext";
import { LogoProvider } from "./context/LogoContext";
import "react-toastify/dist/ReactToastify.css";

// Estilos
import "./assets/css/plugins.css";
import "./assets/css/comman.css";
import "react-modal-video/css/modal-video.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "./assets/css/style.css";
import "./assets/css/templete.min.css";
import "./assets/css/skins.css";
import "./assets/plugins/smartwizard/css/smart_wizard.css";

// Componentes
import Header from "./components/Header";
import Header2 from "./components/Header2";
import Footer from "./components/Footer";
import ScrollTop from "./element/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute";

// Contexto
import { AgendamentoProvider } from "./context/AgendamentoContext";

// Páginas
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Booking from "./pages/Booking";
import ComingSoon from "./pages/ComingSoon";
import Error404 from "./pages/Error404";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
import ContectUs from "./pages/ContectUs";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import PortfolioGrid2 from "./pages/PortfolioGrid2";
import PortfolioGrid3 from "./pages/PortfolioGrid3";
import ShopColumn from "./pages/ShopColumn";
import ShopColumnSidebar from "./pages/ShopColumnSidebar";
import ShopProductDetails from "./pages/ShopProductDetails";
import ShopLogin from "./pages/ShopLogin";
import ShopRegister from "./pages/ShopRegister";
import AdminDashboard from "./pages/AdminDashboard";
import Studio from "./pages/Studio";

function App() {
  const [getscroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 640);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AgendamentoProvider>
      <HeaderProvider>
        <LogoProvider>
          <div className="page-wraper">
            <Router>
              <Routes>
                {/* Layout principal com Header/Footer */}
                <Route element={<LayoutDefault />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/error-404" element={<Error404 />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registor" element={<Registor />} />
                  <Route path="/contect-us" element={<ContectUs />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services-details" element={<ServiceDetail />} />
                  <Route path="/portfolio-grid-3" element={<PortfolioGrid2 />} />
                  <Route path="/portfolio-grid-4" element={<PortfolioGrid3 />} />
                  <Route path="/shop-columns" element={<ShopColumn />} />
                  <Route path="/shop-column-sidebar" element={<ShopColumnSidebar />} />
                  <Route path="/product-details" element={<ShopProductDetails />} />
                  <Route path="/shop-login" element={<ShopLogin />} />
                  <Route path="/shop-register" element={<ShopRegister />} />
                </Route>

                {/* Booking - layout sem header/footer */}
                <Route element={<LayoutSemHeaderFooter />}>
                  <Route
                    path="/booking"
                    element={
                      <ProtectedRoute allowedRoles={[3]}>
                        <Booking />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Studio com Header2 */}
                <Route element={<LayoutStudio />}>
                  <Route
                    path="/studio"
                    element={
                      <ProtectedRoute allowedRoles={[2]}>
                        <Studio />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Admin sem header/footer */}
                <Route element={<LayoutSemHeaderFooter />}>
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={[1]}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Coming Soon com Header2/Footer */}
                <Route element={<LayoutComingSoon />}>
                  <Route path="/coming-soon" element={<ComingSoon />} />
                </Route>

                {/* ✅ Catch-all route para 404 - deve ser a última */}
                <Route path="*" element={<Error404 />} />
              </Routes>

              <ScrollTop />
              <button
                onClick={() => window.scrollTo(0, 0)}
                className="scroltop fa fa-chevron-up"
                style={{ display: getscroll ? "inline-block" : "none" }}
              ></button>

              <ToastContainer position="top-right" autoClose={3000} />
            </Router>
          </div>
        </LogoProvider>
      </HeaderProvider>
    </AgendamentoProvider>
  );
}

// Layout padrão com header e footer
function LayoutDefault() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// Layout apenas com Header2 (Studio)
function LayoutStudio() {
  return (
    <>
      <Header2 />
      <Outlet />
    </>
  );
}

// Layout sem header/footer – usado por Booking e Admin
function LayoutSemHeaderFooter() {
  return <Outlet />;
}

// Layout com Header2 + Footer (Coming Soon)
function LayoutComingSoon() {
  return (
    <>
      <Header2 />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
