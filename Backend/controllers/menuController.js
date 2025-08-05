const { loadMenuData, saveMenuData } = require("../models/menuModel");

// GET /api/menu
exports.getMenu = (req, res) => {
  const menu = loadMenuData();
  res.json(menu);
};

// POST /api/menu
exports.updateMenu = (req, res) => {
  try {
    const { logoUrl, titles } = req.body;

    if (!logoUrl || !Array.isArray(titles)) {
      return res.status(400).json({ error: "Dados inválidos" });
    }

    saveMenuData({ logoUrl, titles });
    res.json({ message: "Menu atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao salvar menu:", err);
    res.status(500).json({ error: "Erro ao salvar menu." });
  }
};
