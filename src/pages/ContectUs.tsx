import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getContactSectionConfig, ContactSectionConfig } from "../services/api/contact";
import '../App.css';

const ContactUs = () => {
  const [config, setConfig] = useState<ContactSectionConfig | null>(null);

  useEffect(() => {
    getContactSectionConfig()
      .then((data) => setConfig(data))
      .catch((err) => {
        console.error("Erro ao carregar dados de contacto:", err);
      });
  }, []);

  if (!config) return <div className="text-center py-5">A carregar informações de contacto...</div>;

  const QuickContact = [
    {
      icon: "ti-location-pin",
      title: "Morada:",
      subtitle: config.address,
    },
    {
      icon: "ti-email",
      title: "Email:",
      subtitle: config.email,
    },
    {
      icon: "ti-mobile",
      title: "Telefone:",
      subtitle: config.phone,
    },
  ];

  return (
    <>
      <div className="page-content bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">{config.title}</h2>
            <p style={{ maxWidth: "600px", margin: "0 auto", fontSize: "16px" }}>
              {config.subtitle}
            </p>
          </div>

          <div className="row gy-4 justify-content-center align-items-stretch">
            {/* 📍 Informação de Contacto */}
            <div className="col-12 col-md-10 col-lg-5">
              <div className="p-5 border h-100 shadow-sm rounded-3 bg-light">
                <h4 className="mb-4 fw-semibold text-center">Contactos</h4>
                <p className="text-center mb-4" style={{ fontSize: "15px" }}>
                  Utilize os dados abaixo para nos contactar diretamente.
                </p>
                <ul className="list-unstyled mt-3">
                  {QuickContact.map((item, idx) => (
                    <li key={idx} className="d-flex align-items-start mb-4">
                      <div className="me-3 mt-1">
                        <i className={`${item.icon} fs-3`} style={{ color: "#C8A047" }}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold m-0">{item.title}</h6>
                        <small>{item.subtitle}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 🗺️ Google Maps */}
            <div className="col-12 col-md-10 col-lg-6">
              <div className="h-100 shadow-sm rounded-3 overflow-hidden border">
                <iframe
                  src={config.mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "420px" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização no Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão de WhatsApp flutuante */}
      {config.whatsappNumber && (
        <a
          href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "15px",
            right: "20px",
            backgroundColor: "#25D366",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 1000,
            transition: "transform 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(0.8)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(0.8)")}
        >
          <FaWhatsapp />
        </a>
      )}
    </>
  );
};

export default ContactUs;
