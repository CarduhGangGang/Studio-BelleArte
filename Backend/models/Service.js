module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define("Servico", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    preco: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "Servicos", // garante consistência
    timestamps: true,      // mantém createdAt e updatedAt
  });

  Servico.associate = (models) => {
    Servico.hasMany(models.Agendamento, {
      foreignKey: "servico_id",
      as: "Agendamentos",
    });
  };

  return Servico;
};
