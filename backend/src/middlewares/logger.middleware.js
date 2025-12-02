/**
 * Middleware para logging de requisições HTTP
 * @module middlewares/requestLogger
 */
const logger = require('../config/logger');

/**
 * Middleware que registra informações de cada requisição HTTP
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 * @param {Function} next - Próxima função middleware
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    });
  });

  next();
};

module.exports = requestLogger;
