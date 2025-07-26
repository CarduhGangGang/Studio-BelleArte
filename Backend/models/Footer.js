module.exports = (sequelize, DataTypes) => {
  const Footer = sequelize.define("Footer", {
    logoUrl: DataTypes.STRING,
    phrase: DataTypes.STRING,
    sectionEmpresa: DataTypes.JSON,
    sectionLinks: DataTypes.JSON,
    sectionContactos: DataTypes.JSON,
    socialMedia: DataTypes.JSON,
    copyright: DataTypes.STRING,
  });

  return Footer;
};
