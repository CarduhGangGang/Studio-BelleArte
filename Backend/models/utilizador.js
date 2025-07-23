module.exports = (sequelize, DataTypes) => {
  const Utilizador = sequelize.define("Utilizador", {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role_id: DataTypes.INTEGER,
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: "Utilizadors",
    timestamps: true,
  });

  Utilizador.associate = (models) => {
    Utilizador.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
    });

    Utilizador.hasMany(models.Agendamento, {
      foreignKey: "cliente_id",
      as: "AgendamentosCliente",
    });

    Utilizador.hasMany(models.Agendamento, {
      foreignKey: "colaborador_id",
      as: "AgendamentosColaborador",
    });

    Utilizador.hasMany(models.Indisponibilidade, {
      foreignKey: "colaborador_id",
      as: "Indisponibilidades",
    });
  };

  return Utilizador;
};
