const { AboutHistory } = require("../models");

// ✅ GET - Obter a história
const getHistory = async (req, res) => {
  try {
    const record = await AboutHistory.findOne();
    if (!record) {
      return res.status(404).json({ message: "História não encontrada" });
    }
    res.json(record);
  } catch (err) {
    console.error("Erro ao buscar história:", err);
    res.status(500).json({ message: "Erro interno ao buscar história" });
  }
};

// ✅ PUT - Atualizar ou criar a história
const updateHistory = async (req, res) => {
  try {
    const { title, description } = req.body;

    let record = await AboutHistory.findOne();
    if (record) {
      await record.update({ title, description });
    } else {
      record = await AboutHistory.create({ title, description });
    }

    res.json({ message: "História atualizada com sucesso", data: record });
  } catch (err) {
    console.error("Erro ao atualizar história:", err);
    res.status(500).json({ message: "Erro interno ao atualizar história" });
  }
};

module.exports = {
  getHistory,
  updateHistory,
};
