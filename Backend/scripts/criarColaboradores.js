const bcrypt = require("bcrypt");
const db = require("../models");

const criarColaboradores = async () => {
  try {
    const colaboradores = [
      { nome: "Lucas Ferreira", email: "lucas@studio.pt", password: "lucas123" },
      { nome: "Miguel Santos", email: "miguel@studio.pt", password: "miguel123" },
      { nome: "Pedro Matos", email: "pedro@studio.pt", password: "pedro123" },
      { nome: "João Almeida", email: "joao@studio.pt", password: "joao123" },
      { nome: "Rafael Costa", email: "rafael@studio.pt", password: "rafael123" },
    ];

    for (const colab of colaboradores) {
      const existe = await db.Utilizador.findOne({ where: { email: colab.email } });
      if (!existe) {
        const hash = await bcrypt.hash(colab.password, 10);
        await db.Utilizador.create({
          nome: colab.nome,
          email: colab.email,
          password: hash,
          role_id: 2, // Colaborador
        });
        console.log(`✅ Colaborador criado: ${colab.email} | senha: ${colab.password}`);
      } else {
        console.log(`ℹ️ Colaborador já existe: ${colab.email}`);
      }
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao criar colaboradores:", err);
    process.exit(1);
  }
};

criarColaboradores();
