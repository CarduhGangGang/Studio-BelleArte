module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("ContactSectionConfigs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: Sequelize.STRING,
      subtitle: Sequelize.TEXT,
      whatsappNumber: Sequelize.STRING,
      address: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.STRING,
      mapsEmbedUrl: Sequelize.TEXT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("ContactSectionConfigs");
  },
};
