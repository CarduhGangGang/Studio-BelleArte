// src/pages/BookingPage3.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookingPage3Config } from "../services/api/bookingPage3Config";
import { motion } from "framer-motion";

const BookingPage3 = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    titulo: "Reserva efetuada com sucesso!",
    descricao: "Entraremos em contacto contigo se necessário.",
    texto_botao: "Voltar à Página Inicial",
  });

  useEffect(() => {
    document.title = "Reserva concluída ✅";

    const fetchData = async () => {
      try {
        const data = await getBookingPage3Config();
        setConfig({
          titulo: data.titulo,
          descricao: data.descricao,
          texto_botao: data.texto_botao,
        });
      } catch {
        console.warn("⚠️ Erro ao buscar configuração da página 3. Usando valores padrão.");
      }
    };

    fetchData();
  }, []);

  const handleVoltarInicio = () => {
    navigate("/");
  };

  return (
    <div id="done" className="tab-pane step-content text-center">
      <motion.div
        className="successful-box"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="successful-check"
          animate={{ rotate: [0, 20, -20, 0] }}
          transition={{ repeat: 2, duration: 0.6 }}
        >
          <i className="ti-check" style={{ fontSize: "48px", color: "#28a745" }}></i>
        </motion.div>
        <h2 className="mt-3">{config.titulo}</h2>
        <p className="text-muted">{config.descricao}</p>

        <motion.button
          onClick={handleVoltarInicio}
          className="btn btn-dark mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {config.texto_botao}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingPage3;
