'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Servicos', [
      {
        nome: 'Corte Masculino',
        duracao: 35,
        preco: 15.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604410137.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNjA0NDEwMTM3LmpwZyIsImlhdCI6MTc1NDQwNDkwNCwiZXhwIjoxNzg1OTQwOTA0fQ.6_4c-ox3VLodtBJNYD2KZKdCdz4-bZ959o1L-QUbqAY',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barba e Bigode',
        duracao: 25,
        preco: 10.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNjA0NDM2NjExLmpwZyIsImlhdCI6MTc1NDQwNDk0MSwiZXhwIjoxNzg1OTQwOTQxfQ.3WYwzakzwe9r-r1C58rDV0y63WgCEO3AFq3U17XROCc',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Coloração Capilar',
        duracao: 55,
        preco: 60.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNjA0NDM2NjExLmpwZyIsImlhdCI6MTc1NDQwNDk4OCwiZXhwIjoxNzg1OTQwOTg4fQ.iN2eY67XHrbUtwQRC4FsROMxi1UP3miPHbNDDKijvyM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cuidados com a Pele',
        duracao: 25,
        preco: 30.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752604436611.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNjA0NDM2NjExLmpwZyIsImlhdCI6MTc1NDQwNDk4OCwiZXhwIjoxNzg1OTQwOTg4fQ.iN2eY67XHrbUtwQRC4FsROMxi1UP3miPHbNDDKijvyM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Toalha Quente',
        duracao: 12,
        preco: 15.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752583941511.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTgzOTQxNTExLmpwZyIsImlhdCI6MTc1NDQwNDgyNywiZXhwIjoxNzg1OTQwODI3fQ.C7d9GOzLl8C3aw08PoqzhBgvlqTCq6iVStpFPAG9n9c',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Aparar e Modelar',
        duracao: 20,
        preco: 20.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584112418.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTg0MTEyNDE4LmpwZyIsImlhdCI6MTc1NDQwNDc3NCwiZXhwIjoxNzg1OTQwNzc0fQ.Y0BheNXver84O4xlA2G46xBwKCoMc-QnLQ1H4Gwu6Fk',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Cortes com Tesoura',
        duracao: 45,
        preco: 45.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584060908.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTg0MDYwOTA4LmpwZyIsImlhdCI6MTc1NDQwNTE3OCwiZXhwIjoxNzg1OTQxMTc4fQ.vhwxsKic1ln9yhm0MpYJgCygbe0fsFbteLGfdjsxEU0',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Lavagem Capilar',
        duracao: 12,
        preco: 12.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584036617.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTg0MDM2NjE3LmpwZyIsImlhdCI6MTc1NDQwNDgwNywiZXhwIjoxNzg1OTQwODA3fQ.EsCg5LMWobgwa7Pa6COBMqDMlOG4n6IB04Fk0aAnUro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Barbearia Premium',
        duracao: 70,
        preco: 90.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584019498.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTg0MDE5NDk4LmpwZyIsImlhdCI6MTc1NDQwNTIxOSwiZXhwIjoxNzg1OTQxMjE5fQ.vO6GPiDZVl-CBmBa7MK0WIEzyGBLuGjzznMsWNL0jnA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Estilo Personalizado',
        duracao: 60,
        preco: 70.00,
        imageUrl: 'https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/1752584019498.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy8xNzUyNTg0MDE5NDk4LmpwZyIsImlhdCI6MTc1NDQwNTIxOSwiZXhwIjoxNzg1OTQxMjE5fQ.vO6GPiDZVl-CBmBa7MK0WIEzyGBLuGjzznMsWNL0jnA',
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
