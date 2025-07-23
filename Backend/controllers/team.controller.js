const { TeamMember, TeamSection } = require("../models");
const path = require("path");

// 🔹 Membros
const getTeam = async (req, res) => {
  try {
    const members = await TeamMember.findAll();
    res.json(members);
  } catch (err) {
    console.error("Erro ao buscar membros:", err);
    res.status(500).json({ error: "Erro ao buscar membros" });
  }
};

const createTeam = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.json(member);
  } catch (err) {
    console.error("Erro ao criar membro:", err);
    res.status(500).json({ error: "Erro ao criar membro" });
  }
};

const updateTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await TeamMember.findByPk(id);
    if (!member) return res.status(404).json({ error: "Membro não encontrado" });

    await member.update(req.body);
    res.json(member);
  } catch (err) {
    console.error("Erro ao atualizar membro:", err);
    res.status(500).json({ error: "Erro ao atualizar membro" });
  }
};

const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    await TeamMember.destroy({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    console.error("Erro ao deletar membro:", err);
    res.status(500).json({ error: "Erro ao deletar membro" });
  }
};

// 🔹 Seção
const getTeamSection = async (req, res) => {
  try {
    let section = await TeamSection.findOne();

    if (!section) {
      section = await TeamSection.create({
        title: "A Nossa Equipa",
        description: "Conheça os nossos barbeiros.",
      });
    }

    res.json(section);
  } catch (err) {
    console.error("Erro ao buscar seção:", err);
    res.status(500).json({ error: "Erro ao buscar seção" });
  }
};

const updateTeamSection = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Título e descrição são obrigatórios." });
    }

    let section = await TeamSection.findOne();

    if (!section) {
      section = await TeamSection.create({ title, description });
    } else {
      await section.update({ title, description });
    }

    return res.json(section);
  } catch (err) {
    console.error("❌ Erro no updateTeamSection:", err);
    res.status(500).json({ error: "Erro ao atualizar a secção" });
  }
};

// 🔹 Upload de imagem
const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Imagem não enviada" });

    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ url: imagePath });
  } catch (err) {
    console.error("Erro ao fazer upload:", err);
    res.status(500).json({ error: "Erro ao fazer upload da imagem" });
  }
};

module.exports = {
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeamSection,
  updateTeamSection,
  uploadImage,
};
