"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
require("dotenv").config();

const basename = path.basename(__filename);
const db = {};

let sequelize;

// 🔹 Conexão com PostgreSQL (Render/Produção ou Local)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    dialectOptions: {
      ssl: process.env.RENDER
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 5432,
      dialect: "postgres",
      logging: false,
    }
  );
}

// 🔸 Carregamento automático de todos os modelos
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

// 🔸 Modelos manuais que não carregaram automaticamente
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

// 🔸 Executar associações se existirem
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

// 🔸 Exportar DB + conexão Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
