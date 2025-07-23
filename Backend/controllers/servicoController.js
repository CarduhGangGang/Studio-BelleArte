// 📁 controllers/servicoController.js
const db = require("../models");
const path = require("path");
const fs = require("fs");

// 🔹 Listar todos os serviços
exports.servico_list = async (req, res) => {
  try {
    const servicos = await db.Servico.findAll({ order: [["createdAt", "DESC"]] });
    res.json(servicos);
  } catch (err) {
    console.error("Erro ao listar serviços:", err);
    res.status(500).json({ mensagem: "Erro ao buscar serviços." });
  }
};

// 🔹 Detalhes de um serviço
exports.servico_detail = async (req, res) => {
  try {
    const servico = await db.Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).json({ mensagem: "Serviço não encontrado" });
    res.json(servico);
  } catch (err) {
    console.error("Erro ao buscar serviço:", err);
    res.status(500).json({ mensagem: "Erro ao buscar serviço." });
  }
};

// 🔹 Criar novo serviço
exports.servico_create = async (req, res) => {
  try {
    const { nome, duracao, preco, descricao } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!nome || !duracao || !preco) {
      return res.status(400).json({ mensagem: "Campos obrigatórios: nome, duração e preço." });
    }

    const novo = await db.Servico.create({ nome, duracao, preco, descricao, imageUrl });
    res.status(201).json(novo);
  } catch (err) {
    console.error("Erro ao criar serviço:", err);
    res.status(500).json({ mensagem: "Erro ao criar serviço." });
  }
};

// 🔹 Atualizar serviço
exports.servico_update = async (req, res) => {
  try {
    const { nome, duracao, preco, descricao } = req.body;
    const id = req.params.id;

    const servico = await db.Servico.findByPk(id);
    if (!servico) return res.status(404).json({ mensagem: "Serviço não encontrado." });

    if (req.file && servico.imageUrl) {
      const filePath = path.join(__dirname, "..", "public", servico.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : servico.imageUrl;

    await servico.update({ nome, duracao, preco, descricao, imageUrl });
    res.json(servico);
  } catch (err) {
    console.error("Erro ao atualizar serviço:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar serviço." });
  }
};

// 🔹 Apagar serviço
exports.servico_delete = async (req, res) => {
  try {
    const servico = await db.Servico.findByPk(req.params.id);
    if (!servico) return res.status(404).json({ mensagem: "Serviço não encontrado." });

    if (servico.imageUrl) {
      const filePath = path.join(__dirname, "..", "public", servico.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await servico.destroy();
    res.json({ mensagem: "Serviço apagado com sucesso." });
  } catch (err) {
    console.error("Erro ao apagar serviço:", err);
    res.status(500).json({ mensagem: "Erro ao apagar serviço." });
  }
};

// 🔹 Obter texto da seção
exports.servico_section_get = async (req, res) => {
  try {
    const section = await db.ServicesSectionConfig.findOne();
    res.json(section || {});
  } catch (err) {
    console.error("Erro ao obter seção:", err);
    res.status(500).json({ mensagem: "Erro ao buscar seção." });
  }
};

// 🔹 Atualizar texto da seção
exports.servico_section_update = async (req, res) => {
  try {
    const [section, created] = await db.ServicesSectionConfig.findOrCreate({
      where: { id: 1 },
      defaults: req.body,
    });

    if (!created) await section.update(req.body);

    res.json({ mensagem: "Seção atualizada com sucesso", section });
  } catch (err) {
    console.error("Erro ao atualizar seção:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar seção." });
  }
};
