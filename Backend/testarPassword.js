const bcrypt = require("bcrypt");

// Copia o hash da base de dados aqui
const hash = "$2b$10$GOePDiOs9.PLrBDbkaJuB.zxZaL4SfHGrukt8WqWiwIksC9ax8QEq";
const plainPassword = "adminpass";

bcrypt.compare(plainPassword, hash).then(result => {
  console.log(result ? "✅ Password correta" : "❌ Password incorreta");
});
