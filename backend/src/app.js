/**
 * Configuração principal da aplicação Express
 * @module app
 */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const prisma = require("./config/prisma");
const logger = require("./config/logger");
const requestLogger = require("./middlewares/logger.middleware");

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const setupSwagger = require("./swagger");

const app = express();

// Configuração CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Middleware para parsing de JSON
app.use(bodyParser.json());

// Middleware de log de requisições
app.use(requestLogger);

// Rotas
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/volunteers", volunteerRoutes);

// Swagger docs
setupSwagger(app);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  logger.error('Erro não tratado', { error: err.message, stack: err.stack });
  res.status(err.status || 500).json({ 
    error: err.message || 'Erro interno do servidor' 
  });
});

// Testa conexão com Prisma ao iniciar
(async () => {
  try {
    await prisma.$connect();
    logger.info('Conectado ao MySQL via Prisma');
    console.log("Conectado ao MySQL via Prisma ✅");
  } catch (err) {
    logger.error('Erro ao conectar no MySQL', { error: err.message });
    console.error("Erro ao conectar no MySQL ❌", err.message);
  }
})();

// Desconecta Prisma ao encerrar
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = app;
