module.exports = (sequelize, DataTypes) => {
  const BookingPage3Config = sequelize.define(
    "BookingPage3Config",
    {
      titulo: DataTypes.STRING,
      descricao: DataTypes.STRING,
      texto_botao: DataTypes.STRING,
    },
    {
      tableName: "BookingPage3Config", 
      timestamps: true,
    }
  );

  return BookingPage3Config;
};
