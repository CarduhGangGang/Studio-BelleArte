// middlewares/checkRole.js
module.exports = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ erro: "Não autenticado" });
    }

    if (!rolesPermitidos.includes(user.role)) {
      return res.status(403).json({ erro: "Acesso negado: permissão insuficiente" });
    }

    next();
  };
};
