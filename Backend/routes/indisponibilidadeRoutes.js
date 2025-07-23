// 📁 routes/indisponibilidadeRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/indisponibilidadeController");
const { autenticar } = require("../middleware/authMiddleware");

// 🔓 Listar indisponibilidades – qualquer utilizador autenticado
router.get("/", autenticar, controller.listarIndisponibilidades);

// 🔎 Detalhes de uma indisponibilidade
router.get("/:id", autenticar, controller.detalhe);

// ➕ Criar – apenas colaboradores ou admins
router.post("/", autenticar, controller.criar);

// ✏️ Atualizar – protegido internamente no controller
router.put("/:id", autenticar, controller.atualizar);

// ❌ Apagar – protegido internamente no controller
router.delete("/:id", autenticar, controller.apagar);

module.exports = router;
