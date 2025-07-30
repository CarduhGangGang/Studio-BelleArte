'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config(); // 🔹 Garante que o .env seja carregado

const basename = path.basename(__filename);
const db = {};

let sequelize;

// 🔹 Conexão via DATABASE_URL (usada no Render)
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: process.env.RENDER ? { require: true, rejectUnauthorized: false } : false,
    },
  });
} else {
  // 🔹 Fallback local (útil para desenvolvimento local)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      dialect: 'postgres',
      logging: false,
    }
  );
}

// 🔹 Carregar modelos automaticamente
fs
  .readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  )
  .forEach(file => {
    const filePath = path.join(__dirname, file);
    console.log(`🔍 A carregar modelo: ${file}`);

    try {
      const modelFn = require(filePath);

      if (typeof modelFn !== 'function') {
        console.warn(`⚠️ ${file} não exporta uma função.`);
        return;
      }

      const model = modelFn(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } catch (err) {
      console.error(`❌ Erro ao carregar modelo ${file}:`, err.message);
    }
  });

// 🔹 Carregar modelos manualmente (caso necessário)
const manualModels = [
  { name: 'Header', path: './Header' },
  { name: 'BannerService', path: './BannerService' },
  { name: 'TeamSection', path: './TeamSection' },
  { name: 'AboutHistory', path: './aboutHistory' },
  { name: 'ContactSectionConfig', path: './contactSectionConfig' },
  { name: 'BookingPage1Config', path: './BookingPage1Config' },
  { name: 'BookingPage2Config', path: './BookingPage2Config' },
  { name: 'BookingPage3Config', path: './BookingPage3Config' },
  { name: 'Footer', path: './Footer' },
];

manualModels.forEach(({ name, path: modelPath }) => {
  if (!db[name]) {
    try {
      const model = require(modelPath)(sequelize, Sequelize.DataTypes);
      db[name] = model;
      console.log(`✅ Modelo ${name} carregado manualmente.`);
    } catch (err) {
      console.warn(`⚠️ Falha ao carregar modelo manual ${name}:`, err.message);
    }
  }
});

// 🔹 Aplicar associações (relacionamentos)
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

// 🔹 Exportar o objeto db com a instância do Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
