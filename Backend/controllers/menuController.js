const { MenuItem, Logo } = require("../models");

// 🔹 GET /api/menu — Buscar logo e itens de menu
const getMenu = async (req, res) => {
  try {
    const logo = await Logo.findOne({ order: [["id", "DESC"]] });
    const titles = await MenuItem.findAll({ order: [["id", "ASC"]] });

    return res.json({
      logoUrl: logo?.url || "",
      titles,
    });
  } catch (err) {
    console.error("❌ Erro ao buscar menu:", err.message);
    return res.status(500).json({ error: "Erro ao buscar menu" });
  }
};

// 🔹 POST /api/menu — Atualizar logo e itens de menu
const updateMenu = async (req, res) => {
  const { logoUrl, titles } = req.body;

  try {
    // Validação básica
    if (!Array.isArray(titles)) {
      return res.status(400).json({ error: "Lista de títulos inválida." });
    }

    // Criar novo logo apenas se mudou
    if (logoUrl) {
      const lastLogo = await Logo.findOne({ order: [["id", "DESC"]] });
      if (!lastLogo || lastLogo.url !== logoUrl) {
        await Logo.create({ url: logoUrl });
      }
    }

    // Apagar todos os registros existentes e recriar
    await MenuItem.destroy({ where: {} });

    const sanitized = titles.map(({ key, label, link, visible }) => ({
      key: String(key),
      label: String(label),
      link: String(link),
      visible: Boolean(visible),
    }));

    await MenuItem.bulkCreate(sanitized);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erro ao atualizar menu:", err.message);
    return res.status(500).json({ error: "Erro ao atualizar menu" });
  }
};

module.exports = {
  getMenu,
  updateMenu,
};
