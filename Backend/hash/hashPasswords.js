const bcrypt = require("bcrypt");
const db = require("../models");

(async () => {
  const utilizadores = await db.Utilizador.findAll();

  for (const user of utilizadores) {
    const pass = user.password;

    // Se já estiver em formato bcrypt, ignora
    if (pass.startsWith("$2b$")) {
      console.log(`${user.email}: já tem hash`);
      continue;
    }

    // Senão, encripta e atualiza
    const hash = await bcrypt.hash(pass, 10);
    user.password = hash;
    await user.save();
    console.log(`✅ ${user.email} atualizado`);
  }

  process.exit();
})();
