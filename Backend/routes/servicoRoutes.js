const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");

router.get("/section/info", servicoController.servico_section_get);
router.put("/section/info", servicoController.servico_section_update);

router.get("/", servicoController.servico_list);
router.get("/:id", servicoController.servico_detail);
router.post("/", servicoController.servico_create); // 🔴 Sem upload
router.put("/:id", servicoController.servico_update); // 🔴 Sem upload
router.delete("/:id", servicoController.servico_delete);

module.exports = router;
