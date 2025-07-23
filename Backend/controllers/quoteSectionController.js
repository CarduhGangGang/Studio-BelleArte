const db = require("../models");

exports.getQuote = async (req, res) => {
  try {
    const config = await db.QuoteSectionConfig.findOne();
    res.json(config);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao obter citação" });
  }
};

exports.updateQuote = async (req, res) => {
  try {
    const config = await db.QuoteSectionConfig.findOne();
    if (!config) return res.status(404).json({ mensagem: "Não encontrado" });

    await config.update(req.body);
    res.json(config);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
