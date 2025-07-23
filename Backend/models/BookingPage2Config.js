module.exports = (sequelize, DataTypes) => {
  const BookingPage2Config = sequelize.define("BookingPage2Config", {
    titulo: DataTypes.STRING,
    subtitulo: DataTypes.STRING,
    label_agendamentos: DataTypes.STRING,
    msg_sem_agendamentos: DataTypes.STRING,
    btn_editar: DataTypes.STRING,
    btn_apagar: DataTypes.STRING,
  }, {
    tableName: "booking_page_2_config"
  });

  return BookingPage2Config;
};
