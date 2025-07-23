"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("ContactSectionConfigs", [
      {
        title: "Entre em Contacto",
        subtitle: "Estamos aqui para responder às suas dúvidas.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("ContactSectionConfigs", null, {});
  },
};
