const fs = require("fs");
const path = require("path");

const menuFilePath = path.join(__dirname, "../data/menu.json");

const defaultMenuData = {
  logoUrl: "/uploads/favicon2.png",
  titles: [
    { key: "home", label: "Home", link: "/", visible: true },
    { key: "about", label: "Sobre", link: "/about-us", visible: true },
    { key: "services", label: "Serviços", link: "/services", visible: true },
    { key: "register", label: "Registar", link: "/registor", visible: true },
    { key: "login", label: "Login", link: "/login", visible: true },
    { key: "contact", label: "Contactos", link: "/contect-us", visible: true },
  ],
};

const loadMenuData = () => {
  try {
    const json = fs.readFileSync(menuFilePath, "utf-8");
    return JSON.parse(json);
  } catch {
    return defaultMenuData;
  }
};

const saveMenuData = (data) => {
  fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  loadMenuData,
  saveMenuData,
};
