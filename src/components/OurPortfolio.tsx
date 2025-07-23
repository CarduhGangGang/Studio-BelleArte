import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getPortfolioSection,
  getPortfolioImages,
} from "../services/api/portfolio";

const OurPortfolio = () => {
  const [section, setSection] = useState({
    title: "",
    subtitle: "",
    description: "",
  });

  const [images, setImages] = useState<{ id: number; imageUrl: string }[]>([]);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const getImageUrl = (url?: string) =>
    url?.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url?.replace(/^\//, "")}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await getPortfolioSection();
        const imageData = await getPortfolioImages();
        setSection(sectionData);
        setImages(imageData);
      } catch (error) {
        console.error("Erro ao carregar o portfólio:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="py-5 bg-white"
    >
      <div className="container">
        {/* Cabeçalho da seção */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark">{section.title}</h2>

          {section.subtitle && (
            <p className="text-secondary fs-5 mb-2">{section.subtitle}</p>
          )}

          <div
            className="w-25 mx-auto my-3"
            style={{ height: "3px", backgroundColor: "#C8A047" }}
          />

          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            {section.description}
          </p>

        </div>

        {/* Galeria de imagens */}
        <div className="row">
          {images.map((img, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={img.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-100"
              >
                <div className="overflow-hidden rounded shadow-sm">
                  <img
                    src={getImageUrl(img.imageUrl)}
                    alt={`Portfolio ${index + 1}`}
                    className="img-fluid w-100"
                    style={{ height: "350px", objectFit: "cover" }}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default OurPortfolio;
