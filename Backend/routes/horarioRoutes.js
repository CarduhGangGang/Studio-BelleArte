const express = require("express");
const router = express.Router();
const horarioController = require("../controllers/horarioController");

router.get("/:colaborador_id", horarioController.listarHorarios);
router.post("/salvar", horarioController.guardarHorarios);

module.exports = router;
