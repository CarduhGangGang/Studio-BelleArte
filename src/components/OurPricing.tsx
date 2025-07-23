const pricingList = [
  {
    title: "Corte Masculino",
    duration: "30 – 40 minutos",
    price: "€15,00",
  },
  {
    title: "Barba e Bigode",
    duration: "20 – 30 minutos",
    price: "€10,00",
  },
  {
    title: "Coloração Capilar",
    duration: "45 – 60 minutos",
    price: "€60,00",
  },
  {
    title: "Cuidados com a Pele",
    duration: "20 – 30 minutos",
    price: "€30,00",
  },
  {
    title: "Toalha Quente",
    duration: "10 – 15 minutos",
    price: "€15,00",
  },
];

const pricingList2 = [
  {
    title: "Aparar e Modelar",
    duration: "15 – 25 minutos",
    price: "€20,00",
  },
  {
    title: "Cortes com Tesoura",
    duration: "40 – 50 minutos",
    price: "€45,00",
  },
  {
    title: "Lavagem Capilar",
    duration: "10 – 15 minutos",
    price: "€12,00",
  },
  {
    title: "Barbearia Premium",
    duration: "60 – 80 minutos",
    price: "€90,00",
  },
  {
    title: "Estilo Personalizado",
    duration: "50 – 70 minutos",
    price: "€70,00",
  },
];

const OurPricing = () => {
  return (
    <div className="container py-5">
      <style>
        {`
          @media (max-width: 768px) {
            .price-tbl h4 {
              font-size: 1.1rem;
            }
            .price-tbl p {
              font-size: 0.9rem;
            }
            .price-val h3 {
              font-size: 1rem !important;
            }
          }
        `}
      </style>

      <div className="row g-4">
        <div className="col-lg-6 col-md-12">
          {pricingList.map((item, index) => (
            <div
              className="price-tbl d-flex justify-content-between align-items-center border-bottom pb-3 mb-3"
              key={index}
            >
              <div>
                <h4 className="text-dark fw-semibold mb-1">{item.title}</h4>
                <p className="text-muted mb-0">{item.duration}</p>
              </div>
              <div className="price-val">
                <h3
                  className="text-black"
                  style={{ fontSize: "1.2rem", fontWeight: "600" }}
                >
                  {item.price}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-6 col-md-12">
          {pricingList2.map((item, index) => (
            <div
              className="price-tbl d-flex justify-content-between align-items-center border-bottom pb-3 mb-3"
              key={index}
            >
              <div>
                <h4 className="text-dark fw-semibold mb-1">{item.title}</h4>
                <p className="text-muted mb-0">{item.duration}</p>
              </div>
              <div className="price-val">
                <h3
                  className="text-black"
                  style={{ fontSize: "1.2rem", fontWeight: "600" }}
                >
                  {item.price}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurPricing;
