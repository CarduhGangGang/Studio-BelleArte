const db = require("../models");
const path = require("path");

const BannerService = db.BannerService;

// Usa variável de ambiente ou valor padrão
const API_BASE = process.env.API_BASE_URL || "https://studio-bellearte-3-backends.onrender.com";

// Helper para construir URL da imagem
const getFullImageUrl = (imagePath) => {
  if (!imagePath) return `${API_BASE}/uploads/default.jpg`;

  // Se já for uma URL completa (ex: Cloudinary)
  if (imagePath.startsWith("http")) return imagePath;

  // Remove prefixos duplicados e constrói a URL
  const cleanPath = imagePath.replace(/^\/?uploads\/?/, "");
  return `${API_BASE}/uploads/${cleanPath}`;
};

exports.getBannerService = async (req, res) => {
  try {
    let banner = await BannerService.findOne();

    if (!banner) {
      banner = await BannerService.create({
        title: "Os Nossos Serviços",
        image: "default.jpg",
      });
    }

    const response = {
      ...banner.toJSON(),
      image: getFullImageUrl(banner.image),
    };

    res.json(response);
  } catch (err) {
    console.error("Erro ao buscar banner:", err);
    res.status(500).json({ error: "Erro ao buscar banner" });
  }
};

exports.updateBannerService = async (req, res) => {
  try {
    const { title, image } = req.body;

    let banner = await BannerService.findOne();

    if (!banner) {
      banner = await BannerService.create({ title, image });
    } else {
      banner.title = title;
      banner.image = image;
      await banner.save();
    }

    const response = {
      ...banner.toJSON(),
      image: getFullImageUrl(banner.image),
    };

    res.json({ message: "Banner atualizado com sucesso!", banner: response });
  } catch (err) {
    console.error("Erro ao atualizar banner:", err);
    res.status(500).json({ error: "Erro ao atualizar banner" });
  }
};
