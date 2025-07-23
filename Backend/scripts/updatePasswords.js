const bcrypt = require("bcrypt");
const db = require("../models");

async function atualizarPasswords() {
  const utilizadores = await db.Utilizador.findAll();

  for (const user of utilizadores) {
    if (!user.password.startsWith("$2b$")) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
      await user.save();
      console.log(`✔️ Atualizada password de ${user.email}`);
    }
  }

  console.log("✅ Fim da atualização.");
}

atualizarPasswords();
