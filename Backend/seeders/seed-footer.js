'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Footers', [{
      logoUrl: '/uploads/logo.png',
      phrase: 'A sua beleza, o nosso compromisso.',
      sectionEmpresa: {
        title: 'Empresa',
        links: [
          { label: 'Sobre nós', url: '/sobre' },
          { label: 'Serviços', url: '/servicos' }
        ]
      },
      sectionLinks: {
        title: 'Links Úteis',
        links: [
          { label: 'Agendar', url: '/agendar' },
          { label: 'Contacto', url: '/contacto' }
        ]
      },
      sectionContactos: {
        title: 'Contactos',
        content: [
          'Rua Exemplo, 123',
          'Lisboa, Portugal',
          'Tel: 912 345 678',
          'Email: info@studio.pt'
        ]
      },
      socialMedia: [
        { platform: 'instagram', url: 'https://instagram.com/studiobellearte' },
        { platform: 'tiktok', url: 'https://tiktok.com/@studiobellearte' }
      ],
      copyright: '© 2025 Studio Belle Arte. Todos os direitos reservados.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Footers', null, {});
  }
};
