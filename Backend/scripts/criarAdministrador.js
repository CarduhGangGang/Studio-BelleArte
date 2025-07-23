const bcrypt = require("bcrypt");
const db = require("../models");

const criarAdministrador = async () => {
  try {
    const email = "admin@admin.pt";
    const password = "adminpass";
    const nome = "Administrador Geral";

    const existente = await db.Utilizador.findOne({ where: { email } });
    if (existente) {
      console.log("ℹ️ Administrador já existe.");
      process.exit(0);
    }

    const hash = await bcrypt.hash(password, 10);

    await db.Utilizador.create({
      nome,
      email,
      password: hash,
      role_id: 1, // Administrador
    });

    console.log(`✅ Administrador criado: ${email} | senha: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao criar administrador:", err);
    process.exit(1);
  }
};

criarAdministrador();
