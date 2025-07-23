import React from "react";

type Props = {
  setActiveTab: (tab: "users" | "settings" | "reports" | "logs") => void;
};

const AdminPainel: React.FC<Props> = ({ setActiveTab }) => {
  // Recupera o nome do utilizador logado
  const nomeRaw = localStorage.getItem("nome") || "Utilizador";
  const nomeFormatado = nomeRaw.charAt(0).toUpperCase() + nomeRaw.slice(1);

  return (
    <div className="container py-4">
      {/* Saudação */}
      <h2 className="fw-bold mb-2">👋 Bem-vindo, {nomeFormatado}!</h2>
      <p className="text-muted mb-4">
        Explore funcionalidades, agende horários e mantenha o seu trabalho organizado.
      </p>
    </div>
  );
};

export default AdminPainel;
