module.exports = (sequelize, DataTypes) => {
  const Holiday = sequelize.define(
    "Holiday",
    {
      colaborador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM("ferias", "folga"),
        allowNull: false,
      },
      data_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      data_fim: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      dia_semana: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Holidays",
      timestamps: true,
    }
  );

  // Associação com Utilizador
  Holiday.associate = (models) => {
    Holiday.belongsTo(models.Utilizador, {
      foreignKey: "colaborador_id",
      as: "colaborador", // isto será usado para incluir o nome do colaborador
    });
  };

  return Holiday;
};
