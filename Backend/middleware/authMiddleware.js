require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET;

// ✅ Middleware de autenticação (JWT)
function autenticar(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensagem: "Token mal formatado ou ausente" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // ✅ Corrigido aqui
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ mensagem: "Token expirado" });
    }
    return res.status(403).json({ mensagem: "Token inválido" });
  }
}

// ✅ Middleware de autorização por roles
function autorizar(...rolesPermitidas) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ mensagem: "Não autenticado" });
    }

    if (!rolesPermitidas.includes(req.user.role)) {
      return res.status(403).json({ mensagem: "Acesso não autorizado" });
    }

    next();
  };
}

module.exports = { autenticar, autorizar };
