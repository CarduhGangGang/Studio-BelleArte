const db = require("../models");
const BookingPage2Config = db.BookingPage2Config;

exports.getBookingPage2Config = async (req, res) => {
  try {
    let config = await BookingPage2Config.findOne();
    if (!config) {
      config = await BookingPage2Config.create({
        titulo: "Agendamento efetuado com sucesso!",
        subtitulo: "Consulta os teus agendamentos e verifica se está tudo ok.",
        label_agendamentos: "Os teus agendamentos",
        msg_sem_agendamentos: "Nenhum agendamento encontrado.",
        btn_editar: "✏️",
        btn_apagar: "🗑️",
      });
    }
    res.json(config);
  } catch (err) {
    console.error("Erro ao buscar config:", err);
    res.status(500).json({ mensagem: "Erro ao buscar configuração." });
  }
};

exports.updateBookingPage2Config = async (req, res) => {
  try {
    let config = await BookingPage2Config.findOne();
    if (!config) {
      config = await BookingPage2Config.create(req.body);
    } else {
      await config.update(req.body);
    }
    res.json(config);
  } catch (err) {
    console.error("Erro ao atualizar config:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar configuração." });
  }
};
