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
      tableName: "TeamSections", 
      timestamps: true,
      underscored: false,         
    }
  );

  return TeamSection;
};
