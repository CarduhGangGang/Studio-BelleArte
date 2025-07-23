"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (!table.coluna) {
      await queryInterface.addColumn("Agendamentos", "coluna", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Semana",
      });
    } else {
      console.log("ℹ️ A coluna 'coluna' já existe. Ignorando.");
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (table.coluna) {
      await queryInterface.removeColumn("Agendamentos", "coluna");
    }
  },
};
