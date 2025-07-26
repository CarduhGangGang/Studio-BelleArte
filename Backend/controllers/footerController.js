const { Footer } = require("../models");

exports.getFooter = async (req, res) => {
  try {
    const config = await Footer.findOne();
    if (!config) {
      return res.status(404).json({ mensagem: "Configuração de footer não encontrada." });
    }
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao buscar footer." });
  }
};

exports.updateFooter = async (req, res) => {
  try {
    let config = await Footer.findOne();
    if (!config) {
      config = await Footer.create(req.body);
    } else {
      await config.update(req.body);
    }
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao atualizar footer." });
  }
};
