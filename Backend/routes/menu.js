const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const controller = require("../controllers/menuController");

const router = express.Router();

// Configuração de upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `logo-${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de ficheiro não suportado"));
    }
  },
});

// Rotas
router.get("/", controller.getMenu);
router.post("/", controller.updateMenu);
router.post("/upload-logo", upload.single("logo"), controller.uploadLogo);

module.exports = router;
