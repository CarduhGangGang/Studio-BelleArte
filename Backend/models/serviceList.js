module.exports = (sequelize, DataTypes) => {
  const ServiceList = sequelize.define("ServiceList", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true, // por URL como pediste
    },
  }, {
    tableName: "ServiceLists",
    timestamps: false,
  });

  return ServiceList;
};
