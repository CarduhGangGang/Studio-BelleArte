const { ContactSectionConfig } = require("../models");

// 🔁 Corrigido para usar subtitle
exports.getContactSection = async (req, res) => {
  try {
    let section = await ContactSectionConfig.findOne();

    if (!section) {
      section = await ContactSectionConfig.create({
        title: "Entre em Contacto",
        subtitle: "Estamos aqui para responder às suas dúvidas.",
        whatsappNumber: "",
        address: "",
        email: "",
        phone: "",
        mapsEmbedUrl: "",
      });
    }

    res.json(section);
  } catch (err) {
    console.error("❌ ERRO AO OBTER CONTACT SECTION:", err);
    res.status(500).json({ error: "Erro interno ao carregar configuração." });
  }
};

exports.updateContactSection = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      whatsappNumber,
      address,
      email,
      phone,
      mapsEmbedUrl,
    } = req.body;

    let section = await ContactSectionConfig.findOne();

    if (!section) {
      section = await ContactSectionConfig.create({
        title,
        subtitle,
        whatsappNumber,
        address,
        email,
        phone,
        mapsEmbedUrl,
      });
    } else {
      await section.update({
        title,
        subtitle,
        whatsappNumber,
        address,
        email,
        phone,
        mapsEmbedUrl,
      });
    }

    res.json(section);
  } catch (err) {
    console.error("❌ ERRO AO ATUALIZAR CONTACT SECTION:", err);
    res.status(500).json({ error: "Erro ao atualizar configuração." });
  }
};
