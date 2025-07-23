module.exports = (sequelize, DataTypes) => {
  const LoginContent = sequelize.define("LoginContent", {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return LoginContent;
};
