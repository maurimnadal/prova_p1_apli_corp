// src/app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // <- import CORS
const pool = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/event.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const setupSwagger = require("./swagger");

const app = express();

// --- Configuração CORS ---
app.use(cors({
  origin: "http://localhost:5173", // substitua pelo front-end se mudar de porta
  credentials: true, // permite envio de cookies/tokens se precisar
}));

// Middleware para parsing de JSON
app.use(bodyParser.json());

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

// Testa conexão com o banco ao iniciar
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conectado ao MySQL ✅");
    connection.release();
  } catch (err) {
    console.error("Erro ao conectar no MySQL ❌", err.message);
  }
})();

module.exports = app;
