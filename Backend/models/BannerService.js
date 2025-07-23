module.exports = (sequelize, DataTypes) => {
  const BannerService = sequelize.define("BannerService", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return BannerService;
};
