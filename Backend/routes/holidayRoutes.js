const express = require("express");
const router = express.Router();
const controller = require("../controllers/holidaysController");

router.get("/", controller.getTodosHolidays);
router.get("/:id", controller.getHolidaysPorColaborador);
router.post("/adicionar", controller.adicionarHoliday);
router.put("/editar/:id", controller.atualizarHoliday);
router.delete("/:id", controller.removerHoliday);

module.exports = router;
