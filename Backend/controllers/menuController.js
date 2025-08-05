const { MenuItem, Logo } = require("../models");

// GET /api/menu
const getMenu = async (req, res) => {
  try {
    const logo = await Logo.findOne({ order: [["updatedAt", "DESC"]] });
    const titles = await MenuItem.findAll({ order: [["id", "ASC"]] });

    return res.json({
      logoUrl: logo ? logo.url : "",
      titles,
    });
  } catch (err) {
    console.error("Erro ao carregar menu:", err.message);
    return res.status(500).json({ error: "Erro ao carregar menu" });
  }
};

// POST /api/menu
const updateMenu = async (req, res) => {
  const { logoUrl, titles } = req.body;

  try {
    // Atualiza ou cria novo logo
    if (logoUrl) {
      await Logo.create({ url: logoUrl });
    }

    if (Array.isArray(titles)) {
      await MenuItem.destroy({ where: {} }); // Limpa itens anteriores

      const cleaned = titles.map((item) => ({
        key: item.key,
        label: item.label,
        link: item.link,
        visible: item.visible ?? true,
      }));

      await MenuItem.bulkCreate(cleaned);
    }

    const updatedLogo = await Logo.findOne({ order: [["updatedAt", "DESC"]] });
    const updatedTitles = await MenuItem.findAll({ order: [["id", "ASC"]] });

    return res.json({
      logoUrl: updatedLogo?.url || "",
      titles: updatedTitles,
    });
  } catch (err) {
    console.error("Erro ao salvar menu:", err.message);
    return res.status(500).json({ error: "Erro ao salvar menu" });
  }
};

module.exports = {
  getMenu,
  updateMenu,
};
