'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('booking_page_1_config', [{
      titulo: 'BOOKING',
      descricao: 'Por favor seleciona o serviço que desejas:',
      label_servico: 'Serviço',
      label_colaborador: 'Colaborador',
      label_data: 'Data',
      label_hora_disponivel: 'Hora disponível:',
      btn_agendar: 'Agendar',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('booking_page_1_config', null, {});
  },
};
