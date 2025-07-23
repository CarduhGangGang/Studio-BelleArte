type PainelProps = {
  setActiveTab: (tab: "agenda" | "indisponibilidades" | "ferias") => void;
};

const Painel = ({ setActiveTab }: PainelProps) => {
  // Recupera o nome do utilizador que fez login
  const nomeRaw = localStorage.getItem("nome") || "Utilizador";
  const nomeFormatado = nomeRaw.charAt(0).toUpperCase() + nomeRaw.slice(1);

  return (
    <div className="mb-4">
      {/* Saudação personalizada */}
      <h2 className="fw-bold mb-3 text-md-start fs-4 fs-md-3">
        👋 Bem-vindo, {nomeFormatado}!
      </h2>

      <p className="text-muted mb-4 text-md-start fs-6 fs-md-6">
        Explore funcionalidades, agende horários e mantenha o seu trabalho organizado.
      </p>

      <div className="row g-3 g-md-4">
        {/* 📅 Agenda */}
        <div className="col-12 col-md-4">
          <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold fs-6">📅 Próximos Agendamentos</h5>
              <p className="text-muted small mb-3">
                Veja as marcações previstas para hoje e amanhã.
              </p>
            </div>
            <button
              className="btn btn-outline-primary w-100 py-2"
              onClick={() => setActiveTab("agenda")}
            >
              Ver Agenda
            </button>
          </div>
        </div>

        {/* ⛔ Indisponibilidades */}
        <div className="col-12 col-md-4">
          <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold fs-6">⛔ Indisponibilidades</h5>
              <p className="text-muted small mb-3">
                Atualize os dias em que não estará disponível.
              </p>
            </div>
            <button
              className="btn btn-outline-warning w-100 py-2"
              onClick={() => setActiveTab("indisponibilidades")}
            >
              Gerir Indisponibilidade
            </button>
          </div>
        </div>

        {/* 🌴 Férias */}
        <div className="col-12 col-md-4">
          <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold fs-6">🌴 Próximas Férias</h5>
              <p className="text-muted small mb-3">
                Planeie e registre as suas férias com antecedência.
              </p>
            </div>
            <button
              className="btn btn-outline-success w-100 py-2"
              onClick={() => setActiveTab("ferias")}
            >
              Planear Férias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Painel;
