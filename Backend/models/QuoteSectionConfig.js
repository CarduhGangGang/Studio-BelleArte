module.exports = (sequelize, DataTypes) => {
  const QuoteSectionConfig = sequelize.define("QuoteSectionConfig", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return QuoteSectionConfig;
};
