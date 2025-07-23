const bcrypt = require("bcrypt");

(async () => {
  const plainPassword = "colaborador123";
  const hashed = await bcrypt.hash(plainPassword, 10);
  console.log("Hash bcrypt:", hashed);
})();
