const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

// 📋 Lista utilizadores por função (role)
exports.utilizador_list = async (req, res) => {
  try {
    const { role } = req.query;

    const where = {};
    if (role) where.role_id = role;

    const utilizadores = await db.Utilizador.findAll({
      where,
      attributes: ["id", "nome", "email", "role_id"],
    });

    res.json(utilizadores);
  } catch (err) {
    console.error("❌ Erro ao listar utilizadores:", err);
    res.status(500).json({ mensagem: "Erro ao buscar utilizadores." });
  }
};

// ✅ Listar utilizadores autenticados (last_login ≠ null)
exports.listarAutenticados = async (req, res) => {
  try {
    const users = await db.Utilizador.findAll({
      where: {
        last_login: { [Op.ne]: null },
      },
      attributes: ["id", "nome", "email", "role_id", "last_login"],
      order: [["last_login", "DESC"]],
    });

    res.json(users);
  } catch (err) {
    console.error("❌ Erro ao buscar utilizadores autenticados:", err);
    res.status(500).json({ mensagem: "Erro ao buscar utilizadores autenticados." });
  }
};

// 🔍 Obter utilizador por ID
exports.obterUtilizador = async (req, res) => {
  try {
    const utilizador = await db.Utilizador.findByPk(req.params.id, {
      attributes: ["id", "nome", "email", "role_id"],
    });

    if (!utilizador) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }

    res.json(utilizador);
  } catch (err) {
    console.error("❌ Erro ao obter utilizador:", err);
    res.status(500).json({ mensagem: "Erro ao buscar utilizador." });
  }
};

// ➕ Criar novo utilizador
exports.criarUtilizador = async (req, res) => {
  try {
    const { nome, email, password, role_id } = req.body;

    if (!nome || !email || !password) {
      return res.status(400).json({ mensagem: "Campos obrigatórios em falta." });
    }

    const existente = await db.Utilizador.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ mensagem: "Email já está em uso." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const novo = await db.Utilizador.create({
      nome,
      email,
      password: hashed,
      role_id: role_id || 3, // Cliente por padrão
    });

    // 📘 LOG: Email de cliente criado
    if ((role_id || 3) === 3) {
      console.log(`📧 Novo cliente criado: ${email}`);
    }

    res.status(201).json({
      mensagem: "✅ Utilizador criado com sucesso",
      utilizador: { id: novo.id, nome: novo.nome, email: novo.email },
    });
  } catch (err) {
    console.error("❌ Erro ao criar utilizador:", err);
    res.status(500).json({ mensagem: "Erro ao criar utilizador" });
  }
};

// ✏️ Atualizar utilizador
exports.atualizarUtilizador = async (req, res) => {
  try {
    const utilizador = await db.Utilizador.findByPk(req.params.id);
    if (!utilizador) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }

    await utilizador.update(req.body);
    res.json({ mensagem: "✅ Utilizador atualizado com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao atualizar utilizador:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar utilizador" });
  }
};

// ❌ Apagar utilizador
exports.apagarUtilizador = async (req, res) => {
  try {
    const utilizador = await db.Utilizador.findByPk(req.params.id);
    if (!utilizador) {
      return res.status(404).json({ mensagem: "Utilizador não encontrado" });
    }

    await utilizador.destroy();
    res.json({ mensagem: "✅ Utilizador apagado com sucesso" });
  } catch (err) {
    console.error("❌ Erro ao apagar utilizador:", err);
    res.status(500).json({ mensagem: "Erro ao apagar utilizador" });
  }
};
