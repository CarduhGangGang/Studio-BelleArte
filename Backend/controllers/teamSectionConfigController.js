const TeamSection = require("../models/TeamSection");

exports.getConfig = async (req, res) => {
  try {
    const config = await TeamSection.findOne();
    if (!config) {
      return res.status(404).json({ message: "Configuração não encontrada" });
    }
    res.json(config);
  } catch (err) {
    console.error("❌ Erro ao obter configuração da secção:", err);
    res.status(500).json({ message: "Erro interno ao obter dados" });
  }
};

exports.updateConfig = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Título e descrição são obrigatórios" });
  }

  try {
    let config = await TeamSection.findOne();

    if (!config) {
      config = await TeamSection.create({ title, description });
    } else {
      config.title = title;
      config.description = description;
      await config.save();
    }

    res.json(config);
  } catch (err) {
    console.error("❌ Erro ao atualizar configuração da secção:", err);
    res.status(500).json({ message: "Erro interno ao guardar dados" });
  }
};
