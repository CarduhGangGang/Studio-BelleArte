const express = require("express");
const controller = require("../controllers/menuController");

const router = express.Router();

// Rotas do menu
router.get("/", controller.getMenu);           // Buscar menu completo
router.post("/", controller.updateMenu);       // Atualizar menu inteiro (logo + itens)
router.delete("/:key", controller.deleteMenu); // ❌ Deletar item específico

module.exports = router;
