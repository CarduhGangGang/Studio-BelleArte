const express = require("express");
const router = express.Router();
const utilizadorController = require("../controllers/utilizadorController");
const { autenticar, autorizar } = require("../middleware/authMiddleware");

// 🔐 Listar utilizadores que já fizeram login
router.get("/autenticados", autenticar, utilizadorController.listarAutenticados);

// ✅ Obter utilizadores (todos ou filtrados por role: ?role=2 ou ?role=3)
router.get("/", autenticar, utilizadorController.utilizador_list);

// 🔍 Obter 1 utilizador por ID
router.get("/:id", autenticar, utilizadorController.obterUtilizador);

// 🆕 Criar novo utilizador (acesso público)
router.post("/", utilizadorController.criarUtilizador);

// ✏️ Atualizar utilizador
router.put("/:id", autenticar, utilizadorController.atualizarUtilizador);

// ❌ Apagar utilizador
router.delete("/:id", autenticar, utilizadorController.apagarUtilizador);

module.exports = router;
