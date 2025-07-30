import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { getSlides } from "../services/api/homeSlider";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

const Home_slider = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const navigate = useNavigate();
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    document.body.setAttribute("data-theme-color", "color_1");

    const fetchSlides = async () => {
      try {
        const data = await getSlides();
        setSlides(data);
      } catch {
        console.error("Erro ao buscar slides");
      }
    };

    fetchSlides();
  }, []);

  const API_BASE = import.meta.env.VITE_API_URL 
  const getFullImageUrl = (url: string) =>
    url.startsWith("http")
      ? url
      : `${API_BASE.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;

  return (
    <>
      <style>
        {`
          .home-banner-slider ::selection {
            background-color: #0d6efd;
            color: white;
          }

          .fade-slide {
            opacity: 0;
            transition: opacity 1s ease-in-out;
          }

          .swiper-slide-active .fade-slide {
            opacity: 1;
          }

          @media (max-width: 768px) {
            .home-banner-media {
              min-height: 70vh !important;
              padding-top: 20px !important;
              align-items: flex-start !important;
            }

            .home-banner-content {
              padding: 24px !important;
              max-width: 90% !important;
              text-align: center !important;
            }

            .home-banner-content h1 {
              font-size: 30px !important;
              margin-bottom: 16px !important;
            }

            .home-banner-content p {
              font-size: 15px !important;
            }

            .home-banner-buttons {
              flex-direction: column !important;
              gap: 12px !important;
              margin-top: 20px !important;
              align-items: center !important;
            }
          }
        `}
      </style>

      <Swiper
        className="home-banner-slider"
        effect="fade"
        modules={[EffectFade, Navigation, Autoplay]}
        autoplay={{ delay: 5000 }}
        speed={2000}
        fadeEffect={{ crossFade: true }}
        ref={swiperRef}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="home-banner-media fade-slide"
              style={{
                backgroundImage: `url(${getFullImageUrl(slide.imageUrl)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "90vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "0 5%",
                position: "relative",
              }}
            >
              {/* Sombra sobre imagem */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  zIndex: 1,
                }}
              ></div>

              {/* Conteúdo */}
              <div
                className="home-banner-content"
                style={{
                  position: "relative",
                  zIndex: 2,
                  maxWidth: "600px",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  padding: "40px",
                  borderRadius: "8px",
                  color: "#000",
                  transition: "opacity 0.8s ease-in-out",
                }}
              >
                <h1
                  style={{
                    fontSize: "48px",
                    fontWeight: "900",
                    marginBottom: "0.2em",
                    color: "#000",
                  }}
                >
                  {slide.title}
                </h1>
                <h1
                  style={{
                    fontSize: "44px",
                    fontWeight: "900",
                    marginBottom: "1em",
                    color: "#000",
                  }}
                >
                  {slide.subtitle}
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "1.6",
                    color: "#000",
                  }}
                >
                  {slide.description}
                </p>
                <div
                  className="home-banner-buttons"
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => navigate("/contect-us")}
                    style={{
                      backgroundColor: "#C8A047",
                      color: "#fff",
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Contacte-nos
                  </button>
                  <button
                    onClick={() => navigate("/about-us")}
                    style={{
                      color: "#C8A047",
                      backgroundColor: "transparent",
                      border: "2px solid #C8A047",
                      padding: "12px 24px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Sobre Nós
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Home_slider;
