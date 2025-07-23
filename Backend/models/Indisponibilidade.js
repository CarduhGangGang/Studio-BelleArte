module.exports = (sequelize, DataTypes) => {
  const Indisponibilidade = sequelize.define("Indisponibilidade", {
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    colaborador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coluna: {
      type: DataTypes.STRING,
      defaultValue: "Semana",
    },
  }, {
    tableName: "Indisponibilidades",
    timestamps: true,
  });

  Indisponibilidade.associate = (models) => {
    Indisponibilidade.belongsTo(models.Utilizador, {
      foreignKey: "colaborador_id",
      as: "Colaborador",
    });
  };

  return Indisponibilidade;
};
