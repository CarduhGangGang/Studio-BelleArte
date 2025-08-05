const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ✅ Middlewares globais
app.use(cors());
app.use(express.json());

// ✅ Criar pasta de uploads se não existir
const uploadPath = path.resolve(__dirname, "public/uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log("📁 Pasta 'public/uploads' criada automaticamente.");
}

// ✅ Servir arquivos estáticos
app.use("/uploads", express.static(uploadPath));

// ✅ Conectar ao banco de dados
const db = require("./models");

// ✅ Importar e aplicar rotas principais
app.use("/api/utilizador", require("./routes/utilizadorRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/agendamento", require("./routes/agendamentoRoutes"));
app.use("/api/servico", require("./routes/servicoRoutes"));
app.use("/api/service", require("./routes/serviceRoutes"));
app.use("/api/indisponibilidade", require("./routes/indisponibilidadeRoutes"));
app.use("/api/horarios", require("./routes/horarioRoutes"));
app.use("/api/holiday", require("./routes/holidayRoutes"));
app.use("/api/header", require("./routes/headerRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/home-slider", require("./routes/homeSliderRoutes"));
app.use("/api/quote-section", require("./routes/quoteSectionRoutes"));
app.use("/api/portfolio", require("./routes/portfolioRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/banner", require("./routes/bannerRoutes"));
app.use("/api/service-list", require("./routes/serviceListRoutes"));
app.use("/api/about", require("./routes/about.routes"));
app.use("/api/pricing", require("./routes/pricingRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/login-content", require("./routes/loginContentRoutes"));
app.use("/api/contact-section", require("./routes/contactSectionRoutes"));
app.use("/api/team-section", require("./routes/teamSection"));
app.use("/api/booking-page-1-config", require("./routes/bookingPage1ConfigRoutes"));
app.use("/api/booking-page-2-config", require("./routes/bookingPage2ConfigRoutes"));
app.use("/api/booking-page-3-config", require("./routes/bookingPage3ConfigRoutes"));
app.use("/api", require("./routes/registerContentRoutes"));

// ✅ Rota de teste
app.get("/", (req, res) => {
  res.send("🎉 API Studio BelleArte está ativa!");
});

// ❌ Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada." });
});

// ❗ Tratamento global de erros
app.use((err, req, res, next) => {
  console.error("❌ Erro global:", err.stack || err);
  res.status(500).json({ mensagem: "Erro interno do servidor." });
});

// 🚀 Inicializar o servidor
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conectado ao banco de dados");

    // 🔧 Sincroniza modelos com o banco (evite `alter: true` em produção)
    await db.sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr em: http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao iniciar o servidor:", err);
  }
})();
