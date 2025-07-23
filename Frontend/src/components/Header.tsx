import { motion } from "framer-motion";
import Menu from "../element/Menu";
import { useHeader } from "../context/HeaderContext";

const Header = () => {
  const { header } = useHeader();

  if (!header) return null;

  return (
    <header className="site-header header center mo-left" style={{ zIndex: 9 }}>
      <motion.div
        className="top-bar text-white"
        style={{ backgroundColor: "#c6a661", padding: "10px 0" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="dlab-topbar-center d-flex flex-wrap justify-content-center gap-4">
              <ul className="list-inline d-flex flex-wrap justify-content-center align-items-center gap-4 fs-6 m-0 p-0">
                <li><i className="fa fa-phone me-2"></i>{header.phone}</li>
                <li><i className="fa fa-map-marker me-2"></i>{header.address}</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
        <Menu isAdmin={false} />
      </motion.div>
    </header>
  );
};

export default Header;
