"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("PortfolioImages", [
      {
        imageUrl: "/uploads/portfolio1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "/uploads/portfolio2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "/uploads/portfolio3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "/uploads/portfolio4.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "/uploads/portfolio5.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "/uploads/portfolio6.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("PortfolioImages", null, {});
  },
};
