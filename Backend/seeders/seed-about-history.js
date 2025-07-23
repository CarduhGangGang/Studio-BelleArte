"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("AboutHistories", [
      {
        id: 1,
        title: "Nossa História",
        description: "A Studio BelleArte nasceu da paixão por transformar o cuidado masculino em uma verdadeira arte...",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AboutHistories", { id: 1 });
  },
};
