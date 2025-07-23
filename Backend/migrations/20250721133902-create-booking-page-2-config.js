"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookingPage2Configs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label_agendamentos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      msg_sem_agendamentos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      btn_editar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      btn_apagar: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("BookingPage2Configs");
  },
};
