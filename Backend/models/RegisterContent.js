module.exports = (sequelize, DataTypes) => {
  const RegisterContent = sequelize.define('RegisterContent', {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'register_contents'
  });

  return RegisterContent;
};
