module.exports = (sequelize, DataTypes) => {
  const PortfolioImage = sequelize.define("PortfolioImage", {
    imageUrl: {
      type: DataTypes.TEXT,  // para URLs longas
      allowNull: false,
    },
  });

  return PortfolioImage;
};
