"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const db = {};

let sequelize;

// 🔹 Conexão com PostgreSQL (Render com variáveis individuais)
sequelize = new Sequelize(
  process.env.DB_NAME,       // studio_maky
  process.env.DB_USER,       // studio_user
  process.env.DB_PASSWORD,   // kLjDsc88LLxGMZUNjGcNv154ONrieS6U
  {
    host: process.env.DB_HOST,      // dpg-d24uqlp5pdvs73c9p9pg-a.frankfurt-postgres.render.com
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

console.log("🌍 Conectando ao PostgreSQL via variáveis de ambiente");

// 🔸 Carrega todos os modelos automaticamente da pasta
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js") &&
      !file.endsWith(".test.js")
  )
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    try {
      const modelFn = require(modelPath);
      if (typeof modelFn !== "function") {
        console.warn(`⚠️ Modelo inválido ignorado: ${file}`);
        return;
      }
      const model = modelFn(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`✅ Modelo carregado: ${model.name}`);
    } catch (err) {
      console.error(`❌ Erro ao carregar modelo ${file}: ${err.message}`);
    }
  });

// 🔸 Modelos adicionais (caso não detectados automaticamente)
const manualModels = [
  "Header",
  "BannerService",
  "TeamSection",
  "TeamMember",
  "AboutHistory",
  "ContactSectionConfig",
  "BookingPage1Config",
  "BookingPage2Config",
  "BookingPage3Config",
  "Footer",
  "MenuItem",
  "Logo",
  "ServiceList",
  "Service",
  "ServiceSectionConfig",
  "Servico",
];

manualModels.forEach((name) => {
  if (!db[name]) {
    try {
      const model = require(`./${name}`)(sequelize, Sequelize.DataTypes);
      db[name] = model;
      console.log(`✅ Modelo manual carregado: ${name}`);
    } catch (err) {
      console.warn(`⚠️ Falha ao carregar modelo manual ${name}: ${err.message}`);
    }
  }
});

// 🔸 Executar associações entre modelos (se existirem)
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

// 🔸 Exportar instância do Sequelize e os modelos
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
