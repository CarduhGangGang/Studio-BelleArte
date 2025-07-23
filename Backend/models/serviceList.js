module.exports = (sequelize, DataTypes) => {
  const ServiceList = sequelize.define("ServiceList", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    img: DataTypes.STRING,
  });

  return ServiceList;
};
