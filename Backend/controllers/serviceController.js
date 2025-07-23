const db = require("../models");

exports.listar = async (req, res) => {
  try {
    const servicos = await db.Servico.findAll();
    res.json(servicos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar serviços" });
  }
};

exports.criar = async (req, res) => {
  try {
    const novo = await db.Servico.create(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.apagar = async (req, res) => {
  try {
    await db.Servico.destroy({ where: { id: req.params.id } });
    res.json({ mensagem: "Serviço apagado com sucesso" });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};
