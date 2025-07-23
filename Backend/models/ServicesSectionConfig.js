module.exports = (sequelize, DataTypes) => {
  const ServicesSectionConfig = sequelize.define("ServicesSectionConfig", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      defaultValue: 1,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: "services_section_config",
    timestamps: false, // ou true se quiser manter createdAt/updatedAt
  });

  return ServicesSectionConfig;
};
