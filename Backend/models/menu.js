const fs = require("fs");
const path = require("path");

const menuFilePath = path.join(__dirname, "../data/menu.json");

const defaultMenuData = {
  logoUrl: "https://rdvawjefquwrqrwzoeja.supabase.co/storage/v1/object/public/images//logo-1752315447959.png",
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
    const parsed = JSON.parse(json);

    // Garante estrutura mínima
    return {
      logoUrl: typeof parsed.logoUrl === "string" ? parsed.logoUrl : defaultMenuData.logoUrl,
      titles: Array.isArray(parsed.titles) ? parsed.titles : defaultMenuData.titles,
    };
  } catch {
    return defaultMenuData;
  }
};

const saveMenuData = (data) => {
  try {
    fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Erro ao salvar menu.json:", err.message);
  }
};

module.exports = {
  loadMenuData,
  saveMenuData,
};