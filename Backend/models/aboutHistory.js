module.exports = (sequelize, DataTypes) => {
  const AboutHistory = sequelize.define("AboutHistory", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return AboutHistory;
};
