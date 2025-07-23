module.exports = (sequelize, DataTypes) => {
  const PricingTitle = sequelize.define("PricingTitle", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return PricingTitle;
};
