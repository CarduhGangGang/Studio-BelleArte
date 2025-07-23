'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_section', [
      {
        title: 'A Nossa Equipa',
        description: 'Barbeiros que respiram estilo e dedicação. Aqui o corte é arte.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('team_members', [
      {
        name: 'Miguel Santos',
        role: 'Barbeiro Sênior',
        imageUrl: '/uploads/team/miguel.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lucas Ferreira',
        role: 'Especialista em Estilo Beard',
        imageUrl: '/uploads/team/lucas.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rafael Costa',
        role: 'Corte Moderno',
        imageUrl: '/uploads/team/rafael.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'João Almeida',
        role: 'Mestre da Navalha',
        imageUrl: '/uploads/team/joao.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pedro Matos',
        role: 'Barbeiro Criativo',
        imageUrl: '/uploads/team/pedro.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('team_section', null, {});
    await queryInterface.bulkDelete('team_members', null, {});
  },
};
