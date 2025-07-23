module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("Role", {
    descricao: DataTypes.STRING,
  }, {
    tableName: "Roles",
    timestamps: true,
  });

  Role.associate = (models) => {
    Role.hasMany(models.Utilizador, {
      foreignKey: "role_id",
      as: "Utilizadores", // 👈 bom para include: [{ model: Role, as: 'Utilizadores' }]
    });
  };

  return Role;
};
