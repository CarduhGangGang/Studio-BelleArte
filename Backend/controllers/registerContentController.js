const { RegisterContent } = require('../models');

exports.getRegisterContent = async (req, res) => {
  try {
    const entries = await RegisterContent.findAll();
    const content = {};
    entries.forEach(({ key, value }) => {
      content[key] = value;
    });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar textos.' });
  }
};

exports.updateRegisterContent = async (req, res) => {
  try {
    const updates = req.body;
    const keys = Object.keys(updates);

    await Promise.all(keys.map(async (key) => {
      await RegisterContent.upsert({ key, value: updates[key] });
    }));

    res.json({ message: 'Textos atualizados com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar textos.' });
  }
};