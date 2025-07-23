module.exports = (sequelize, DataTypes) => {
  const HomeSlide = sequelize.define("HomeSlide", {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,
    order: DataTypes.INTEGER,
  });

  return HomeSlide;
};
