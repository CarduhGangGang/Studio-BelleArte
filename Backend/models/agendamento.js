"use strict";

module.exports = (sequelize, DataTypes) => {
  const Agendamento = sequelize.define("Agendamento", {
    data_hora: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // ← agora opcional
    },
    colaborador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servico_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // ← agora opcional
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: "pendente",
    },
    coluna: {
      type: DataTypes.STRING,
      defaultValue: "Semana",
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telefone_cliente: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avaliacao: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    duracao_real: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // ✅ NOVOS CAMPOS
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "normal", // "normal" ou "indisponibilidade"
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true, // só usado se for tipo "indisponibilidade"
    },
  });

  Agendamento.associate = (models) => {
    Agendamento.belongsTo(models.Utilizador, {
      as: "cliente",
      foreignKey: "cliente_id",
    });

    Agendamento.belongsTo(models.Utilizador, {
      as: "colaborador",
      foreignKey: "colaborador_id",
    });

    Agendamento.belongsTo(models.Servico, {
      as: "servico",
      foreignKey: "servico_id",
    });
  };

  return Agendamento;
};
