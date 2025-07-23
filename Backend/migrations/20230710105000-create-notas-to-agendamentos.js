"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (!table.notas) {
      await queryInterface.addColumn("Agendamentos", "notas", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    } else {
      console.log("ℹ️ A coluna 'notas' já existe. Ignorando.");
    }

    if (!table.feedback) {
      await queryInterface.addColumn("Agendamentos", "feedback", {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    } else {
      console.log("ℹ️ A coluna 'feedback' já existe. Ignorando.");
    }

    if (!table.avaliacao) {
      await queryInterface.addColumn("Agendamentos", "avaliacao", {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      });
    } else {
      console.log("ℹ️ A coluna 'avaliacao' já existe. Ignorando.");
    }

    if (!table.duracao_real) {
      await queryInterface.addColumn("Agendamentos", "duracao_real", {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    } else {
      console.log("ℹ️ A coluna 'duracao_real' já existe. Ignorando.");
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("Agendamentos");

    if (table.notas) {
      await queryInterface.removeColumn("Agendamentos", "notas");
    }
    if (table.feedback) {
      await queryInterface.removeColumn("Agendamentos", "feedback");
    }
    if (table.avaliacao) {
      await queryInterface.removeColumn("Agendamentos", "avaliacao");
    }
    if (table.duracao_real) {
      await queryInterface.removeColumn("Agendamentos", "duracao_real");
    }
  },
};
