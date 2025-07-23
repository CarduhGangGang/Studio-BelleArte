"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("BookingPage2Configs", [
      {
        titulo: "Agendamento confirmado!",
        subtitulo: "Consulta os teus agendamentos abaixo.",
        label_agendamentos: "Os teus agendamentos",
        msg_sem_agendamentos: "Nenhum agendamento encontrado.",
        btn_editar: "Editar",
        btn_apagar: "Cancelar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("BookingPage2Configs", null, {});
  },
};
