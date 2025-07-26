'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const db = {};
let sequelize;

// 🔹 Inicializar Sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// 🔹 Carregar modelos automaticamente (exceto este ficheiro e testes)
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

// 🔹 Carregar modelos manualmente (caso algum precise de atenção especial)
const manualModels = [
  { name: 'Header', path: './Header' },
  { name: 'BannerService', path: './BannerService' },
  { name: 'TeamSection', path: './TeamSection' },
  { name: 'AboutHistory', path: './aboutHistory' },
  { name: 'ContactSectionConfig', path: './contactSectionConfig' },
  { name: 'BookingPage1Config', path: './BookingPage1Config' },
  { name: 'BookingPage2Config', path: './BookingPage2Config' },
  { name: 'BookingPage3Config', path: './BookingPage3Config' },
  { name: 'Footer', path: './Footer' }, // ✅ Adicionado manualmente
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

// 🔹 Aplicar associações entre os modelos (se existirem)
Object.keys(db).forEach(modelName => {
  if (typeof db[modelName].associate === 'function') {
    db[modelName].associate(db);
  }
});

// 🔹 Exportar
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
