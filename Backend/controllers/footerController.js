const { Footer } = require("../models");

// GET /footer - Retorna a configuração do footer
exports.getFooter = async (req, res) => {
  try {
    const config = await Footer.findOne();
    if (!config) return res.status(404).json({ error: "Configuração de footer não encontrada" });
    return res.json(config);
  } catch (err) {
    console.error("Erro ao buscar footer:", err);
    return res.status(500).json({ error: "Erro interno ao buscar footer" });
  }
};

// PUT /footer - Atualiza ou cria a configuração do footer
exports.updateFooter = async (req, res) => {
  try {
    const body = req.body;
    let config = await Footer.findOne();
    if (!config) {
      config = await Footer.create(body);
    } else {
      await config.update(body);
    }
    return res.json(config);
  } catch (err) {
    console.error("Erro ao atualizar footer:", err);
    return res.status(500).json({ error: "Erro interno ao atualizar footer" });
  }
};
