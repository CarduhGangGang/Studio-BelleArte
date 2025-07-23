import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper, Step } from "react-form-stepper";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";

import BookingPage1 from "../element/BookingPage1";
import BookingPage2 from "../element/BookingPage2";
import BookingPage3 from "../element/BookingPage3";
import { isLoggedIn } from "../utils/auth";

const Booking = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn("cliente")) navigate("/login");
  }, []);

  const goToNextStep = () => {
    if (step < pages.length - 1) {
      setStep(step + 1);
    }
  };

  const goToPrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const pages = [
    <BookingPage1 key="page1" goToNextStep={goToNextStep} setStepValid={() => {}} />,
    <BookingPage2 key="page2" setStepValid={() => {}} />,
    <BookingPage3 key="page3" setStepValid={() => {}} />,
  ];

  const stepLabels = [
    { icon: <FaCalendarAlt />, label: "Marcação" },
    { icon: <FaClipboardList />, label: "Agenda" },
    { icon: <FaCheckCircle />, label: "Concluído" },
  ];

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="d-flex justify-content-end mb-4">
        <button className="btn btn-outline-secondary" onClick={() => navigate("/")}>
          Sair
        </button>
      </div>

      <div className="mb-4">
        <Stepper
          activeStep={step}
          connectorStyleConfig={{
            disabledColor: "#ccc",
            activeColor: "#333",
            completedColor: "#333",
          }}
          styleConfig={{
            activeBgColor: "#f0f0f0",
            completedBgColor: "#e0e0e0",
            inactiveBgColor: "#f0f0f0",
            activeTextColor: "#000",
            completedTextColor: "#000",
            inactiveTextColor: "#aaa",
            size: "1.5em",
            circleFontSize: "1em",
            labelFontSize: "0.9em",
            borderRadius: "50%",
          }}
        >
          {stepLabels.map((s, idx) => (
            <Step key={idx} label={s.label} icon={s.icon} onClick={() => setStep(idx)} />
          ))}
        </Stepper>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {pages[step]}
        </motion.div>
      </AnimatePresence>

      <div className="d-flex justify-content-between border-top pt-4 mt-5">
        <button
          className="btn btn-outline-secondary"
          onClick={goToPrevStep}
          disabled={step === 0}
        >
          Anterior
        </button>

        <button
          className="btn btn-dark"
          onClick={goToNextStep}
          disabled={step === pages.length - 1}
        >
          Próximo
        </button>
      </div>
    </motion.div>
  );
};

export default Booking;
