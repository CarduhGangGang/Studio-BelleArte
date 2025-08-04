const { TeamMember, TeamSection } = require("../models");
const path = require("path");

// 🔹 Buscar todos os membros
const getTeam = async (req, res) => {
  try {
    const members = await TeamMember.findAll();
    return res.json(members);
  } catch (err) {
    console.error("❌ Erro ao buscar membros:", err);
    return res.status(500).json({ error: "Erro ao buscar membros da equipa." });
  }
};

// 🔹 Criar novo membro
const createTeam = async (req, res) => {
  try {
    const { name, role, imageUrl } = req.body;

    if (!name?.trim() || !role?.trim() || !imageUrl?.trim()) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const member = await TeamMember.create({ name, role, imageUrl });
    return res.status(201).json(member);
  } catch (err) {
    console.error("❌ Erro ao criar membro:", err);
    return res.status(500).json({ error: "Erro ao criar membro." });
  }
};

// 🔹 Atualizar membro
const updateTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await TeamMember.findByPk(id);
    if (!member) return res.status(404).json({ error: "Membro não encontrado." });

    await member.update(req.body);
    return res.json(member);
  } catch (err) {
    console.error("❌ Erro ao atualizar membro:", err);
    return res.status(500).json({ error: "Erro ao atualizar membro." });
  }
};

// 🔹 Deletar membro
const deleteTeam = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await TeamMember.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Membro não encontrado." });

    return res.json({ success: true, message: "Membro removido com sucesso." });
  } catch (err) {
    console.error("❌ Erro ao deletar membro:", err);
    return res.status(500).json({ error: "Erro ao deletar membro." });
  }
};

// 🔹 Buscar configuração da secção
const getTeamSection = async (req, res) => {
  try {
    let section = await TeamSection.findOne();

    // Se não existir, criar padrão
    if (!section) {
      section = await TeamSection.create({
        title: "A Nossa Equipa",
        description: "Conheça os nossos profissionais.",
      });
    }

    return res.json(section);
  } catch (err) {
    console.error("❌ Erro ao buscar seção:", err);
    return res.status(500).json({ error: "Erro ao buscar configuração da seção." });
  }
};

// 🔹 Atualizar configuração da secção
const updateTeamSection = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
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
    console.error("❌ Erro ao atualizar secção:", err);
    return res.status(500).json({ error: "Erro ao atualizar a secção." });
  }
};

// 🔹 Upload de imagem
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhuma imagem enviada." });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    return res.json({ url: imagePath });
  } catch (err) {
    console.error("❌ Erro ao fazer upload:", err);
    return res.status(500).json({ error: "Erro ao fazer upload da imagem." });
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
