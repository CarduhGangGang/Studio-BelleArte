"use strict";

module.exports = {
  async up(queryInterface) {
    // 🔧 Obtem IDs reais
    const [clientes] = await queryInterface.sequelize.query(`SELECT id FROM "Utilizadors" WHERE role_id = 3`);
    const [colaboradores] = await queryInterface.sequelize.query(`SELECT id FROM "Utilizadors" WHERE role_id = 2`);
    const [servicos] = await queryInterface.sequelize.query(`SELECT id FROM "Servicos"`);

    if (clientes.length < 2 || colaboradores.length < 2 || servicos.length < 3) {
      throw new Error("❌ Não há dados suficientes (clientes, colaboradores ou serviços) para agendamentos.");
    }

    const cliente1 = clientes[0];
    const cliente2 = clientes[1];
    const colab1 = colaboradores[0];
    const colab2 = colaboradores[1];
    const serv1 = servicos[0];
    const serv2 = servicos[1];
    const serv3 = servicos[2];

    await queryInterface.bulkInsert("Agendamentos", [
      {
        data_hora: "2025-07-15T09:00:00",
        cliente_id: cliente1.id,
        colaborador_id: colab1.id,
        servico_id: serv1.id,
        estado: "pendente",
        coluna: "Semana",
        notas: "Cliente pediu corte mais curto do que habitual.",
        telefone_cliente: "912345678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-15T10:30:00",
        cliente_id: cliente1.id,
        colaborador_id: colab1.id,
        servico_id: serv2.id,
        estado: "reagendado",
        coluna: "Semana",
        telefone_cliente: "912345678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-16T11:00:00",
        cliente_id: cliente2.id,
        colaborador_id: colab2.id,
        servico_id: serv1.id,
        estado: "cancelado",
        coluna: "Semana",
        notas: "Cliente ligou a cancelar devido a doença.",
        telefone_cliente: "915998877",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-17T14:00:00",
        cliente_id: cliente1.id,
        colaborador_id: colab2.id,
        servico_id: serv3.id,
        estado: "em andamento",
        coluna: "EmAndamento",
        telefone_cliente: "912345678",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-18T16:00:00",
        cliente_id: cliente2.id,
        colaborador_id: colab1.id,
        servico_id: serv2.id,
        estado: "concluido",
        coluna: "Concluido",
        feedback: "Serviço excelente, muito simpáticos!",
        avaliacao: 5,
        duracao_real: 85,
        telefone_cliente: "915998877",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Agendamentos", null, {});
  }
};
