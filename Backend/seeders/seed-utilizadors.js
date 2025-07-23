"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface) {
    // Todos os utilizadores: admin, colaboradores e clientes
    const utilizadores = [
      // ✅ Administrador
      { nome: "Administrador Geral", email: "admin@admin.pt", password: "adminpass", role_id: 1 },

      // ✅ Colaboradores
      { nome: "Lucas Ferreira", email: "lucas@studio.pt", password: "lucas123", role_id: 2 },
      { nome: "Miguel Santos", email: "miguel@studio.pt", password: "miguel123", role_id: 2 },
      { nome: "Pedro Matos", email: "pedro@studio.pt", password: "pedro123", role_id: 2 },
      { nome: "João Almeida", email: "joao@studio.pt", password: "joao123", role_id: 2 },
      { nome: "Rafael Costa", email: "rafael@studio.pt", password: "rafael123", role_id: 2 },

      // ✅ Clientes
      { nome: "Daniel Moreira", email: "daniel@cliente.pt", password: "daniel123", role_id: 3 },
      { nome: "Fábio Gonçalves", email: "fabio@cliente.pt", password: "fabio123", role_id: 3 },
      { nome: "Paulo Cardoso", email: "paulo@cliente.pt", password: "paulo123", role_id: 3 },
      { nome: "Vítor Sousa", email: "vitor@cliente.pt", password: "vitor123", role_id: 3 },
      { nome: "Nuno Teixeira", email: "nuno@cliente.pt", password: "nuno123", role_id: 3 },
      { nome: "Bruno Pires", email: "brunopires@cliente.pt", password: "brunopires123", role_id: 3 },
      { nome: "Alexandre Pinto", email: "alexandre@cliente.pt", password: "alexandre123", role_id: 3 },
      { nome: "Fernando Marques", email: "fernando@cliente.pt", password: "fernando123", role_id: 3 },
      { nome: "Marco Barros", email: "marco@cliente.pt", password: "marco123", role_id: 3 },
      { nome: "Sérgio Cruz", email: "sergio@cliente.pt", password: "sergio123", role_id: 3 },
    ];

    // Criação com hash
    const utilizadoresHashed = await Promise.all(
      utilizadores.map(async (u) => ({
        nome: u.nome,
        email: u.email,
        password: await bcrypt.hash(u.password, 10),
        role_id: u.role_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    await queryInterface.bulkInsert("Utilizadors", utilizadoresHashed);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Utilizadors", {
      email: [
        "admin@admin.pt",
        "lucas@studio.pt",
        "miguel@studio.pt",
        "pedro@studio.pt",
        "joao@studio.pt",
        "rafael@studio.pt",
        "daniel@cliente.pt",
        "fabio@cliente.pt",
        "paulo@cliente.pt",
        "vitor@cliente.pt",
        "nuno@cliente.pt",
        "brunopires@cliente.pt",
        "alexandre@cliente.pt",
        "fernando@cliente.pt",
        "marco@cliente.pt",
        "sergio@cliente.pt",
      ],
    });
  },
};
