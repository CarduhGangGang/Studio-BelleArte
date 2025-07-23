module.exports = (sequelize, DataTypes) => {
  const PortfolioSectionConfig = sequelize.define("PortfolioSectionConfig", {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
  return PortfolioSectionConfig;
};
