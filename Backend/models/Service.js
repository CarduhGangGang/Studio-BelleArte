module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define("Servico", {
    nome: DataTypes.STRING,
    duracao: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL
  });

  Servico.associate = (models) => {
    Servico.hasMany(models.Agendamento, { foreignKey: "servico_id" });
  };

  return Servico;
};
