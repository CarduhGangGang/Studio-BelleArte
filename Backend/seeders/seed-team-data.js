'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_sections', [
      {
        title: 'A Nossa Equipa',
        description: 'Barbeiros que respiram estilo e dedicação. Aqui o corte é arte.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('TeamMembers', [
      {
        name: 'Miguel Santos',
        role: 'Barbeiro Sênior',
        imageUrl: '', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lucas Ferreira',
        role: 'Especialista em Estilo Beard',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rafael Costa',
        role: 'Corte Moderno',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'João Almeida',
        role: 'Mestre da Navalha',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pedro Matos',
        role: 'Barbeiro Criativo',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('team_sections', null, {});
    await queryInterface.bulkDelete('TeamMembers', null, {});
  },
};
