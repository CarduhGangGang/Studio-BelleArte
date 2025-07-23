import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import '../App.css';

import Home_slider from "../components/Home_slider";
import OurServicesSlider from "../components/OurServicesSlider";
import OurPortfolio from "../components/OurPortfolio";
import { HomeCards } from "../components/HomeCards";

const Home = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");

    if (location.state?.logout) {
      localStorage.removeItem("role");
      localStorage.removeItem("clienteLogado");
      localStorage.removeItem("ultimoAgendamento");
    }
  }, [location.state]);

  return (
    <>
      <style>{`::selection { background-color: #0d6efd; color: white; }`}</style>

      <motion.div
        className="page-content bg-white"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* SLIDER PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Home_slider />
        </motion.div>

        {/* SERVIÇOS */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-5 bg-white"
        >
          <div className="container">
            <OurServicesSlider />
          </div>
        </motion.div>

        {/* CARTÕES */}
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <HomeCards />
        </motion.div>

        {/* PORTFÓLIO */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-5 bg-white"
        >
          <div className="container">
            <OurPortfolio />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Home;
