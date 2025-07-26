const { BookingPage3Config } = require("../models");

exports.getBookingPage3Config = async (req, res) => {
  try {
    const config = await BookingPage3Config.findOne();
    if (!config) {
      return res.status(404).json({ mensagem: "Configuração não encontrada" });
    }
    res.json(config);
  } catch (error) {
    console.error("Erro ao buscar configuração:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
};

exports.updateBookingPage3Config = async (req, res) => {
  try {
    const config = await BookingPage3Config.findOne();
    if (!config) {
      return res.status(404).json({ mensagem: "Configuração não encontrada" });
    }

    const { titulo, descricao, texto_botao } = req.body;
    await config.update({ titulo, descricao, texto_botao });

    res.json({ mensagem: "Atualizado com sucesso", config });
  } catch (error) {
    console.error("Erro ao atualizar configuração:", error);
    res.status(500).json({ mensagem: "Erro ao atualizar configuração" });
  }
};
