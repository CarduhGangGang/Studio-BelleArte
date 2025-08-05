const db = require("../models");

const API_BASE = process.env.API_BASE_URL || "https://studio-bellearte-3-backends.onrender.com";

// Helper para URL completa
const getFullImageUrl = (relativePath) => {
  if (!relativePath) return `${API_BASE}/uploads/default.jpg`;
  if (relativePath.startsWith("http")) return relativePath;

  const cleanPath = relativePath.replace(/^\/?uploads\/?/, "");
  return `${API_BASE}/uploads/${cleanPath}`;
};

// 🔹 Obter dados da seção
exports.getSection = async (_, res) => {
  try {
    const cfg = await db.PortfolioSectionConfig.findOne();
    if (!cfg) return res.status(404).json({ message: "Configuração não encontrada" });
    res.json(cfg);
  } catch (err) {
    console.error("Erro ao buscar configuração:", err);
    res.status(500).json({ error: "Erro ao buscar configuração" });
  }
};

// 🔹 Atualizar/criar dados da seção
exports.updateSection = async (req, res) => {
  try {
    let cfg = await db.PortfolioSectionConfig.findOne();
    if (!cfg) {
      cfg = await db.PortfolioSectionConfig.create(req.body);
      return res.status(201).json(cfg);
    }
    await cfg.update(req.body);
    res.json(cfg);
  } catch (err) {
    console.error("Erro ao atualizar configuração:", err);
    res.status(500).json({ error: "Erro ao atualizar configuração" });
  }
};

// 🔹 Listar imagens do portfólio
exports.getImages = async (_, res) => {
  try {
    const imgs = await db.PortfolioImage.findAll();
    const formatted = imgs.map((img) => ({
      ...img.toJSON(),
      imageUrl: getFullImageUrl(img.imageUrl),
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Erro ao buscar imagens:", err);
    res.status(500).json({ error: "Erro ao buscar imagens" });
  }
};

// ✅ 🔹 Criar nova imagem via imageUrl
exports.uploadImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "Campo 'imageUrl' é obrigatório e deve ser uma string." });
    }

    const nova = await db.PortfolioImage.create({ imageUrl });
    res.status(201).json({
      ...nova.toJSON(),
      imageUrl: getFullImageUrl(nova.imageUrl),
    });
  } catch (err) {
    console.error("Erro ao criar imagem:", err);
    res.status(500).json({ error: "Erro ao criar imagem" });
  }
};

// 🔹 Deletar imagem
exports.deleteImage = async (req, res) => {
  try {
    await db.PortfolioImage.destroy({ where: { id: req.params.id } });
    res.json({ message: "Imagem removida com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar imagem:", err);
    res.status(500).json({ error: "Erro ao deletar imagem" });
  }
};
