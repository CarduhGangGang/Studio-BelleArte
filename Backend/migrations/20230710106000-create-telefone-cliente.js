"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (!table.telefone_cliente) {
      await queryInterface.addColumn("Agendamentos", "telefone_cliente", {
        type: Sequelize.STRING,
        allowNull: true,
      });
    } else {
      console.log("ℹ️ A coluna 'telefone_cliente' já existe. Ignorando.");
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (table.telefone_cliente) {
      await queryInterface.removeColumn("Agendamentos", "telefone_cliente");
    }
  },
};
