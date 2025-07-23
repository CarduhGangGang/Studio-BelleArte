const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const SERVICES_FILE = path.join(__dirname, "../data/service-list.json");

// ✅ Ler dados do ficheiro JSON
function readServiceData() {
  if (!fs.existsSync(SERVICES_FILE)) {
    return { title: "", description: "", services: [] };
  }
  return JSON.parse(fs.readFileSync(SERVICES_FILE, "utf8"));
}

// ✅ Escrever dados no ficheiro JSON
function writeServiceData(data) {
  fs.writeFileSync(SERVICES_FILE, JSON.stringify(data, null, 2));
}

// 🔍 GET todos os serviços (apenas array)
router.get("/service-list", (req, res) => {
  const data = readServiceData();
  res.json(data.services);
});

// 🔍 GET título e descrição
router.get("/service-list/content", (req, res) => {
  const data = readServiceData();
  res.json({ title: data.title, description: data.description });
});

// 💾 PUT serviços + título/descrição
router.put("/service-list", (req, res) => {
  const { title, description, services } = req.body;
  writeServiceData({ title, description, services });
  res.json({ mensagem: "Serviços atualizados com sucesso" });
});

module.exports = router;
