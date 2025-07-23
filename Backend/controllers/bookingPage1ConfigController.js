const db = require("../models");
const BookingPage1Config = db.BookingPage1Config;

// GET config
const getBookingPage1Config = async (req, res) => {
  try {
    let config = await BookingPage1Config.findOne();

    if (!config) {
      config = await BookingPage1Config.create({
        titulo: "BOOKING",
        descricao: "Por favor seleciona o serviço que desejas:",
        label_servico: "Serviço",
        label_colaborador: "Colaborador",
        label_data: "Data",
        label_hora_disponivel: "Hora disponível:",
        btn_agendar: "Agendar",
      });
    }

    res.json(config);
  } catch (err) {
    console.error("Erro ao buscar configuração:", err);
    res.status(500).json({ mensagem: "Erro ao buscar configuração." });
  }
};

// PUT update
const updateBookingPage1Config = async (req, res) => {
  try {
    let config = await BookingPage1Config.findOne();
    if (!config) {
      config = await BookingPage1Config.create(req.body);
    } else {
      await config.update(req.body);
    }
    res.json(config);
  } catch (err) {
    console.error("Erro ao atualizar configuração:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar configuração." });
  }
};

module.exports = {
  getBookingPage1Config,
  updateBookingPage1Config,
};
