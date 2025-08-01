module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("Setting", {
    key: { type: DataTypes.STRING, unique: true },
    value: DataTypes.TEXT
  });

  return Setting;
};
