const { BookingPage1Config } = require("../models");

exports.getBookingPage1Config = async (req, res) => {
  try {
    let config = await BookingPage1Config.findOne();

    if (!config) {
      config = await BookingPage1Config.create(); // cria com defaults
    }

    res.json(config);
  } catch (err) {
    console.error("Erro ao obter configuração:", err.message);
    res.status(500).json({ mensagem: "Erro ao obter configuração" });
  }
};

exports.updateBookingPage1Config = async (req, res) => {
  try {
    const dados = req.body;

    let config = await BookingPage1Config.findOne();

    if (!config) {
      config = await BookingPage1Config.create(dados);
    } else {
      await config.update(dados);
    }

    res.json(config);
  } catch (err) {
    console.error("Erro ao atualizar configuração:", err.message);
    res.status(500).json({ mensagem: "Erro ao atualizar configuração" });
  }
};
