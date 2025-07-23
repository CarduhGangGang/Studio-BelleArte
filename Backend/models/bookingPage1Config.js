module.exports = (sequelize, DataTypes) => {
  const BookingPage1Config = sequelize.define("BookingPage1Config", {
    titulo: {
      type: DataTypes.STRING,
      defaultValue: "BOOKING"
    },
    descricao: {
      type: DataTypes.STRING,
      defaultValue: "Por favor seleciona o serviço que desejas:"
    },
    label_servico: {
      type: DataTypes.STRING,
      defaultValue: "Serviço"
    },
    label_colaborador: {
      type: DataTypes.STRING,
      defaultValue: "Colaborador"
    },
    label_data: {
      type: DataTypes.STRING,
      defaultValue: "Data"
    },
    label_hora_disponivel: {
      type: DataTypes.STRING,
      defaultValue: "Hora disponível:"
    },
    btn_agendar: {
      type: DataTypes.STRING,
      defaultValue: "Agendar"
    }
  });

  return BookingPage1Config;
};
