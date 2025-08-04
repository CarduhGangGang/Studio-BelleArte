const fs = require("fs");
const path = require("path");
const { loadMenuData, saveMenuData } = require("../models/menuModel");

let menuData = loadMenuData();

// GET /api/menu
const getMenu = (req, res) => {
  return res.json(menuData);
};

// POST /api/menu
const updateMenu = (req, res) => {
  const { logoUrl, titles } = req.body;

  if (logoUrl) menuData.logoUrl = logoUrl;
  if (Array.isArray(titles)) menuData.titles = titles;

  saveMenuData(menuData);
  return res.json({ success: true, data: menuData });
};

// POST /api/menu/upload-logo
const uploadLogo = (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;

  if (menuData.logoUrl && menuData.logoUrl !== "/uploads/favicon2.png") {
    const oldPath = path.join(__dirname, "../public", menuData.logoUrl);
    fs.unlink(oldPath, (err) => {
      if (err) console.warn("⚠️ Falha ao apagar imagem anterior:", err.message);
    });
  }

  menuData.logoUrl = filePath;
  saveMenuData(menuData);
  return res.json({ success: true, url: filePath });
};

module.exports = {
  getMenu,
  updateMenu,
  uploadLogo,
};
