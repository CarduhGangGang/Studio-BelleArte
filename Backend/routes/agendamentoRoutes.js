const express = require("express");
const router = express.Router();
const agendamentoController = require("../controllers/agendamentoController");
const { autenticar, autorizar } = require("../middleware/authMiddleware"); // Certifique-se que o caminho está certo!

router.get("/", autenticar, agendamentoController.agendamento_list);
router.get("/:id", autenticar, agendamentoController.agendamento_detail);
router.post("/", autenticar, agendamentoController.agendamento_create);
router.put("/:id", autenticar, agendamentoController.agendamento_update);
router.delete("/:id", autenticar, agendamentoController.agendamento_delete);

module.exports = router;
