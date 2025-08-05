"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("PortfolioImages", [
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/portfolio6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9wb3J0Zm9saW82LmpwZyIsImlhdCI6MTc1NDQxMzU1OSwiZXhwIjoxNzg1OTQ5NTU5fQ.SV3wJ28t0i5TVA0SwhdwHfsiBNabw7fAgk6OrfKnFHk",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/portfolio5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9wb3J0Zm9saW81LmpwZyIsImlhdCI6MTc1NDQxMzYwMCwiZXhwIjoxNzg1OTQ5NjAwfQ.-I1z2NMaJ019tCdIdARuPq7zs8eCucSF9lSmVmUsujM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/portfolio4.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9wb3J0Zm9saW80LmpwZyIsImlhdCI6MTc1NDQxMzYxOCwiZXhwIjoxNzg1OTQ5NjE4fQ.6FMXGS3PcPVa_czaEiJf0JMi81I73CnI_DzFfGAeZEs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/portfolio2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9wb3J0Zm9saW8yLmpwZyIsImlhdCI6MTc1NDQxMzY0MywiZXhwIjoxNzg1OTQ5NjQzfQ.trJzYwYBWCKv4Gj77e2vLDF3yQh1jd_mucKEkbXosr4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/portfolio1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9wb3J0Zm9saW8xLmpwZyIsImlhdCI6MTc1NDQxMzY3MCwiZXhwIjoxNzg1OTQ5NjcwfQ.KxAtC5NIXtasIUtkwb9FaLaAcDRra9YkOHzaTYZdpRY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        imageUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/sign/servicos/mao-com-eletrico-aparador.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jMmJhYTk3Ny0wNTU1LTQxNTgtOTJmMS02ZDNkY2I3NzI4MzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzZXJ2aWNvcy9tYW8tY29tLWVsZXRyaWNvLWFwYXJhZG9yLmpwZyIsImlhdCI6MTc1NDQxMzY4NywiZXhwIjoxNzg1OTQ5Njg3fQ.aFYdUw7clH8WGYYiNG0VfeeTUjb_Ku-WrHre5oVgt74",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("PortfolioImages", null, {});
  },
};
