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
      const lastLogo = await Logo.findOne({ order: [["id", "DESC"]] });
      if (!lastLogo || lastLogo.url !== logoUrl) {
        await Logo.create({ url: logoUrl });
      }
    }

    if (!Array.isArray(titles)) {
      return res.status(400).json({ error: "Lista de títulos inválida" });
    }

    await MenuItem.destroy({ where: {} });

    const cleanTitles = titles.map(({ key, label, link, visible }) => ({
      key,
      label,
      link,
      visible,
    }));

    await MenuItem.bulkCreate(cleanTitles);

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
