'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Servicos', 'imageUrl', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Servicos', 'imageUrl', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
