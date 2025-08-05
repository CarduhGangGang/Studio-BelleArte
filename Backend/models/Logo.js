module.exports = (sequelize, DataTypes) => {
  const Logo = sequelize.define("Logo", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Logo;
};
