import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommonBanner from "../element/CommonBanner";
import ServiceDetail from "./ServiceDetail";
import axios from "../services/api/api";
import { toast } from "react-toastify";
import '../App.css';

interface BannerData {
  title: string;
  image: string;
}

const Services = () => {
  const [banner, setBanner] = useState<BannerData>({ title: "", image: "" });

  useEffect(() => {
    axios
      .get("/banner/services")
      .then((res) => {
        console.log("🖼️ Dados do banner:", res.data);
        setBanner(res.data);
      })
      .catch((err) => {
        console.error("❌ Erro ao buscar banner:", err);
        toast.error("Erro ao carregar o banner.");
      });
  }, []);

  return (
    <motion.div
      className="page-content bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <CommonBanner title={banner.title} image={banner.image} />
      
      <motion.div
        className="selection:bg-blue-500 selection:text-white" // Aqui aplicamos a seleção azul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ServiceDetail />
      </motion.div>
    </motion.div>
  );
};

export default Services;
