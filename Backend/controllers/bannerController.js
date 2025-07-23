const db = require("../models");
const BannerService = db.BannerService;

exports.getBannerService = async (req, res) => {
  try {
    let banner = await BannerService.findOne();
    if (!banner) {
      banner = await BannerService.create({
        title: "Os Nossos Serviços",
        image: "default.jpg", // nome de imagem padrão se quiser
      });
    }
    res.json(banner);
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

    res.json({ message: "Banner atualizado com sucesso!", banner });
  } catch (err) {
    console.error("Erro ao atualizar banner:", err);
    res.status(500).json({ error: "Erro ao atualizar banner" });
  }
};
