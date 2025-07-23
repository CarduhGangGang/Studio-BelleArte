'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Servicos', [
      {
        nome: 'Corte Masculino',
        duracao: 35,
        preco: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barba e Bigode',
        duracao: 25,
        preco: 10.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Coloração Capilar',
        duracao: 55,
        preco: 60.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cuidados com a Pele',
        duracao: 25,
        preco: 30.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Toalha Quente',
        duracao: 12,
        preco: 15.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Aparar e Modelar',
        duracao: 20,
        preco: 20.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cortes com Tesoura',
        duracao: 45,
        preco: 45.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Lavagem Capilar',
        duracao: 12,
        preco: 12.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barbearia Premium',
        duracao: 70,
        preco: 90.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Estilo Personalizado',
        duracao: 60,
        preco: 70.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Servicos', {
      nome: [
        'Corte Masculino',
        'Barba e Bigode',
        'Coloração Capilar',
        'Cuidados com a Pele',
        'Toalha Quente',
        'Aparar e Modelar',
        'Cortes com Tesoura',
        'Lavagem Capilar',
        'Barbearia Premium',
        'Estilo Personalizado'
      ]
    });
  }
};
