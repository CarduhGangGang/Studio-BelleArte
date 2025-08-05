const { loadMenuData, saveMenuData } = require("../models/menu");

let menuData = loadMenuData();

// GET /api/menu
const getMenu = (req, res) => {
  return res.json(menuData); // ✅ devolve diretamente menuData
};

// POST /api/menu
const updateMenu = (req, res) => {
  const { logoUrl, titles } = req.body;

  if (typeof logoUrl === "string") {
    menuData.logoUrl = logoUrl;
  }

  if (Array.isArray(titles)) {
    menuData.titles = titles;
  }

  saveMenuData(menuData);

  return res.json(menuData); // ✅ devolve diretamente menuData
};

module.exports = {
  getMenu,
  updateMenu,
};
