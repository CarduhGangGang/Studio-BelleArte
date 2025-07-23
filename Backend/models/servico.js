module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define("Servico", {
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    duracao: DataTypes.INTEGER,
    preco: DataTypes.DECIMAL,
    imageUrl: DataTypes.STRING,
  }, {
    tableName: "Servicos",
    timestamps: true,
  });

  Servico.associate = (models) => {
    Servico.hasMany(models.Agendamento, {
      foreignKey: "servico_id",
      as: "Agendamentos",
    });
  };

  return Servico;
};
