const fs = require("fs");
const path = require("path");

const menuFilePath = path.join(__dirname, "../data/menu.json");

// ✅ Menu default com logo por URL
const defaultMenuData = {
  logoUrl: "https://exemplo.com/logo-padrao.png", // ← altere para seu logo padrão real
  titles: [
    { key: "home", label: "Home", link: "/", visible: true },
    { key: "about", label: "Sobre", link: "/about-us", visible: true },
    { key: "services", label: "Serviços", link: "/services", visible: true },
    { key: "register", label: "Registar", link: "/registar", visible: true },
    { key: "login", label: "Login", link: "/login", visible: true },
    { key: "contact", label: "Contactos", link: "/contact-us", visible: true }
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
  // Opcional: validar se logoUrl é uma string de URL
  if (typeof data.logoUrl !== "string") {
    throw new Error("logoUrl deve ser uma string de URL");
  }

  // Opcional: garantir titles bem formatado
  if (!Array.isArray(data.titles)) {
    throw new Error("titles deve ser um array");
  }

  fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = {
  loadMenuData,
  saveMenuData,
};
