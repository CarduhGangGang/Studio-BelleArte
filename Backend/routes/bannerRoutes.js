const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_DIR = path.join(__dirname, "..", "data");

// Verifica e cria pasta `data` se não existir
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Função auxiliar para caminho do JSON
const bannerFilePath = (filename) => path.join(DATA_DIR, filename);

// Rota genérica para GET e PUT de banners
const createBannerRoute = (routeName, filename, defaultTitle) => {
  const filePath = bannerFilePath(filename);

  // GET
  router.get(`/${routeName}`, (req, res) => {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      res.json(JSON.parse(data));
    } catch (err) {
      console.warn(`⚠️ Arquivo não encontrado para /${routeName}. Retornando padrão.`);
      res.json({ title: defaultTitle, image: "" });
    }
  });

  // PUT
  router.put(`/${routeName}`, (req, res) => {
    const { title, image } = req.body;
    if (!title || !image) {
      return res.status(400).json({ error: "Título e imagem são obrigatórios." });
    }

    const data = { title, image };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.sendStatus(200);
  });
};

// Define todas as rotas
createBannerRoute("services", "services-banner.json", "Os Nossos Serviços");
createBannerRoute("about-us", "aboutus-banner.json", "Sobre Nós");
createBannerRoute("login", "login-banner.json", "Login");
createBannerRoute("register", "register-banner.json", "Criar Conta");

module.exports = router;
