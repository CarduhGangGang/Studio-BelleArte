const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 📁 Garante pasta de uploads
const uploadPath = path.resolve(__dirname, "public/uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Pasta 'public/uploads' criada automaticamente.");
}

// 🖼️ Servir arquivos estáticos
app.use("/uploads", express.static(uploadPath));

// 📦 Conexão DB
const db = require("./models");

// 🧩 Rotas
require("./loadRoutes")(app);

// 🔍 Rota de teste
app.get("/", (req, res) => {
  res.send("🎉 API Studio BelleArte está ativa!");
});

// ❌ Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada." });
});

// ❗ Erro global
app.use((err, req, res, next) => {
  console.error("❌ Erro global:", err.stack || err);
  res.status(500).json({ mensagem: "Erro interno do servidor." });
});

// 🚀 Inicialização
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados");
    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
})();
