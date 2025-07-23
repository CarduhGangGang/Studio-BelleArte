const bcrypt = require("bcrypt");
const db = require("../models");

const criarClientes = async () => {
  try {
    const clientes = [
      { nome: "Daniel Moreira", email: "daniel@cliente.pt", password: "daniel123" },
      { nome: "Fábio Gonçalves", email: "fabio@cliente.pt", password: "fabio123" },
      { nome: "Paulo Cardoso", email: "paulo@cliente.pt", password: "paulo123" },
      { nome: "Vítor Sousa", email: "vitor@cliente.pt", password: "vitor123" },
      { nome: "Nuno Teixeira", email: "nuno@cliente.pt", password: "nuno123" },
      { nome: "Bruno Pires", email: "brunopires@cliente.pt", password: "brunopires123" },
      { nome: "Alexandre Pinto", email: "alexandre@cliente.pt", password: "alexandre123" },
      { nome: "Fernando Marques", email: "fernando@cliente.pt", password: "fernando123" },
      { nome: "Marco Barros", email: "marco@cliente.pt", password: "marco123" },
      { nome: "Sérgio Cruz", email: "sergio@cliente.pt", password: "sergio123" },
    ];

    for (const cliente of clientes) {
      const existe = await db.Utilizador.findOne({ where: { email: cliente.email } });
      if (!existe) {
        const hash = await bcrypt.hash(cliente.password, 10);
        await db.Utilizador.create({
          nome: cliente.nome,
          email: cliente.email,
          password: hash,
          role_id: 3, // Cliente
        });
        console.log(`✅ Cliente criado: ${cliente.email} | senha: ${cliente.password}`);
      } else {
        console.log(`ℹ️ Cliente já existe: ${cliente.email}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao criar clientes:", err);
    process.exit(1);
  }
};

criarClientes();
