import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";

const BookingPage3 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Reserva concluída ✅";
  }, []);

  const handleVoltarInicio = () => {
    navigate("/"); // ✅ Redireciona para o início
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
        <h2 className="mt-3">Reserva efetuada com sucesso!</h2>
        <p className="text-muted">Entraremos em contacto contigo se necessário.</p>

        <motion.button
          onClick={handleVoltarInicio}
          className="btn btn-dark mt-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Voltar à Página Inicial
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingPage3;
