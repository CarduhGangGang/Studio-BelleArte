module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define(
    "TeamMember",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "team_members",
      timestamps: true,
      underscored: true,
    }
  );

  return TeamMember;
};
