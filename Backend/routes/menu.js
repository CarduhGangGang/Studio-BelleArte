const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const menuFilePath = path.join(__dirname, "../data/menu.json");

// Carrega dados do ficheiro
const loadMenuData = () => {
  try {
    const json = fs.readFileSync(menuFilePath, "utf-8");
    return JSON.parse(json);
  } catch {
    return {
      logoUrl: "/uploads/favicon2.png",
      titles: [
        { key: "home", label: "Home", link: "/", visible: true },
        { key: "about", label: "Sobre", link: "/about-us", visible: true },
        { key: "services", label: "Serviços", link: "/services", visible: true },
        { key: "register", label: "Registar", link: "/registor", visible: true },
        { key: "login", label: "Login", link: "/login", visible: true },
        { key: "contact", label: "Contactos", link: "/contect-us", visible: true },
      ],
    };
  }
};

// Guarda dados no ficheiro
const saveMenuData = (data) => {
  fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2), "utf-8");
};

// Carrega os dados na memória
let menuData = loadMenuData();

// 📁 Configuração do multer para uploads
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

// ✅ GET /api/menu
router.get("/", (req, res) => {
  res.json(menuData);
});

// ✅ POST /api/menu
router.post("/", (req, res) => {
  const { logoUrl, titles } = req.body;

  if (logoUrl) menuData.logoUrl = logoUrl;
  if (Array.isArray(titles)) menuData.titles = titles;

  saveMenuData(menuData);
  res.json({ success: true, data: menuData });
});

// ✅ POST /api/menu/upload-logo
router.post("/upload-logo", upload.single("logo"), (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;

  // Apaga imagem anterior (se não for a padrão)
  if (menuData.logoUrl && menuData.logoUrl !== "/uploads/favicon2.png") {
    const oldPath = path.join(__dirname, "../public", menuData.logoUrl);
    fs.unlink(oldPath, (err) => {
      if (err) console.warn("⚠️ Falha ao apagar imagem anterior:", err.message);
    });
  }

  menuData.logoUrl = filePath;
  saveMenuData(menuData);

  res.json({ success: true, url: filePath });
});

module.exports = router;
