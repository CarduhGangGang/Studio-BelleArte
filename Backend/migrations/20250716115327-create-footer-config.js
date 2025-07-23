'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Footers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      logoUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phrase: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sectionEmpresa: {
        type: Sequelize.JSON,
        allowNull: true
      },
      sectionLinks: {
        type: Sequelize.JSON,
        allowNull: true
      },
      sectionContactos: {
        type: Sequelize.JSON,
        allowNull: true
      },
      socialMedia: {
        type: Sequelize.JSON,
        allowNull: true
      },
      copyright: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Footers');
  }
};
