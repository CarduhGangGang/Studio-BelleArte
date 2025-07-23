import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IMAGE } from "../constent/theme";
import '../App.css';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date("2025-12-01T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${IMAGE.coming_soonBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div className="position-relative z-2 px-3">
        {/* Logotipo */}
        <img
          src="/images/logo-black.png"
          alt="Studio BelleArte"
          className="mb-4"
          style={{ width: "160px", filter: "invert(100%) brightness(200%)" }}
        />

        <h1 className="fw-bold text-white">Studio BelleArte</h1>
        <h4 className="text-gold mb-3" style={{ color: "#C8A047" }}>
          Em breve: onde o estilo encontra a excelência
        </h4>

        {/* Contagem */}
        <div className="d-flex justify-content-center gap-4 my-4 flex-wrap">
          {[
            { label: "Dias", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "#C8A047",
                  minWidth: "70px",
                }}
              >
                {item.value.toString().padStart(2, "0")}
              </div>
              <small className="text-white">{item.label}</small>
            </div>
          ))}
        </div>

        {/* Redes Sociais */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="https://www.facebook.com" target="_blank">
            <i className="ti-facebook" style={{ fontSize: "1.5rem", color: "#fff" }}></i>
          </Link>
          <Link to="https://www.instagram.com" target="_blank">
            <i className="ti-instagram" style={{ fontSize: "1.5rem", color: "#fff" }}></i>
          </Link>
          <Link to="mailto:info@bellearte.pt" target="_blank">
            <i className="ti-email" style={{ fontSize: "1.5rem", color: "#fff" }}></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
