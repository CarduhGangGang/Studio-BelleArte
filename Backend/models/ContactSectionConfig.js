module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ContactSectionConfig", {
    title: DataTypes.STRING,
    subtitle: DataTypes.TEXT, // <== Certo agora
    whatsappNumber: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    mapsEmbedUrl: DataTypes.TEXT,
  });
};
