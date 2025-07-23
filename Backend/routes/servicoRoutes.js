const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const servicoController = require("../controllers/servicoController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/section/info", servicoController.servico_section_get);
router.put("/section/info", servicoController.servico_section_update);

router.get("/", servicoController.servico_list);
router.get("/:id", servicoController.servico_detail);
router.post("/", upload.single("image"), servicoController.servico_create);
router.put("/:id", upload.single("image"), servicoController.servico_update);
router.delete("/:id", servicoController.servico_delete);

module.exports = router;
