module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define("MenuItem", {
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  return MenuItem;
};
