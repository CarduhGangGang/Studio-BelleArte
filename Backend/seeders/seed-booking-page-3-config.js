"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("BookingPage3Config", [
      {
        titulo: "Reserva efetuada com sucesso!",
        descricao: "Entraremos em contacto contigo se necessário.",
        texto_botao: "Voltar à Página Inicial",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BookingPage3Config", null, {});
  },
};
