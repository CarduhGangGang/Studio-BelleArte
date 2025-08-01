require("dotenv").config();

const common = {
  dialect: "postgres",
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
};

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "studio",
    host: process.env.DB_HOST || "127.0.0.1",
    ...common,
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: "studio_test",
    host: process.env.DB_HOST || "127.0.0.1",
    ...common,
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "studio_prod",
    host: process.env.DB_HOST || "127.0.0.1",
    ...common,
  },
};
