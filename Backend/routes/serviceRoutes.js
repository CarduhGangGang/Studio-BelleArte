const express = require("express");
const router = express.Router();
const controller = require("../controllers/serviceController");
const { autenticar, autorizar } = require("../middleware/authMiddleware");

// Todos os autenticados podem ver
router.get("/", autenticar, controller.listar);

// Apenas admins podem criar ou apagar
router.post("/", autenticar, autorizar(1), controller.criar);
router.delete("/:id", autenticar, autorizar(1), controller.apagar);

module.exports = router;
