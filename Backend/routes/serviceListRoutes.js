const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Caminho absoluto do arquivo JSON
const dataPath = path.join(__dirname, "..", "data", "service-list.json");

// Lê o JSON do disco
let serviceData;
try {
  const file = fs.readFileSync(dataPath, "utf-8");
  serviceData = JSON.parse(file);
  console.log("✅ Dados de serviços carregados do JSON.");
} catch (err) {
  console.error("❌ Erro ao carregar dados de serviços:", err);
  serviceData = {
    title: "",
    description: "",
    services: [],
  };
}

// GET - Buscar dados da página de serviços
router.get("/", (req, res) => {
  res.json(serviceData);
});

// POST - Atualizar dados da página de serviços
router.post("/", (req, res) => {
  const body = req.body;
  if (
    !body ||
    typeof body.title !== "string" ||
    typeof body.description !== "string" ||
    !Array.isArray(body.services)
  ) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  serviceData = body;

  // Salvar no arquivo JSON
  fs.writeFile(dataPath, JSON.stringify(serviceData, null, 2), (err) => {
    if (err) {
      console.error("❌ Erro ao salvar dados no JSON:", err);
      return res.status(500).json({ error: "Erro ao salvar dados" });
    }

    console.log("💾 Dados de serviços salvos com sucesso.");
    res.json({ message: "Serviços atualizados com sucesso", data: serviceData });
  });
});

module.exports = router;
