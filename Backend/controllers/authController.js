const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models");

const SECRET = process.env.SECRET;

// 📌 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ mensagem: "Email e password são obrigatórios." });
    }

    const utilizador = await db.Utilizador.findOne({ where: { email } });
    if (!utilizador) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    const match = await bcrypt.compare(password, utilizador.password);
    if (!match) {
      return res.status(401).json({ mensagem: "Credenciais inválidas" });
    }

    // ✅ Atualizar last_login
    await utilizador.update({ last_login: new Date() });

    const tokenPayload = {
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      role: utilizador.role_id,
    };

    const token = jwt.sign(tokenPayload, SECRET, { expiresIn: "15m" });       // access token
    const refreshToken = jwt.sign(tokenPayload, SECRET, { expiresIn: "7d" }); // refresh token

    return res.json({
      mensagem: "✅ Login efetuado com sucesso",
      token,
      refreshToken,
      user: tokenPayload,
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ mensagem: "Erro interno no login" });
  }
};

// 📌 REGISTO
exports.register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    const existe = await db.Utilizador.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensagem: "Email já está registado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.Utilizador.create({
      nome: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role_id: role || 3, // Cliente por padrão
    });

    res.status(201).json({ mensagem: "✅ Utilizador registado com sucesso." });
  } catch (err) {
    console.error("Erro no registo:", err);
    res.status(500).json({ mensagem: "Erro ao registar utilizador." });
  }
};

// 📌 REFRESH TOKEN
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ mensagem: "Refresh token ausente" });
  }

  try {
    const payload = jwt.verify(refreshToken, SECRET);

    const newToken = jwt.sign(
      {
        id: payload.id,
        nome: payload.nome,
        email: payload.email,
        role: payload.role,
      },
      SECRET,
      { expiresIn: "15m" }
    );

    return res.json({ token: newToken });
  } catch (err) {
    console.error("Erro ao renovar token:", err);
    return res.status(403).json({ mensagem: "Refresh token inválido ou expirado" });
  }
};
