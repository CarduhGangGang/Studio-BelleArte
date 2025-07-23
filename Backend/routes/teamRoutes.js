const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const teamController = require("../controllers/team.controller");

// 🔹 Configurar multer para upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Colocar rotas fixas primeiro

// 🔸 Upload imagem
router.post("/upload", upload.single("image"), teamController.uploadImage);

// 🔸 Seção
router.get("/section", teamController.getTeamSection);
router.put("/section", teamController.updateTeamSection);

// 🔸 Membros
router.get("/", teamController.getTeam);
router.post("/", teamController.createTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
