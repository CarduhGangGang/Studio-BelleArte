module.exports = (sequelize, DataTypes) => {
  const Horario = sequelize.define(
    "Horario",
    {
      colaborador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Utilizadors", // cuidado com nome da tabela
          key: "id",
        },
        onDelete: "CASCADE",
      },
      dia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]],
            msg: "Dia inválido. Use dias úteis.",
          },
        },
      },
      entrada: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([01]\d|2[0-3]):([0-5]\d)$/,
            msg: "Formato da hora de entrada inválido (HH:MM).",
          },
        },
      },
      saida: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^([01]\d|2[0-3]):([0-5]\d)$/,
            msg: "Formato da hora de saída inválido (HH:MM).",
          },
        },
      },
    },
    {
      tableName: "Horarios",
      timestamps: true,
    }
  );

  Horario.associate = (models) => {
    Horario.belongsTo(models.Utilizador, {
      foreignKey: "colaborador_id",
      as: "colaborador",
    });
  };

  return Horario;
};
