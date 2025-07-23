// 📁 controllers/indisponibilidadeController.js
const db = require("../models");

// 📋 Listar indisponibilidades (colaborador só vê as suas)
exports.listarIndisponibilidades = async (req, res) => {
  try {
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const where = {};
    if (userRole === 2) {
      where.colaborador_id = userId;
    }

    const resultados = await db.Indisponibilidade.findAll({
      where,
      include: [{ model: db.Utilizador, as: "Colaborador", attributes: ["nome"] }],
    });

    res.json(resultados);
  } catch (err) {
    console.error("Erro ao listar indisponibilidades:", err);
    res.status(500).json({ mensagem: "Erro ao buscar indisponibilidades." });
  }
};

// 📋 Detalhe de uma indisponibilidade
exports.detalhe = async (req, res) => {
  try {
    const item = await db.Indisponibilidade.findByPk(req.params.id, {
      include: [{ model: db.Utilizador, as: "Colaborador", attributes: ["id", "nome"] }],
    });

    if (!item) return res.status(404).json({ mensagem: "Não encontrada." });

    res.json(item);
  } catch (err) {
    console.error("❌ Erro ao buscar detalhe:", err);
    res.status(500).json({ mensagem: "Erro interno" });
  }
};

// ➕ Criar uma nova indisponibilidade
exports.criar = async (req, res) => {
  try {
    const colaborador_id = req.user?.id;
    const nova = await db.Indisponibilidade.create({ ...req.body, colaborador_id });
    res.status(201).json(nova);
  } catch (err) {
    console.error("❌ Erro ao criar:", err);
    res.status(400).json({ erro: err.message });
  }
};

// ✏️ Atualizar uma indisponibilidade (proteção por role)
exports.atualizar = async (req, res) => {
  try {
    const item = await db.Indisponibilidade.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensagem: "Não encontrada." });

    if (req.user?.role === 2 && item.colaborador_id !== req.user?.id) {
      return res.status(403).json({ mensagem: "⛔ Acesso negado" });
    }

    await item.update(req.body);
    res.json({ mensagem: "Atualizado com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao atualizar:", err);
    res.status(400).json({ erro: err.message });
  }
};

// ❌ Eliminar uma indisponibilidade (proteção por role)
exports.apagar = async (req, res) => {
  try {
    const item = await db.Indisponibilidade.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensagem: "Não encontrada." });

    if (req.user?.role === 2 && item.colaborador_id !== req.user?.id) {
      return res.status(403).json({ mensagem: "⛔ Acesso negado" });
    }

    await item.destroy();
    res.json({ mensagem: "Removido com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao remover:", err);
    res.status(400).json({ erro: err.message });
  }
};
