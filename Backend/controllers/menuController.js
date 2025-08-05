const { MenuItem, Logo } = require("../models");

// GET /api/menu
const getMenu = async (req, res) => {
  try {
    const logo = await Logo.findOne({ order: [["id", "DESC"]] });
    const titles = await MenuItem.findAll({ order: [["id", "ASC"]] });

    return res.json({
      logoUrl: logo?.url || "",
      titles,
    });
  } catch (err) {
    console.error("Erro ao buscar menu:", err.message);
    return res.status(500).json({ error: "Erro ao buscar menu" });
  }
};

// POST /api/menu
const updateMenu = async (req, res) => {
  const { logoUrl, titles } = req.body;

  try {
    if (logoUrl) {
      await Logo.create({ url: logoUrl });
    }

    if (Array.isArray(titles)) {
      await MenuItem.destroy({ where: {} }); // limpa tudo
      await MenuItem.bulkCreate(titles);
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Erro ao atualizar menu:", err.message);
    return res.status(500).json({ error: "Erro ao atualizar menu" });
  }
};

module.exports = {
  getMenu,
  updateMenu,
};
