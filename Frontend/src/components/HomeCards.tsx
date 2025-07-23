// src/components/HomeCards.tsx
import { useEffect, useState } from "react";
import { getQuoteSection } from "../services/api/quoteSection";
import { motion } from "framer-motion";

export const HomeCards = () => {
  const [quote, setQuote] = useState<{
    title: string;
    subtitle: string;
    author: string;
  } | null>(null);

  useEffect(() => {
    getQuoteSection()
      .then(setQuote)
      .catch(() => console.error("Erro ao buscar citação"));
  }, []);

  if (!quote) return null;

  return (
    <div
      className="relative py-5 text-white overflow-hidden"
      style={{ backgroundColor: "#1c1c1c" }}
    >
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="mb-3">
            <i className="flaticon-barber text-4xl"></i>
          </div>
          <h2 className="text-3xl font-black">{quote.title}</h2>
          <p className="text-lg font-extrabold mt-2">
            {quote.subtitle} — {quote.author}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
