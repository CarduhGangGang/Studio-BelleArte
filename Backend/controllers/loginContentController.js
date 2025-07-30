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
    console.error("Erro no GET /login-content:", err);
    res.status(500).json({ error: "Erro ao buscar conteúdo do login" });
  }
};

exports.updateContent = async (req, res) => {
  try {
    const updates = req.body;

    if (typeof updates !== 'object' || Array.isArray(updates)) {
      return res.status(400).json({ error: "Formato inválido. Esperado um objeto { key: value }" });
    }

    for (const key in updates) {
      const value = updates[key];

      if (!key || typeof value !== "string") continue;

      await LoginContent.upsert({ key, value: value.trim() });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Erro no PUT /login-content:", err);
    res.status(500).json({ error: "Erro ao atualizar conteúdo do login" });
  }
};
