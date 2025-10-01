const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";

// Middleware para autenticação
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id, email, role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};

// Middleware para autorização por role
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }
    next();
  };
};

module.exports = { authMiddleware, authorize };
