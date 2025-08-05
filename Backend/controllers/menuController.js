const { loadMenuData, saveMenuData } = require("../models/menu");

let menuData = loadMenuData();

// ✅ GET /api/menu
const getMenu = (req, res) => {
  return res.json(menuData);
};

// ✅ POST /api/menu
const updateMenu = (req, res) => {
  const { logoUrl, titles } = req.body;

  // ✅ Validação básica de URL
  if (typeof logoUrl === "string" && logoUrl.trim() !== "") {
    menuData.logoUrl = logoUrl.trim();
  }

  // ✅ Validação dos títulos do menu
  if (Array.isArray(titles)) {
    const isValid = titles.every(item =>
      item &&
      typeof item.key === "string" &&
      typeof item.label === "string" &&
      typeof item.link === "string" &&
      typeof item.visible === "boolean"
    );

    if (!isValid) {
      return res.status(400).json({ error: "Formato inválido nos itens do menu." });
    }

    menuData.titles = titles;
  }

  saveMenuData(menuData);

  return res.json({ success: true, data: menuData });
};

module.exports = {
  getMenu,
  updateMenu,
};
