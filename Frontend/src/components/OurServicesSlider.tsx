import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { getServicos } from "../services/api/servico";

interface Servico {
  id: number;
  nome: string;
  descricao?: string;
  duracao?: number;
  preco?: number;
  imageUrl?: string;
}

interface SectionConfig {
  title: string;
  subtitle: string;
  description: string;
}

const OurServicesSlider = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [sectionConfig, setSectionConfig] = useState<SectionConfig | null>(null);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    // Primeiro tenta buscar do localStorage
    const cachedServices = localStorage.getItem("servicos");
    const cachedSection = localStorage.getItem("servicos_section");

    if (cachedServices) {
      setServicos(JSON.parse(cachedServices));
    }

    if (cachedSection) {
      setSectionConfig(JSON.parse(cachedSection));
    }

    // Depois tenta buscar da API e atualiza o localStorage
    const fetchAll = async () => {
      try {
        const [servicosData, sectionData] = await Promise.all([
          getServicos(),
          fetch(`${API_BASE}/api/servico/section/info`).then((res) => res.json()),
        ]);
        setServicos(servicosData);
        setSectionConfig(sectionData);

        // Armazena em localStorage
        localStorage.setItem("servicos", JSON.stringify(servicosData));
        localStorage.setItem("servicos_section", JSON.stringify(sectionData));
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      }
    };

    fetchAll();
  }, []);

  const getImage = (url?: string) => {
    if (!url) return "/images/default.jpg";
    return url.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  return (
    <section className="py-5 bg-white position-relative">
      <div className="container">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark">{sectionConfig?.title || "Nossos Serviços"}</h2>
          <p className="lead text-muted">{sectionConfig?.subtitle || "Subtítulo padrão."}</p>
          <div className="mx-auto my-3" style={{ width: "60px", height: "3px", backgroundColor: "#c9a255" }}></div>
          <p className="text-secondary col-lg-8 mx-auto">
            {sectionConfig?.description || "Descrição padrão da seção de serviços."}
          </p>
        </div>

        {/* Slider de Serviços */}
        {servicos.length > 0 ? (
          <Swiper
            grabCursor={true}
            slidesPerView="auto"
            spaceBetween={20}
            speed={600}
            loop={true}
            breakpoints={{
              1200: { slidesPerView: 4 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              320: { slidesPerView: 1 },
            }}
          >
            {servicos.map((item) => (
              <SwiperSlide key={item.id} style={{ width: "270px", minHeight: "360px" }}>
                <div className="card h-100 border-0 shadow-sm text-center p-3">
                  <img
                    src={getImage(item.imageUrl)}
                    alt={item.nome}
                    className="img-fluid rounded mb-3"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title fw-bold text-dark">{item.nome}</h5>
                    <p className="card-text text-muted">{item.descricao || "Sem descrição."}</p>
                    <p className="text-secondary small mb-0">
                      <strong>Duração:</strong> {item.duracao} min<br />
                      <strong>Preço:</strong> €{item.preco?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-muted">Nenhum serviço disponível no momento.</p>
        )}
      </div>
    </section>
  );
};

export default OurServicesSlider;
