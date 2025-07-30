// OurTeamslider.tsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
  getTeamMembers,
  TeamMember,
  TeamSectionConfig,
} from "../services/api/team";
import "swiper/css";

interface Props {
  config: TeamSectionConfig;
}

const OurTeamslider = ({ config }: Props) => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    getTeamMembers()
      .then(setTeam)
      .catch(() => console.error("Erro ao carregar equipa"));
  }, []);

  if (!team.length) return null;

  // Função para normalizar a URL da imagem
  const resolveImageUrl = (url: string) => {
    if (!url) return "/fallback.jpg"; // imagem fallback local
    if (url.startsWith("http")) return url;
    return `${import.meta.env.VITE_API_BASE_URL}${url}`;
  };

  return (
    <section className="bg-white py-5">
      <div className="container">
        {/* Cabeçalho da secção */}
        <div className="section-head text-black text-center">
          <h2 className="text-black m-b10">{config.title}</h2>
          <div className="dlab-separator-outer m-b0" />
          <p className="text-muted">{config.description}</p>
        </div>

        {/* Linha decorativa */}
        <div
          className="mx-auto my-3"
          style={{
            width: "60px",
            height: "3px",
            backgroundColor: "#c9a255",
          }}
        />

        {/* Slider de membros da equipa */}
        <Swiper
          slidesPerView={4}
          loop
          speed={1000}
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          centeredSlides
          breakpoints={{
            1200: { slidesPerView: 4 },
            992: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            320: { slidesPerView: 1 },
          }}
        >
          {team.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="card h-100 text-center shadow-sm border-0">
                <img
                  src={resolveImageUrl(member.imageUrl)}
                  alt={member.name}
                  className="card-img-top rounded-top"
                  style={{ height: 300, objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/fallback.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="text-dark fw-bold">{member.name}</h5>
                  <p className="text-muted">{member.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurTeamslider;
