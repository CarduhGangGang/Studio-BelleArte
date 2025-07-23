"use strict";

module.exports = {
  async up(queryInterface) {
    const colaboradores = await queryInterface.sequelize.query(
      `SELECT id FROM "Utilizadors" WHERE role_id = 2`
    );

    const colab1 = colaboradores[0][0];
    const colab2 = colaboradores[0][1];

    await queryInterface.bulkInsert("Indisponibilidades", [
      {
        data_hora: "2025-07-20T09:00:00",
        colaborador_id: colab1.id,
        motivo: "Férias",
        coluna: "Semana",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-21T14:30:00",
        colaborador_id: colab2.id,
        motivo: "Doença (gripe)",
        coluna: "Semana",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        data_hora: "2025-07-22T10:00:00",
        colaborador_id: colab1.id,
        motivo: "Formação interna",
        coluna: "EmAndamento",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Indisponibilidades", null, {});
  }
};
