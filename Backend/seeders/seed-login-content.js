"use strict";

module.exports = {
  async up(queryInterface) {
    const items = [
      { key: "login_heading", value: "Login na tua conta" },
      { key: "login_title", value: "LOGIN" },
      { key: "login_subtitle", value: "Entra com os teus dados." },
      { key: "label_email", value: "E-MAIL *" },
      { key: "label_password", value: "PASSWORD *" },
      { key: "placeholder_email", value: "O teu email" },
      { key: "placeholder_password", value: "A tua password" },
      { key: "button_login", value: "LOGIN" },
      { key: "link_forgot", value: "Esqueci a senha" },
      { key: "text_new_user", value: "És novo aqui?" },
      { key: "link_register", value: "Cria a tua conta." },
      { key: "recovery_title", value: "RECUPERAR PASSWORD" },
      { key: "recovery_subtitle", value: "Enviaremos um e-mail para redefinir" },
      { key: "button_back", value: "Voltar" },
      { key: "button_submit", value: "Submeter" },
    ];

    await queryInterface.bulkInsert(
      "LoginContents",
      items.map((i) => ({
        key: i.key,
        value: i.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("LoginContents", null, {});
  },
};
