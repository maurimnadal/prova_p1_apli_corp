/**
 * Middleware de autenticação e autorização
 * @module middlewares/authMiddleware
 */
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";

/**
 * Middleware para verificar token JWT
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 * @param {Function} next - Próxima função middleware
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ erro: "Token inválido" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};

/**
 * Middleware para autorizar acesso baseado em roles
 * @param {Array<string>} roles - Lista de roles permitidas (ex: ['admin'])
 * @returns {Function} Middleware function
 */
const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Acesso negado" });
  }
  next();
};

module.exports = { authMiddleware, authorize };
