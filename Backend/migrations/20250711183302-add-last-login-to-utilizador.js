module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Utilizadors", "last_login", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Utilizadors", "last_login");
  },
};
