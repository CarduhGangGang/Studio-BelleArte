"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("QuoteSectionConfigs", [
      {
        title: "Somos o que repetidamente fazemos.",
        subtitle:
          "A excelência, portanto, não é um feito isolado, mas um hábito cultivado com disciplina e intenção.",
        author: "Aristóteles",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("QuoteSectionConfigs", null, {});
  },
};
