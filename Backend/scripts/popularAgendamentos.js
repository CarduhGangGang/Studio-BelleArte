// scripts/popularAgendamentos.js
require("dotenv").config();
const db = require("../models");

(async () => {
  try {
    await db.sequelize.sync(); // Garante que tudo está em dia

    const agendamentos = [
      {
        data_hora: new Date(Date.now() + 3600000), // +1 hora
        cliente_id: 1,
        colaborador_id: 2,
        servico_id: 1,
        estado: "pendente",
        coluna: "Semana",
      },
      {
        data_hora: new Date(Date.now() + 7200000), // +2 horas
        cliente_id: 1,
        colaborador_id: 2,
        servico_id: 2,
        estado: "pendente",
        coluna: "EmAndamento",
      },
      {
        data_hora: new Date(Date.now() + 10800000), // +3 horas
        cliente_id: 3,
        colaborador_id: 2,
        servico_id: 1,
        estado: "concluido",
        coluna: "Concluido",
      },
    ];

    for (const ag of agendamentos) {
      await db.Agendamento.create(ag);
    }

    console.log("✅ Agendamentos criados com sucesso");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao criar agendamentos:", err);
    process.exit(1);
  }
})();
