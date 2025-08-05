'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Servicos', [
      {
        nome: 'Corte Masculino',
        descricao: 'Corte clássico e moderno para homens, feito por profissionais experientes.',
        duracao: 35,
        preco: 15.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604410137.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barba e Bigode',
        descricao: 'Modelagem e alinhamento de barba e bigode com toalha quente.',
        duracao: 25,
        preco: 10.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Coloração Capilar',
        descricao: 'Transforme seu visual com tinturas de alta qualidade e durabilidade.',
        duracao: 55,
        preco: 60.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cuidados com a Pele',
        descricao: 'Tratamento facial relaxante para revitalizar a sua pele.',
        duracao: 25,
        preco: 30.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Toalha Quente',
        descricao: 'Serviço relaxante com toalha quente para abrir os poros e suavizar a barba.',
        duracao: 12,
        preco: 15.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752583941511.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Aparar e Modelar',
        descricao: 'Ajuste fino do corte e estilo, ideal para manutenção regular.',
        duracao: 20,
        preco: 20.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584112418.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cortes com Tesoura',
        descricao: 'Técnica artesanal com tesoura para cortes personalizados e refinados.',
        duracao: 45,
        preco: 45.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584060908.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Lavagem Capilar',
        descricao: 'Lavagem com produtos profissionais para um couro cabeludo saudável.',
        duracao: 12,
        preco: 12.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584036617.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barbearia Premium',
        descricao: 'Pacote completo com corte, barba, cuidados com a pele e mais.',
        duracao: 70,
        preco: 90.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584019498.jpg?...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Estilo Personalizado',
        descricao: 'Crie um visual único com nossos especialistas em estilo masculino.',
        duracao: 60,
        preco: 70.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584019498.jpg?...',
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
