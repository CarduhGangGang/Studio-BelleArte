const db = require("../models");

exports.getSection = async (_, res) => {
  const cfg = await db.PortfolioSectionConfig.findOne();
  res.json(cfg);
};

exports.updateSection = async (req, res) => {
  let cfg = await db.PortfolioSectionConfig.findOne();

  // Se não existir, cria com os dados recebidos
  if (!cfg) {
    cfg = await db.PortfolioSectionConfig.create(req.body);
    return res.status(201).json(cfg);
  }

  // Caso exista, apenas atualiza
  await cfg.update(req.body);
  res.json(cfg);
};

exports.getImages = async (_, res) => {
  const imgs = await db.PortfolioImage.findAll();
  res.json(imgs);
};

exports.uploadImage = async (req, res) => {
  const imageUrl = `/uploads/${req.file.filename}`;
  const img = await db.PortfolioImage.create({ imageUrl });
  res.json(img);
};

exports.deleteImage = async (req, res) => {
  await db.PortfolioImage.destroy({ where: { id: req.params.id } });
  res.json({ message: "Removido" });
};
