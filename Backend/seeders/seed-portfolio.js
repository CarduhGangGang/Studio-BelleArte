"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("PortfolioSectionConfigs", [
      {
        title: "Nosso Portfólio",
        subtitle: "Alguns dos nossos melhores trabalhos e clientes satisfeitos.",
        description: "Veja como transformamos estilos e criamos looks únicos.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("PortfolioSectionConfigs", null, {});
  },
};
