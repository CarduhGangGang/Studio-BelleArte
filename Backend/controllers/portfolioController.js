const db = require("../models");
const path = require("path");

// Variável de ambiente para domínio
const API_BASE = process.env.API_BASE_URL || "https://studio-bellearte-3-backends.onrender.com";

// Construtor da URL completa
const getFullImageUrl = (relativePath) => {
  if (!relativePath) return `${API_BASE}/uploads/default.jpg`;
  if (relativePath.startsWith("http")) return relativePath;

  const cleanPath = relativePath.replace(/^\/?uploads\/?/, "");
  return `${API_BASE}/uploads/${cleanPath}`;
};

// Obter as configurações da seção do portfólio
exports.getSection = async (_, res) => {
  try {
    const cfg = await db.PortfolioSectionConfig.findOne();

    if (!cfg) {
      return res.status(404).json({ message: "Configuração não encontrada" });
    }

    res.json(cfg);
  } catch (err) {
    console.error("Erro ao buscar configuração:", err);
    res.status(500).json({ error: "Erro ao buscar configuração" });
  }
};

// Atualizar ou criar a configuração da seção
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

// Obter todas as imagens do portfólio
exports.getImages = async (_, res) => {
  try {
    const imgs = await db.PortfolioImage.findAll();

    // Retorna as URLs completas
    const formattedImgs = imgs.map((img) => ({
      ...img.toJSON(),
      imageUrl: getFullImageUrl(img.imageUrl),
    }));

    res.json(formattedImgs);
  } catch (err) {
    console.error("Erro ao buscar imagens:", err);
    res.status(500).json({ error: "Erro ao buscar imagens" });
  }
};

// Fazer upload de nova imagem
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem enviada" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const img = await db.PortfolioImage.create({ imageUrl });

    res.json({
      ...img.toJSON(),
      imageUrl: getFullImageUrl(img.imageUrl),
    });
  } catch (err) {
    console.error("Erro ao fazer upload da imagem:", err);
    res.status(500).json({ error: "Erro ao enviar imagem" });
  }
};

// Deletar imagem do portfólio
exports.deleteImage = async (req, res) => {
  try {
    await db.PortfolioImage.destroy({ where: { id: req.params.id } });
    res.json({ message: "Imagem removida com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar imagem:", err);
    res.status(500).json({ error: "Erro ao deletar imagem" });
  }
};
