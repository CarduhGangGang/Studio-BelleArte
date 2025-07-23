const db = require("../models");
const Header = db.Header;

// 👉 GET /api/header
exports.getHeader = async (req, res) => {
  try {
    const [header] = await Header.findOrCreate({
      where: { id: 1 },
      defaults: {
        phone: "+351 918 283 283",
        address: "Rua das Amoreiras, nº 145, 4º Esq., 1250-096 Lisboa, Portugal",
      },
    });

    res.json(header);
  } catch (err) {
    console.error("Erro ao buscar header:", err);
    res.status(500).json({ mensagem: "Erro ao buscar header." });
  }
};

// 👉 PUT /api/header
exports.updateHeader = async (req, res) => {
  try {
    const { phone, address } = req.body;

    // Garante que o header existe (cria se não existir)
    const [header] = await Header.findOrCreate({
      where: { id: 1 },
      defaults: { phone, address },
    });

    // Atualiza os dados
    header.phone = phone;
    header.address = address;

    await header.save();

    res.json({ mensagem: "✅ Header atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar header:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar header." });
  }
};
