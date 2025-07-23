'use strict';

module.exports = {
  up: async (queryInterface) => {
    const timestamp = new Date();

    const contents = [
      { key: 'register_heading', value: 'Cria a tua conta', createdAt: timestamp, updatedAt: timestamp },
      { key: 'register_title', value: 'INFORMAÇÕES PESSOAIS', createdAt: timestamp, updatedAt: timestamp },
      { key: 'register_subtitle', value: 'Preenche os teus dados abaixo.', createdAt: timestamp, updatedAt: timestamp },
      { key: 'label_first_name', value: 'Primeiro Nome *', createdAt: timestamp, updatedAt: timestamp },
      { key: 'label_last_name', value: 'Último Nome *', createdAt: timestamp, updatedAt: timestamp },
      { key: 'label_email', value: 'E-MAIL *', createdAt: timestamp, updatedAt: timestamp },
      { key: 'label_password', value: 'PASSWORD *', createdAt: timestamp, updatedAt: timestamp },
      { key: 'label_confirm_password', value: 'CONFIRMAR PASSWORD *', createdAt: timestamp, updatedAt: timestamp },
      { key: 'placeholder_first_name', value: 'Primeiro nome', createdAt: timestamp, updatedAt: timestamp },
      { key: 'placeholder_last_name', value: 'Último nome', createdAt: timestamp, updatedAt: timestamp },
      { key: 'placeholder_email', value: 'O teu email', createdAt: timestamp, updatedAt: timestamp },
      { key: 'placeholder_password', value: 'A tua password', createdAt: timestamp, updatedAt: timestamp },
      { key: 'placeholder_confirm_password', value: 'Repete a tua password', createdAt: timestamp, updatedAt: timestamp },
      { key: 'button_register', value: 'REGISTAR', createdAt: timestamp, updatedAt: timestamp },
      { key: 'text_login_prompt', value: 'Já tens conta?', createdAt: timestamp, updatedAt: timestamp },
      { key: 'link_login', value: 'Entra aqui.', createdAt: timestamp, updatedAt: timestamp },
    ];

    await queryInterface.bulkInsert('register_contents', contents);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('register_contents', null, {});
  },
};
