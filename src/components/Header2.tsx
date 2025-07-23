import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Menu from "../element/Menu";

const Header = () => {
  return (
    <>
      <header
        className="site-header header center mo-left"
        style={{ zIndex: 9 }}
      >

        {/* Navigation Menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
        </motion.div>
      </header>
    </>
  );
};

export default Header;
