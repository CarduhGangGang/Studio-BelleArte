"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      INSERT INTO "Roles" (id, descricao, "createdAt", "updatedAt")
      VALUES
        (1, 'Administrador', NOW(), NOW()),
        (2, 'Colaborador', NOW(), NOW()),
        (3, 'Cliente', NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    `);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Roles", {
      id: [1, 2, 3],
    });
  }
};
