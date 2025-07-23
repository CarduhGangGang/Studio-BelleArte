module.exports = (sequelize, DataTypes) => {
  const BookingPage3Config = sequelize.define("BookingPage3Config", {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    texto_botao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "BookingPage3Config", // <- FORÇA o nome singular da tabela
  });

  return BookingPage3Config;
};
