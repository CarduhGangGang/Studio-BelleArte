// models/Header.js
module.exports = (sequelize, DataTypes) => {
  const Header = sequelize.define("Header", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Headers",
    timestamps: false,
  });

  return Header;
};
