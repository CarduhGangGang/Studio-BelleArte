module.exports = (sequelize, DataTypes) => {
  const TeamMember = sequelize.define("TeamMember", {
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
  });

  return TeamMember;
};
