const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const teamController = require("../controllers/team.controller");

// 🔧 Garantir que a pasta de uploads existe
const uploadPath = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 📁 Configuração do multer para upload de imagem
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    cb(null, `${timestamp}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de ficheiro inválido."));
    }
  },
});

// ✅ Rotas da Equipa

// 🔸 Upload de imagem
router.post("/upload", upload.single("image"), teamController.uploadImage);

// 🔸 Configuração da seção
router.get("/section", teamController.getTeamSection);
router.put("/section", teamController.updateTeamSection);

// 🔸 Operações com membros
router.get("/", teamController.getTeam);
router.post("/", teamController.createTeam);
router.put("/:id", teamController.updateTeam);
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
