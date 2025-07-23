module.exports = (sequelize, DataTypes) => {
  const PortfolioImage = sequelize.define("PortfolioImage", {
    imageUrl: DataTypes.STRING,
  });
  return PortfolioImage;
};
