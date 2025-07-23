// controllers/loginContentController.js
const { LoginContent } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const content = await LoginContent.findAll();
    const formatted = content.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar conteúdo do login" });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const updates = req.body; // { "label_email": "Novo texto", ... }

    for (const key in updates) {
      await LoginContent.upsert({ key, value: updates[key] });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar conteúdo do login" });
  }
};
