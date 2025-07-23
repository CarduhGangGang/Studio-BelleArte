import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommonBanner from "../element/CommonBanner";
import OurTeamslider from "../components/OurTeamslider";
import { IMAGE } from "../constent/theme";
import axios from "../services/api/api";
import { toast } from "react-toastify";

import { getAboutHistory, AboutHistory } from "../services/api/history";
import { getAllPricingData, PricingItem } from "../services/api/pricing";
import { getTeamSectionConfig, TeamSectionConfig } from "../services/api/team";

import "../App.css";

interface BannerData {
  title: string;
  image: string;
}

const AboutUs = () => {
  const [banner, setBanner] = useState<BannerData>({ title: "", image: "" });
  const [historia, setHistoria] = useState<AboutHistory>({
    title: "",
    description: "",
  });
  const [pricingTitle, setPricingTitle] = useState("Tabela de Preços");
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([]);
  const [teamConfig, setTeamConfig] = useState<TeamSectionConfig>({
    title: "A Nossa Equipa",
    description: "Profissionais dedicados ao seu estilo.",
  });

  useEffect(() => {
    axios
      .get("/banner/about-us")
      .then((res) => setBanner(res.data))
      .catch(() => toast.error("Erro ao carregar banner Sobre Nós"));

    getAboutHistory()
      .then(setHistoria)
      .catch(() => toast.error("Erro ao carregar história"));

    getAllPricingData()
      .then((data) => {
        setPricingTitle(data.title);
        setPricingItems(data.items);
      })
      .catch(() => toast.error("Erro ao carregar tabela preços"));

    getTeamSectionConfig()
      .then(setTeamConfig)
      .catch(() => toast.error("Erro ao carregar configuração da equipa"));
  }, []);

  return (
    <motion.div
      className="page-content bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Banner principal */}
      <CommonBanner title={banner.title} image={banner.image} />

      <div className="content-block">
        {/* História */}
        <motion.div
          className="section-full content-inner overlay-white-middle relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${IMAGE.backgroundBg2}), url(${IMAGE.banner2})`,
              backgroundPosition: "bottom, top",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              opacity: 0.05,
            }}
          />
          <div className="container relative z-10">
            <div className="section-head text-black text-center max-w-3xl mx-auto">
              <h2 className="text-black m-b10">{historia.title}</h2>
              <div className="dlab-separator-outer m-b4">
                <div className="w-16 h-[2px] bg-gold mx-auto my-4" />
              </div>
              <p
                className="text-gray-700 text-lg leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: historia.description.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Tabela de Preços */}
        <motion.div
          className="section-full content-inner position-relative with-overlay"
          style={{
            backgroundColor: "#1c1c1c",
            color: "#fff",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="container">
            <div className="section-head text-center">
              <h2 className="text-white m-b10">{pricingTitle}</h2>
              <hr
                style={{
                  borderTop: "1px solid #999",
                  width: "80%",
                  margin: "auto",
                }}
              />
            </div>

            <div className="row g-4 mt-4">
              {pricingItems.map((item, index) => (
                <div key={index} className="col-md-6">
                  <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <h5 className="text-white mb-1">{item.title}</h5>
                      <p className="text-light mb-0">{item.duration}</p>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold text-white">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equipa */}
        <motion.div
          className="section-full bg-white content-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <OurTeamslider config={teamConfig} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
