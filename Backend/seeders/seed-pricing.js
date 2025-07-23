"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("Pricings", [
      {
        title: "Corte Masculino",
        duration: "30 – 40 minutos",
        price: "€15,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Barba e Bigode",
        duration: "20 – 30 minutos",
        price: "€10,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Coloração Capilar",
        duration: "45 – 60 minutos",
        price: "€60,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cuidados com a Pele",
        duration: "20 – 30 minutos",
        price: "€30,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Toalha Quente",
        duration: "10 – 15 minutos",
        price: "€15,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Aparar e Modelar",
        duration: "15 – 25 minutos",
        price: "€20,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Cortes com Tesoura",
        duration: "40 – 50 minutos",
        price: "€45,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Lavagem Capilar",
        duration: "10 – 15 minutos",
        price: "€12,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Barbearia Premium",
        duration: "60 – 80 minutos",
        price: "€90,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Estilo Personalizado",
        duration: "50 – 70 minutos",
        price: "€70,00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Pricings", null, {});
  },
};
