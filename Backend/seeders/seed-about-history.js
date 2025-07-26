'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove registros duplicados ou antigos antes de inserir
    await queryInterface.bulkDelete("AboutHistories", {
      title: "Nossa História",
    });

    // Insere novo conteúdo
    await queryInterface.bulkInsert("AboutHistories", [
      {
        title: "Nossa História",
        description:
          "A Studio BelleArte nasceu da paixão por transformar o cuidado masculino em uma verdadeira arte. Com uma equipe dedicada e especializada, buscamos proporcionar uma experiência única, aliando estilo, conforto e sofisticação. Desde o nosso início, temos como missão realçar a beleza e a confiança de cada cliente, respeitando sua individualidade e promovendo bem-estar.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("AboutHistories", {
      title: "Nossa História",
    });
  },
};
