"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("PortfolioImages", [
      {
        imageUrl: "", // ou use uma URL completa (https)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "", // substitua se tiver link público (ex: Cloudinary, Imgur etc.)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("PortfolioImages", null, {});
  },
};
