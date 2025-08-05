'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_sections', [
      {
        title: 'A Nossa Equipa',
        description: 'Barbeiros que respiram estilo e dedicação. Aqui o corte é arte.',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('team_members', [
      {
        name: 'Miguel Santos',
        role: 'Barbeiro Sênior',
        image_url: 'https://i.imgur.com/U1a0BdW.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lucas Ferreira',
        role: 'Especialista em Estilo Beard',
        image_url: 'https://i.imgur.com/olzvVx3.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rafael Costa',
        role: 'Corte Moderno',
        image_url: 'https://i.imgur.com/5aNz1DT.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'João Almeida',
        role: 'Mestre da Navalha',
        image_url: 'https://i.imgur.com/7QqHzqG.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pedro Matos',
        role: 'Barbeiro Criativo',
        image_url: 'https://i.imgur.com/zKxZQhz.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('team_sections', null, {});
    await queryInterface.bulkDelete('team_members', null, {});
  },
};
