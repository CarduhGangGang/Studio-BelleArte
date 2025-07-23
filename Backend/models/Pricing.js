module.exports = (sequelize, DataTypes) => {
  const Pricing = sequelize.define("Pricing", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Pricing;
};
