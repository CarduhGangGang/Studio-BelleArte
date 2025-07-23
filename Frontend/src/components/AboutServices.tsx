import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SlideImage = [
  { img: "/images/corte-masculino.jpg", name: "Corte Masculino", desc: "Um corte clássico com acabamento preciso para o homem moderno." },
  { img: "/images/barba-bigode.jpg", name: "Barba & Bigode", desc: "Barba delineada e bigode modelado com elegância tradicional." },
  { img: "/images/coloracao-capilar.jpg", name: "Coloração Capilar", desc: "Coloração profissional que realça o seu estilo com naturalidade." },
  { img: "/images/cuidados-pele.jpg", name: "Cuidados com a Pele", desc: "Tratamentos faciais para o rejuvenescimento da sua pele." },
  { img: "/images/aparar.jpg", name: "Aparar & Modelar", desc: "Modelagem refinada para um visual limpo e alinhado, com precisão e estilo." },
  { img: "/images/male-barber.jpg", name: "Corte com Tesoura", desc: "Corte com tesoura para um acabamento mais natural e personalizado." },
  { img: "/images/lavar-e-secar.jpg", name: "Lavagem Capilar", desc: "Lavagem profunda com produtos específicos para seu tipo de cabelo." },
  { img: "/images/barbearia-premium.jpg", name: "Barbearia Premium", desc: "Serviço exclusivo com atendimento premium e detalhado." },
  { img: "/images/mao-com-eletrico-aparador.jpg", name: "Estilo Personalizado", desc: "Estilo criado sob medida para refletir sua personalidade e com atenção aos detalhes." },
  { img: "/images/homem-com-barba-cabeleireiro-com-um-cliente-homem-com-pente-e-tesoura.jpg", name: "Toalha Quente", desc: "Toalha quente para abrir os poros e proporcionar conforto total." },
];

const OurServicesSlider = () => {
  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url("/images/bg-white.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#fff",
      }}
    >
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-black tracking-wide">Nossos Serviços</h2>
        <p className="text-md mt-3 text-black font-medium">
          Estar à altura de um cavalheiro será o seu estilo diário.
        </p>
        <div className="w-16 h-[2px] bg-gold mx-auto my-4" />
        <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
          Serviço premium pensado para o homem moderno. Estilo, precisão e cuidado personalizado com excelência.
        </p>
      </div>

      <Swiper
        modules={[Pagination]}
        grabCursor={true}
        slidesPerView={4}
        spaceBetween={30}
        speed={1000}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          1200: { slidesPerView: 4 },
          990: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          320: { slidesPerView: 1 },
        }}
      >
        {SlideImage.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-xl p-4 text-center shadow hover:shadow-xl transition-all duration-300 min-h-[600px] flex flex-col justify-start">
              <img
                src={item.img}
                alt={item.name}
                style={{
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                className="mx-auto rounded-lg w-[500px] h-[500px] object-cover mb-4"
              />
              <p className="text-lg font-extrabold text-black leading-relaxed px-2">
                {item.name}
              </p>
              <p className="text-sm text-black leading-relaxed px-2">
                {item.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination mt-6" />
      </Swiper>
    </section>
  );
};

export default OurServicesSlider;
