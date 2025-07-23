const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/service-page.json");

exports.getServicePage = (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.json({ title: "", description: "", services: [] });
    }
    const json = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(json));
  } catch (err) {
    console.error("Erro ao ler serviços:", err);
    res.status(500).json({ mensagem: "Erro ao carregar dados dos serviços" });
  }
};

exports.updateServicePage = (req, res) => {
  try {
    const { title, description, services } = req.body;
    const data = { title, description, services };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    res.json({ mensagem: "Serviços atualizados com sucesso" });
  } catch (err) {
    console.error("Erro ao salvar serviços:", err);
    res.status(500).json({ mensagem: "Erro ao salvar dados" });
  }
};
