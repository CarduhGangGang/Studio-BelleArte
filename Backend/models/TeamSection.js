module.exports = (sequelize, DataTypes) => {
  const TeamSection = sequelize.define(
    "TeamSection",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "team_sections",
      timestamps: true,
      underscored: true,
    }
  );

  return TeamSection;
};
